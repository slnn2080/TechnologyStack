```vue
<template>
  <div style="width:100%;height:100%;">
    <!-- 规则页面 -->
    <template v-if="isPhaseAgreement">
      <AgreementIndex
        :tester-conditions="testerConditions"
        @agree="execExam"
      >
      </AgreementIndex>
    </template>


    <!-- 正式测试页面 -->
    <template v-if="isPhaseMcExamining">
      <McExaminingIndex
        :tester-conditions="testerConditions"
        :media-stream="mediaStream"
        :mc-exam-url="mcExam.url"
        @transit-exam-end="onClickMcShowSummary()"
        @logout="onClickMcLogout()"
      >
      </McExaminingIndex>
    </template>


    <!-- 外部测试页面 -->
    <template v-if="isPhaseOtherExamining">
      <OtherExaminingIndex
        :tester-conditions="testerConditions"
        :media-stream="mediaStream"
        @transit-exam-end="onClickOtherShowSummary()"
        @logout="onClickOtherLogout()"
      >
      </OtherExaminingIndex>
    </template>
  </div>
</template>

<script lang="ts">
import '@/assets/styles/common/notification/style.scss';
import Vue from 'vue';
import StartupAdapter from '@/store/types/adapters/startupAdapter';
import { LogoutMethod } from '@/plugins/global/window';
import { LanguageEnum } from '@/store/enum/language';
import { TesterState } from '@/store/enum/TesterState';
import { TesterPageAdapter } from '@/store/types/adapters/testerPageAdapter';
import { ExamProcess } from '@/store/enum/ExamProcess';
import {
  ExamStatusRequestType,
  ExamStatusResponseType,
} from '~/store/types/adapters/examStatusAdapter';
import {
  TestStatusRequestType,
  TestStatusResponseType,
} from '~/store/types/adapters/testStatusAdapter';
import { LoginAdapter } from '~/store/types/adapters/loginAdapter';
import {
  GetMcTokenAdapter,
  GetMcTokenMode,
} from '@/store/types/adapters/getMcTokenAdapter';
import * as rootTypes from '@/store/types/rootType';
import { LoadingAlertType, LoadingAlertOptions } from '@/store/types/adapters/commonAdapter';
import * as commonTypes from '@/store/types/commonType';
import * as testerPageTypes from '@/store/types/testerPageType';
import * as loginTypes from '@/store/types/loginType';
import * as testerKickOutTypes from '@/store/types/testerKickOutType';
import { TesterConditions } from '@/store/types/adapters/testerPageAdapter';
import { videoBitsPerSecond, audioBitsPerSecond, getTimeSlice } from '@/store/enum/mediaBitsPerSecond';
import { UploaderEvent } from '@/plugins/s3/upload';
import AgreementIndex from './Childs/AgreementIndex.vue';
import McExaminingIndex from './Childs/McExaminingIndex.vue';
import OtherExaminingIndex from './Childs/OtherExaminingIndex.vue';
import TesterMatchingPollingMixin from '@/components/Mixins/TesterMatchingPollingMixin'
import TesterNotificationMixin, { MasterDataMessageType } from '@/components/Mixins/TesterNotificationMixin'
import { pushMessage } from '@/static/push';
import { KvsDataType, MessageObject } from '@/plugins/kvs/type/sendMessageType';
import { PromiseUtils } from '@/utils/PromiseUtils';
import { MediaStreamResultType, MediaStreamHandler } from '@//plugins/global/mediaDevices';
import { ModalOptions } from '@/plugins/global/modals';
import {
  WebRTCSendType,
  WebRTCMessageType,
  WebRTCMessagePostRequestType,
} from '@/store/types/adapters/webrtcMessageAdapter';



/** @type 画面遷移管理用 */
// 受测者的枚举类 同意 / mc考试 / 外部测试
export enum TesterPagePhase {
  AGREEMENT = 0,
  MC_EXAMINING,
  OTHER_EXAMINING,
};



/** @type 受験者監視終了の理由 */
// 受测者 监视结束 的理由
export enum MonitoringStopReason {
  NONE = 0,
  // 认证错误
  MC_AUTH_ERROR,      // MC+「認証エラー」
  // 显示概要
  MC_SHOW_SUMMARY,    // MC+「サマリーを表示」ボタン
  // mc登出
  MC_LOGOUT,          // MC+「ログアウト」ボタン
  // 外部测试认证错误
  OTHER_AUTH_ERROR,   // 外部試験「認証エラー」
  // 外部测试超时
  OTHER_TIMEOUT,      // 外部試験「タイムアウト」
  // 外部测试显示概要
  OTHER_SHOW_SUMMARY, // 外部試験「サマリーを表示」ボタン
  // 外部测试登出
  OTHER_LOGOUT,       // 外部試験「ログアウト」ボタン
}


/** @type 録画ステータス(この値は実際の録画状況ではなく、表示のための情報であることに注意) */
// 录制的状态 枚举类
export enum RecordingStatus {
  // 录制前
  BEFORE_RECORDING,
  // 录制中
  RECORDING,
  // 录制后
  AFTER_RECORDING,
}

// 创建 DataPollingMixin 组件  (轮询组件)
const DataPollingMixin = Vue.extend({
  data() {
    return {
      // データポーリング用データ
      dataPolling: {
        intervalTimer: null as (NodeJS.Timeout | number | null),
      },
    }
  },

  // computed的执行在created的后面 inParams是 适配器的参数对象
  computed: {
    inParams(): StartupAdapter {
      return this.$store.getters[rootTypes.GETTER_STARTUP];
    },
  },
  methods: {
    /**
     * この画面で必要なデータのポーリングを開始します
     *
     * このポーリングは、サーバへAPIを投げるため、StartupAdapter::matchingTimeoutを参照する必要がある
     * サーバやS3に対してデータポーリングする場合はここで行うこと
     *
     * @return {Promise<boolean>}
     */

    // 在这个页面上 开始轮询你需要的数据 因为这个轮询是向服务器发送api 所以要参考 StartupAdapter::matchingTimeout 如果你要对服务器或s3进行数据轮询请在这里进行
    startDataPolling(): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.dataPolling.intervalTimer = window.setInterval(() => {
          // この「受験者」画面では常に、「試験状況（試験ステータス）」を常に監視する必要があるので、ポーリングで監視し続ける
          this.$store.dispatch(testerPageTypes.ACTION_TESTER_PAGE_GET_TESTER)
        }, this.inParams.matchingTimeout * 1000)

        resolve(true)
      })
    },
    /**
     * ポーリングを停止します
     *
     * @return {Promise<boolean>}
     */
    stopDataPolling(): Promise<boolean> {
      if (this.dataPolling.intervalTimer) {
        window.clearInterval(this.dataPolling.intervalTimer as any)
        this.dataPolling.intervalTimer = null
      }
      return Promise.resolve(true)
    },
  },
})

/** @const [外部試験専用] */
const WindowSizeChangeMixin = Vue.extend({
  methods: {
    /**
     * [外部試験専用] ウィンドウを監視ウィンドウと試験ウィンドウの2つに分割します
     *
     * @return Promise<any>
     */
    splitWindow(examUrl: string, examName: string) {
      type Position = {
        x: number;
        y: number;
      };
      type Size = {
        width: number;
        height: number;
      };
      type PositionAndSize = Position & Size;
      const utils: {[key:string] : any} = {
        /**
         * 左ウィンドウのサイズを計算します
         *
         * @return {{
         *           screen: Size,
         *           leftWindow: Size,
         *           rightWindow: Size,
         *         }}
         */
        calcCommon: function () {
          const windowScreenWidth = window.screen.availWidth;   // windowsOSの場合はタスクバーを引いた値(タスクバーが縦横どちらにいるかわからないことに注意)
          const windowScreenHeight = window.screen.availHeight; // 〃

          // 「RT」ウィンドウと「試験」ウィンドウの幅を計算する
          // 「RT」ウィンドウの横幅が最小値以上なら「RT」:「試験」=2:8でウィンドウ幅を計算する
          const LW_MIN = 320;
          const tmpLW = Math.ceil(windowScreenWidth / 10 * 2);
          const tmpRW = Math.ceil(windowScreenWidth / 10 * 8);
          let leftWindowWidth: number;
          let rightWindowWidth: number;
          if (tmpLW >= LW_MIN) {
            // 「RT」ウィンドウの横幅が最小値以上なら計算結果を使う
            leftWindowWidth = tmpLW
            rightWindowWidth = tmpRW
          } else {
            // 「RT」ウィンドウの横幅が最小値未満ならば最小値を使う
            leftWindowWidth = LW_MIN
            rightWindowWidth = windowScreenWidth - LW_MIN
          }

          return {
            screen: {
              width: windowScreenWidth,
              height: windowScreenHeight,
            },
            leftWindow: {
              width: leftWindowWidth,
              height: windowScreenHeight,
            },
            rightWindow: {
              width: rightWindowWidth,
              height: windowScreenHeight,
            },
          } as {
            screen: Size,
            leftWindow: Size,
            rightWindow: Size,
          }
        },
        /**
         * 左ウィンドウのサイズを計算します
         *
         * @return {PositionAndSize}
         */
        calcLeftWindowPositionAndSize: function() {
          const common = utils.calcCommon();

          return {
            x: 0,
            y: 0,
            width: common.leftWindow.width,
            height: common.leftWindow.height,
          } as PositionAndSize
        },
        /**
         * 右ウィンドウのサイズを計算します
         *
         * @return {PositionAndSize}
         */
        calcRightWindowPositionAndSize: function () {
          const common = utils.calcCommon();

          const tmpLwX = ('screenLeft' in window) ? window.screenLeft : window.screenX;
          const tmpLwW = window.outerWidth;
          const tmpLwR = tmpLwX + tmpLwW
          // 本来的にデスクトップ右から計算しないのは、タスクバーを縦に配置しているユーザを検知できないため(できるけど、動作が汚くなるので止める)
          // 複雑な計算式にすると、サブディスプレイ等考慮したとき破綻するので、適当にしておく
          const newX = tmpLwR + 16 // 微妙にかぶるので微修正

          return {
            x: newX,
            y: 0,
            width: common.rightWindow.width,
            height: common.rightWindow.height,
          } as PositionAndSize
        },
      };
      
      return new Promise((resolve, reject) => {
        const lwp = utils.calcLeftWindowPositionAndSize();

        // RTのウィンドウサイズを変更
        window.moveTo(lwp.x, lwp.y);
        window.resizeTo(lwp.width, lwp.height);
        window.focus();

        // window.screenXの値を取得したいので、実行コンテキストをずらす
        setTimeout(() => {
          const rwp = utils.calcRightWindowPositionAndSize();

          const newWindowOption = `left=${rwp.x},top=${rwp.y},width=${rwp.width},height=${rwp.height},menubar=no,toolbar=no,location=no,resizable=no,directories=no`;
          const newWindow = window.open(examUrl, examName, newWindowOption) as any;
          newWindow.focus();

          resolve(true)
        }, 0)
      })
    },
    /**
     * [外部試験専用] 監視ウィンドウをリサイズします
     *
     * @return {Promise<any>}
     */
    resizeWindow(): Promise<any> {
      return new Promise((resolve, rejecct) => {
        // 実行タスクをずらすのはローディング中フィルタを表示するため
        setTimeout(() => {
          // RTのウィンドウサイズを変更
          window.moveTo(0, 0);
          window.resizeTo(window.screen.availWidth, window.screen.availHeight);

          resolve(true)
        }, 0)
      })
    },
    /**
     * 別[外部試験専用] ウィンドウで「試験終了」画面を開き、現在のウィンドウを閉じます
     *
     * これは、タイムアウト処理において監視ウィンドウをそのままresizeWindow()した場合、
     * なぜか最大化しない現象があるとの報告があるのと、最前面にならないことへの対処です
     * 最前面にならないのはブラウザの仕様なので、別ウィドウを開き対処している。
     * この対処は外部試験の場合のみです。
     * なぜならMC+試験を受けている場合は、試験ウィンドウが常にアクティブであるはずだから
     * 外部試験の場合は、「サマリー表示」ボタン/「ログアウト」ボタン押下時にウィンドウがアクティブになるはずだから
     *
     * @param {string} url
     * @return {Promise<any>}
     */
    changeWindow(url: string): Promise<any> {
      return new Promise((resolve, rejecct) => {
        // 実行タスクをずらすのはローディング中フィルタを表示するため
        setTimeout(() => {
          // 受験者[外部試験]
          const wH = window.screen.availHeight;
          const wW = window.screen.availWidth;
          const wT = 0;  // モニター左下 Top計算
          const wL = 0;  // モニター左下 Left計算
          const wOption = "top=" + wT + ", left=" + wL + ", height=" + wH + ", width=" + wW + ", menubar=no" + ", toolbar=no" + ", location=no" + ", resizable=no" + ", directories=no";
          this.$window.openChildWindow(url, {}, '_blank', wOption)
          .finally(() => {
            // 現在のウィンドウを閉じる - ログアウトについては、遷移先に任せる
            this.$window.close(LogoutMethod.NONE)

            resolve(true)
          })
        }, 0)
      })
    },
  },
})

/** @const */
const UtilsMixin = Vue.extend({
  computed: {
    inParams(): StartupAdapter {
      return this.$store.getters[rootTypes.GETTER_STARTUP];
    },
  },
  methods: {
    /**
     * ローディングフィルターの表示/非表示を設定します
     *
     * @param {boolean} visible
     * @return {Promise<any>}
     */
    setLoadingFilter(visible: boolean): Promise<any> {
      return this.$store.dispatch(commonTypes.ACTION_COMMON_SET_LOADING, visible)
    },
    /**
     * ローディングフィルターの表示/非表示を設定します
     *
     * @param {boolean} visible
     * @return {Promise<any>}
     */
    setLoadingFilterWithAlert(visible: boolean): Promise<any> {
      if (this.inParams.isRecord) {
        // 録画ありの場合、アップロード処理が行われるのでアップロード用のアラートを表示する
        this.$store.dispatch(commonTypes.ACTION_COMMON_SET_LOADING_ALERT, {loadingAlertType: LoadingAlertType.UPLOADING, visible: visible} as LoadingAlertOptions)
      }
      return this.$store.dispatch(commonTypes.ACTION_COMMON_SET_LOADING, visible)
    },
  },
})

export default Vue.extend({
  name: 'Examining',
  components: {
    AgreementIndex,
    McExaminingIndex,
    OtherExaminingIndex,
  },
  mixins: [
    TesterMatchingPollingMixin,
    TesterNotificationMixin,
    DataPollingMixin,
    WindowSizeChangeMixin,
    UtilsMixin,
  ],
  data() {
    return {
      // 試験ステータスと時間/ユーザ操作を監視するためのデータ
      monitoring: {
        intervalTimer: null as (NodeJS.Timeout | number | null),
        startTime: null as (number | null), // 監視の開始時間
        endTime: null as (number | null), // 監視の終了時間
        // この値は厳密には試験中断ではない。試験中断と試験終了を分けて取得できないので、
        // 試験終了が来たらいったんこの値をnull以外に設定しておき、そのあと試験開始が来た場合試験中断と判断するための値
        interruptionExamTime: null as (number | null), // 試験中断の時間
        recordEndTime: null as (number | null), // 録画最長時間終了
        proctorEndTime: null as (number | null), // 監視最長時間終了
      } as any,
      // 画面遷移管理用
      testerPagePhase: TesterPagePhase.AGREEMENT as TesterPagePhase,
      mediaStream: null as (MediaStream | null),
      mediaStreamHandler: {} as MediaStreamHandler,
      recordingStatus: RecordingStatus.BEFORE_RECORDING as RecordingStatus,
      mcExam: {
        url: '',
      } as any,
      otherExam: {
        testerReq: {} as TestStatusRequestType,
      } as any,
    };
  },
  computed: {
    displayLang(): LanguageEnum {
      return this.$store.getters[rootTypes.GETTER_DISPLAY_LANG];
    },
    inParams(): StartupAdapter {
      return this.$store.getters[rootTypes.GETTER_STARTUP];
    },
    loginData(): LoginAdapter {
      return this.$store.getters[loginTypes.GETTER_LOGIN];
    },
    isAuthError(): boolean {
      return this.$store.getters[testerPageTypes.GETTER_TESTER_PAGE_IS_AUTH_ERROR]
    },
    testerPage(): TesterPageAdapter {
      return this.$store.getters[testerPageTypes.GETTER_TESTER_PAGE];
    },
    isPhaseAgreement(): boolean {
      return this.testerPagePhase == TesterPagePhase.AGREEMENT;
    },
    isPhaseMcExamining(): boolean {
      return this.testerPagePhase == TesterPagePhase.MC_EXAMINING;
    },
    isPhaseOtherExamining(): boolean {
      return this.testerPagePhase == TesterPagePhase.OTHER_EXAMINING;
    },
    /**
     * テスト進行状況が「試験前」か調べます
     *
     * @return {boolean}
     */
    isBeforeExam(): boolean {
      const state = this.testerPage.testerState;
      return (
        state === TesterState.NONE ||
        state === TesterState.LOGIN ||
        state === TesterState.MATCHED ||
        state === TesterState.IDENTIFICATED ||
        state === TesterState.BEFORE_EXAM
      );
    },
    /**
     * テスト進行状況が「試験中」か調べます
     *
     * @return {boolean}
     */
     isExaming(): boolean {
      const state = this.testerPage.testerState;
      return (
        state === TesterState.EXAMING ||
        state === TesterState.INTERRUPTION_EXAM
      );
    },
    /**
     * テスト進行状況が「試験中断」か調べます
     *
     * @return {boolean}
     */
    isInterruptionExam(): boolean {
      const state = this.testerPage.testerState;
      return state === TesterState.INTERRUPTION_EXAM;
    },
    /**
     * テスト進行状況が「試験終了」か調べます
     *
     * @return {boolean}
     */
    isFinishExam(): boolean {
      return this.testerPage.testerState === TesterState.FINISH_EXAM;
    },
    isBeforeRecording(): boolean {
      return this.recordingStatus === RecordingStatus.BEFORE_RECORDING
    },
    isRecording(): boolean {
      return this.recordingStatus === RecordingStatus.RECORDING
    },
    isAfterRecording(): boolean {
      return this.recordingStatus === RecordingStatus.AFTER_RECORDING
    },
    /**
     * 受験者情報
     *
     * @return {TesterConditions}
     */
    testerConditions(): TesterConditions {
      return {
        isDisconnect: (this as InstanceType<typeof TesterNotificationMixin>).isDisconnect,
        // 試験状況
        isBeforeExam: this.isBeforeExam,
        isExaming: this.isExaming,
        isInterruptionExam: this.isInterruptionExam,
        isFinishExam: this.isFinishExam,
        // 録画状況
        isBeforeRecording: this.isBeforeRecording,
        isRecording: this.isRecording,
        isAfterRecording: this.isAfterRecording,
      };
    },

    isDisconnect(): boolean {
      return this.$store.getters[testerPageTypes.GETTER_TESTER_PAGE].disconnect;
    },
  },
  created() {
    // 通知処理を開始します
    (this as InstanceType<typeof TesterNotificationMixin>).startNotification(
      (masterDataMessageType: MasterDataMessageType, messageObject: MessageObject) => {
        pushMessage(messageObject);
        if (masterDataMessageType == MasterDataMessageType.DEFAULT) {
          this.$store.dispatch(testerPageTypes.ACTION_TESTER_PAGE_POST_WEBRTC_MESSAGE, {
            send_type: WebRTCSendType.CHECKER,
            message_type: WebRTCMessageType.MONITORING,
            message: messageObject.message,
          } as WebRTCMessagePostRequestType);
        }
      }
    );
  },
  mounted() {
    this.mediaStreamHandler = {
      onCameraMediaStreamCreated: (mediaStreamResult: MediaStreamResultType):Promise<boolean> => {
        this.mediaStream = mediaStreamResult.mediaStream

        return Promise.resolve(true)
      },
      onCameraMediaStreamReset: (mediaStreamResult: MediaStreamResultType):Promise<boolean> => {
        this.mediaStream = mediaStreamResult.mediaStream

        return Promise.resolve(true)
      },
    } as MediaStreamHandler
    this.$mediaDevices.addMediaStreamHandler(this.mediaStreamHandler as MediaStreamHandler)
    this.$mediaDevices.createFrontCameraMediaStream(true, true)

    this.startMonitoring()
  },
  destroyed() {
    // 通知処理の後始末
    (this as InstanceType<typeof TesterNotificationMixin>).stopNotification()

    this.$mediaDevices.removeMediaStreamHandler(this.mediaStreamHandler as MediaStreamHandler)
  },
  methods: {
    /**
     * 受験者監視を開始します
     *
     * このポーリングは、サーバへAPIを投げないので、StartupAdapter::matchingTimeoutを参照しない
     * サーバやS3に対してデータポーリングする場合はここで行ってはいけない
     */
    startMonitoring(): void {
      // モニタリングの初期化処理
      // この初期化はthis.finalizeMonitoring()メソッド内のreleaseResource()の処理と対（初期化と後始末）になるように考慮しておく必要がある
      // 録画開始はモニタリングの途中から行われること、マッチングの初期化はこの画面の前に行われることから
      // 初期化処理が少なくなっている
      // 初期化と終了処理は確実に行われるように実装するほうが不具合が少ない
      //
      // データポーリングを開始します
      (this as InstanceType<typeof DataPollingMixin>).startDataPolling();

      this.monitoring.intervalTimer = window.setInterval(() => {
        let elapsedTime: number = 0
        if (this.monitoring.startTime != null) {
          const nowTime = Date.now();
          elapsedTime = Math.ceil((nowTime - this.monitoring.startTime) / 1000);
        } else {
          elapsedTime = 0
        }
        console.log('---------------------------------------------------------elapsed_time:' + elapsedTime);

        const isTimeoutOfRecord = () => {
          return elapsedTime >= this.inParams.maxRectime
        }
        const isTimeoutOfProctor = () => {
          return elapsedTime >= this.inParams.webrtcMaxTime
        }
        const isTimeout = () => {
          return isTimeoutOfRecord() && isTimeoutOfProctor()
        }

        if (this.inParams.isMcStartup) {
          // MC+

          // TODO: 「AI_PROCTOR-1705 iibc2重ログイン回り暫定対応」　暫定的に認証エラーでも何もしない
          //if (this.isAuthError) {
          //  const text = (this.displayLang as any).EXAMINING_MODAL_AUTH_ERROR_TEXT
          //  this.$modals.showErrorAlert(text, {title: (this.displayLang as any).EXAMINING_MODAL_TITLE} as ModalOptions)
          //
          //  this.stopMonitoring(MonitoringStopReason.MC_AUTH_ERROR)
          //  return;
          //}

          // TODO: MC+とRTフロントでは試験ステータスを直にやり取りしているわけではなく、RTバックエンドをポーリングしてステータスを検知している
          // このif文の「試験開始 or 再開」と「試験終了 or 試験中断」のブロックは交互に実行されると想定しているがおそらくデータの取りこぼしがあり
          // 必ずしも想定通りの挙動にはならないかもしれない
          // それは仕様なので仕方がない
          if (this.testerPage.testerState === TesterState.EXAMING) {
            // テスターステータス変更を監視: 試験開始 or 再開

            if (this.monitoring.startTime == null) {
              // 試験開始

              this.monitoring.startTime = Date.now()

              this.startRecord()
                .then(() => {
                  // 録画利用ありの場合、録画状況を変更する
                  if (this.inParams.isRecord == 1) {
                    console.log("进来了么")
                    this.recordingStatus = RecordingStatus.RECORDING
                  }
                })
            } else if(this.monitoring.interruptionExamTime != null) {
              // 試験再開

              this.monitoring.interruptionExamTime = null

              this.startRecord()
                .then(() => {
                  // 録画利用ありの場合、録画状況を変更する
                  if (this.inParams.isRecord == 1) {
                    this.recordingStatus = RecordingStatus.RECORDING
                  }
                })
            }
          } else if (this.testerPage.testerState === TesterState.FINISH_EXAM) {
            // テスターステータス変更を監視: 試験終了 or 試験中断

            if (this.monitoring.startTime == null) {
              // TODO: 「試験開始」を検知できなかった場合の暫定対応
              this.monitoring.startTime = Date.now()

              this.monitoring.interruptionExamTime = Date.now()

              // この時は録画終了は行わない(録画開始も行っていないので)

              // 録画利用ありの場合、録画状況を変更する
              if (this.inParams.isRecord == 1) {
                this.recordingStatus = RecordingStatus.AFTER_RECORDING;
              }
            } else {
              if (this.monitoring.interruptionExamTime == null) {
                // 試験終了 or 試験中断

                this.monitoring.interruptionExamTime = Date.now();

                (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(true)
                .then(() => this.stopRecord())
                .finally(() => {
                  // 録画利用ありの場合、録画状況を変更する
                  if (this.inParams.isRecord == 1) {
                    this.recordingStatus = RecordingStatus.AFTER_RECORDING;
                  }
                })
                .finally(() => (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(false))
              }
            }
          }

          // 時間経過を監視
          {
            // 録画タイムアウト
            if (
              (this.inParams.isRecord == 1)
              && (this.monitoring.recordEndTime == null)
              && isTimeoutOfRecord()
            ) {
              this.monitoring.recordEndTime = Date.now();

              (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(true)
              .then(() => this.stopRecord())
              .finally(() => {
                // 録画利用ありの場合、録画状況を変更する
                if (this.inParams.isRecord == 1) {
                  this.recordingStatus = RecordingStatus.AFTER_RECORDING;
                }
              })
              .finally(() => (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(false))
            }

            // 監視タイムアウト
            if (
              (this.inParams.isProctor == 1)
              && (this.monitoring.proctorEndTime == null)
              && isTimeoutOfProctor()
            ) {
              this.monitoring.proctorEndTime = Date.now();

              (this as InstanceType<typeof TesterMatchingPollingMixin>).stopMatching();
            }
          }
        } else {
          // 外部試験

          // TODO: 「AI_PROCTOR-1705 iibc2重ログイン回り暫定対応」　暫定的に認証エラーでも何もしない
          //if (this.isAuthError) {
          //  this.stopMonitoring(MonitoringStopReason.OTHER_AUTH_ERROR)
          //  return;
          //}

          if (this.testerPage.testerState === TesterState.EXAMING) {
            // テスターステータス変更を監視: 試験開始 or 再開

            if (this.monitoring.startTime == null) {
              // 試験開始

              this.monitoring.startTime = Date.now()

              this.startRecord()
                .then(() => {
                  // 録画利用ありの場合、録画状況を変更する
                  if (this.inParams.isRecord == 1) {
                    this.recordingStatus = RecordingStatus.RECORDING
                  }
                })
            }
          }

          // 時間経過を監視
          {
            if (
              isTimeoutOfRecord()
              //((this.inParams.isRecord == 1 && this.inParams.isProctor == 1) && isTimeout()) ||
              //((this.inParams.isRecord == 1 && this.inParams.isProctor == 0) && isTimeoutOfRecord()) ||
              //((this.inParams.isRecord == 0 && this.inParams.isProctor == 1) && isTimeoutOfProctor()) ||
              //((this.inParams.isRecord == 0 && this.inParams.isProctor == 0) && false)
            ) {
              // タイムアウト

              this.stopMonitoring(MonitoringStopReason.OTHER_TIMEOUT)
              return
            }
          }
        }
      }, 1000)
    },
    /**
     * 受験者監視の後始末を行います。
     *
     * MC+においては、一回しか呼び出されません。
     * 外部試験においても、一回しか呼び出されません。
     *
     * @param {MonitoringStopReason}
     */
    finalizeMonitoring(reason: MonitoringStopReason) {
      // 終了時間を保持する
      //
      // この処理は、releaseResource()(正確にはstopRecord())の前に行われなければいけない。
      // uploadErrorイベントが発火してstartRecord()を再度実行される可能性があるため
      if (this.monitoring.endTime == null) {
        this.monitoring.endTime = Date.now();
      }

      /**
       * 通知処理/マッチング処理/録画処理の後始末を行います
       *
       * @return {Promise<boolean>}
       */
      const releaseResource = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
          Promise.all([
            // データポーリングの後始末
            (this as InstanceType<typeof DataPollingMixin>).stopDataPolling(),
            // 録画の後始末
            new Promise((resolve, reject) => {
              if ((this.inParams.isRecord == 1) && (this.monitoring.recordEndTime == null)) {
                this.monitoring.recordEndTime = Date.now()

                this.stopRecord()
                  .finally(() => {
                    // 録画利用ありの場合、録画状況を変更する
                    if (this.inParams.isRecord == 1) {
                      this.recordingStatus = RecordingStatus.AFTER_RECORDING;
                    }
                    resolve(true)
                  })
              } else {
                resolve(true)
              }
            }),
            // maching.phpのポーリング処理の後始末
            new Promise((resolve, reject) => {            
              if ((this.inParams.isProctor == 1) && (this.monitoring.proctorEndTime == null)) {
                this.monitoring.proctorEndTime = Date.now();

                (this as InstanceType<typeof TesterMatchingPollingMixin>).stopMatching()
                  .then(resolve)
                  .catch(reject)
              } else {
                resolve(true)
              }
            }),
          ])
          .then(() => {})
          .catch(() => {})
          .finally(() => {
            resolve(true)
          })
        })
      };
      /**
       * 受験者ステータスを「試験終了」ステータスに変更
       */
      const changeTesterStatusToFinishExam = () => {
        // TODO: フロント側からは受験者ステータスを「試験終了」ステータスを変更しない
        //return this.$store.dispatch(testerPageTypes.ACTION_TESTER_PAGE_SET_TESTER_STATE, TesterState.FINISH_EXAM)
        return Promise.resolve(true)
      };

      if (this.inParams.isMcStartup) {
        // MC+

        /**
         * MC+のテスターステータスを「試験終了」ステータスに変更
         */
        const changeTestStatusToStopForMc = () => {
          return new Promise((resolve, reject) => {
            // RTの試験ステータスを終了に変更する MC+にはフィードバックは行わない
            
            //this.$store.dispatch(testerPageTypes.ACTION_TESTER_PAGE_CHANGE_EXAM_STATUS, {
            //  login_id: this.loginData.loginId,
            //  process: ExamProcess.STOP,
            //  eai: '<dummy>', // TODO:この値はSTOPでは使われないので、とりあえずバリデーション回避用に適当な値
            //} as ExamStatusRequestType)
            Promise.resolve(true)
              .then(() => {
                //resolve(true)
              })
              .catch((error) => {
                console.error(error)
                //reject(error)
              })
              .finally(() => {
                resolve(true)
              })
          });
        };

        switch (reason) {
          // 認証エラー
          case MonitoringStopReason.MC_AUTH_ERROR:
            (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(true)
              .then(() => releaseResource())
              .then(() => this.$window.close(LogoutMethod.NONE))
              .finally(() => (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(false))
            break;

          // MC+の「サマリー表示」ボタン押下
          case MonitoringStopReason.MC_SHOW_SUMMARY:
            (this as InstanceType<typeof UtilsMixin>).setLoadingFilter(true) // MC+ このタイミングでは、動画アップロードを行わないので通常のローディングフィルター表示
              .then(() => new Promise((resolve) => {
                Promise.all([
                  changeTesterStatusToFinishExam(),
                  changeTestStatusToStopForMc(),
                ])
                .finally(() => resolve(true))
              }))
              .then(() => releaseResource())
              .then(() => {
                return new Promise((resolve, rejecct) => {
                  this.$store.dispatch(testerPageTypes.ACTION_TESTER_PAGE_GET_TEST_MARKINGS_LATEST)
                    .catch(() => console.log('受験者詳細APIでエラーが発生しました'))
                    .then(() => this.$router.replace('/exam-end?reason=click_show_summary'))
                    .then(() => resolve(true))
                })
              })
              .finally(() => (this as InstanceType<typeof UtilsMixin>).setLoadingFilter(false))
            break;

          // MC+の「ログアウト」ボタン押下
          case MonitoringStopReason.MC_LOGOUT:
            (this as InstanceType<typeof UtilsMixin>).setLoadingFilter(true) // MC+ このタイミングでは、動画アップロードを行わないので通常のローディングフィルター表示
              .then(() => new Promise((resolve) => {
                Promise.all([
                  changeTesterStatusToFinishExam(),
                  changeTestStatusToStopForMc(),
                ])
                .finally(() => resolve(true))
              }))
              .then(() => releaseResource())
              .then(() => {
                return new Promise((resolve, reject) => {
                  this.$window.cleanup(LogoutMethod.LOGOUT)
                    .finally(() => {
                      resolve()
                    })
                })
              })
              .finally(() => (this as InstanceType<typeof UtilsMixin>).setLoadingFilter(false))
            break;
        }
      } else {
        // 外部試験

        /**
         * 外部試験のステータスを「試験終了」ステータスに変更
         */
        const changeTestStatusToStopForOther = () => {
          return new Promise((resolve, reject) => {
            // 「試験終了」ステータスに変更
            this.otherExam.testerReq.process = ExamProcess.STOP;
            this.$store
              .dispatch(testerPageTypes.ACTION_TESTER_PAGE_CHANGE_TEST_STATUS, this.otherExam.testerReq)
              .then((data: TestStatusResponseType) => {
                resolve(true)
              })
              .catch((error) => {
                console.error(error)
                reject(error)
              })
          });
        };

        switch (reason) {

          // 認証エラー
          case MonitoringStopReason.OTHER_AUTH_ERROR:

            (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(true)
              // .then(() => (this as InstanceType<typeof WindowSizeChangeMixin>).resizeWindow()) // TODO: 使用的にこのタイミングでは最前面にしない
              .then(() => new Promise((resolve) => {
                Promise.all([
                  changeTesterStatusToFinishExam(),
                  changeTestStatusToStopForOther(),
                ])
                .finally(() => resolve(true))
              }))
              .then(() => releaseResource())
              .then(() => this.$window.close(LogoutMethod.NONE))
              .finally(() => (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(false))
            break;

          // タイムアウト
          case MonitoringStopReason.OTHER_TIMEOUT:

            (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(true)
              // .then(() => (this as InstanceType<typeof WindowSizeChangeMixin>).resizeWindow()) // TODO: このタイミングで全面表示にすると、必ずしも最前面に表示されない問題があるので、何もしない
              .then(() => new Promise((resolve) => {
                Promise.all([
                  changeTesterStatusToFinishExam(),
                  changeTestStatusToStopForOther(),
                ])
                .finally(() => resolve(true))
              }))
              .then(() => releaseResource())
              .then(() => (this as InstanceType<typeof WindowSizeChangeMixin>).changeWindow(`/exam-end?reason=timeout`)) //
              .finally(() => (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(false))
            break;

          // 外部試験の「サマリー表示」ボタン押下
          case MonitoringStopReason.OTHER_SHOW_SUMMARY:
            (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(true)
              .then(() => (this as InstanceType<typeof WindowSizeChangeMixin>).resizeWindow())
              .then(() => new Promise((resolve) => {
                Promise.all([
                  changeTesterStatusToFinishExam(),
                  changeTestStatusToStopForOther(),
                ])
                .finally(() => resolve(true))
              }))
              .then(() => releaseResource())
              .then(() => {
                return new Promise((resolve, rejecct) => {
                  this.$store.dispatch(testerPageTypes.ACTION_TESTER_PAGE_GET_TEST_MARKINGS_LATEST)
                    .catch(() => console.log('受験者詳細APIでエラーが発生しました'))
                    .then(() => this.$router.replace('/exam-end?reason=click_show_summary'))
                    .then(() => resolve(true))
                })
              })
              .finally(() => (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(false))
            break;

          // 外部試験の「ログアウト」ボタン押下
          case MonitoringStopReason.OTHER_LOGOUT:
            (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(true)
              .then(() => (this as InstanceType<typeof WindowSizeChangeMixin>).resizeWindow())
              .then(() => new Promise((resolve) => {
                Promise.all([
                  changeTesterStatusToFinishExam(),
                  changeTestStatusToStopForOther(),
                ])
                .finally(() => resolve(true))
              }))
              .then(() => releaseResource())
              .then(() => {
                return new Promise((resolve, reject) => {
                  this.$window.cleanup(LogoutMethod.LOGOUT)
                    .finally(() => {
                      resolve()
                    })
                })
              })
              .finally(() => (this as InstanceType<typeof UtilsMixin>).setLoadingFilterWithAlert(false))
            break;
        }
      }
    },
    /**
     * 受験者監視を停止します
     *
     * @param {MonitoringStopReason} reason
     */
    stopMonitoring(reason: MonitoringStopReason): void {
      if (this.monitoring.intervalTimer) {
        clearInterval(this.monitoring.intervalTimer);
        this.monitoring.intervalTimer = null;

        // 後始末処理を行う
        this.finalizeMonitoring(reason);
      }
    },
    /**
     * 録画を開始います
     *
     * @return {Promise<boolean>}
     */
    startRecord(): Promise<boolean> {
      if (this.inParams.isRecord == 1) {
        return new Promise((resolve, reject) => {
          this.$startUploader(
            this.mediaStream!,
            // イベントハンドラ
            {
              /**
               * 初期化時にエラーが発生したときに発火するイベントのハンドラ
               *
               * これが発火した時点でその受験者は録画できない。
               *
               * @param {UploaderEvent} event
               * @return {Promise<boolean>}
               */
              initializeError: (event: UploaderEvent) => {
                const errorString = event.errorString as string;

                // @ts-ignore
                if (this.$ua.browser() === 'Safari'
                  && (
                    errorString.match(/NotSupportedError/g) ||
                    errorString.match(/MediaRecorder/g) ||
                    errorString.match(/isTypeSupported/g)
                  )
                ) {
                  // safari - Recording API NotSupportedErrorの

                  // TODO: 初期化エラーが発生したら対処のしようがないので、どうすればいいかわからない。エラー画面にでも飛ばす？
                  return Promise.resolve(true)
                } else {
                  // TODO: 初期化エラーが発生したら対処のしようがないので、どうすればいいかわからない。エラー画面にでも飛ばす？
                  return Promise.resolve(true)
                }
              },
              /**
               * アップロード時にエラーが発生したときに発火するイベントのハンドラ
               *
               * @param {UploaderEvent} event
               * @return {Promise<boolean>}
               */
              uploadError: (event: UploaderEvent) => {
                // モニタリングの終了していない && 録画最長時間を超えていない場合
                if (
                  (this.monitoring.endTime == null) &&
                  (this.inParams.isRecord == 1 ? this.monitoring.recordEndTime == null : true)
                ) {
                  return this.startRecord()
                } else {
                  return Promise.resolve(true)
                }
              },
            },
            // MediaRecorderオプション
            {
              videoBitsPerSecond: videoBitsPerSecond(this.inParams.videoRecordingPreference),
              audioBitsPerSecond: ((this.inParams.isVoiceRecording == 1) ? audioBitsPerSecond(this.inParams.voiceQualityPreference) : 0), //TODO: 音声録音なしが機能しない
              timeslice: getTimeSlice(this.inParams.voiceQualityPreference, this.inParams.videoRecordingPreference) * 1000
            }
          )
          .then(() => resolve(true))
          .catch(reject)
        })
      } else {
        return Promise.resolve(true);
      }
    },
    /**
     * 録画を終了します
     *
     * @return {Promise<boolean>}
     */
    stopRecord(): Promise<boolean> {
      if (this.inParams.isRecord == 1) {
        return new Promise((resolve, reject) => {
          console.log('stopRecord()を実行しました。');

          this.$stopUploader()
            .then(() => resolve(true))
            .catch(() => reject())
        });
      } else {
        return Promise.resolve(true);
      }
    },
    /**
     * 試験を実行します:
     */
    execExam() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch(commonTypes.ACTION_COMMON_SET_LOADING, true)
          .then(() => {
            // テスターステータスの更新
            PromiseUtils.repeatUntilSuccessful(
              () => this.$store.dispatch(testerPageTypes.ACTION_TESTER_PAGE_SET_TESTER_STATE, TesterState.BEFORE_EXAM),
              {}
            )
            .then(() => {
              if (this.inParams.isMcStartup) {
                return this.execMcExam();
              } else {
                return this.execOtherExam();
              }
            })
          })
          .finally(() => this.$store.dispatch(commonTypes.ACTION_COMMON_SET_LOADING, false))
      })
    },
    /**
     * MC+試験を実行します
     */
    execMcExam() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch(testerPageTypes.ACTION_TESTER_PAGE_GET_ACCESS_TOKEN_FOR_MC, GetMcTokenMode.PROCTOR_TOKEN_MODE_ID)
          .then((adapter: GetMcTokenAdapter) => {
            const examUrl = adapter.windowOpenURL + '?token=' + adapter.accessToken;

            if (this.inParams.isRecord == 1 || this.inParams.isProctor == 1) {
              // PC・モバイル/MC+利用/録画ありor監視あり

              // MC+画面へ遷移
              this.testerPagePhase = TesterPagePhase.MC_EXAMINING;
              this.mcExam.url = examUrl;
              resolve(true)
            } else {
              // PC・モバイル/ MC+利用/録画なしand監視なし

              // ログアウト処理し、MC+に遷移
              this.$window.moveExternalUrl(examUrl, LogoutMethod.NONE)
                .then(() => resolve(true))// この処理は実行されない
            }
          })
          .catch((err: any) => {
            // MC起動URLが取得できなかった場合のエラー処理
            console.error('MC起動URLが取得できませんでした。', err);
            reject(err)
          })
      })
    },
    /**
     * 外部試験を実行します
     */
    execOtherExam() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch(testerPageTypes.ACTION_TESTER_PAGE_GET_ACCESS_TOKEN_FOR_OTHER)
          .then((adapter) => {
            const examUrl = decodeURIComponent(this.inParams.examUrl);
            const examName = decodeURIComponent(this.inParams.examName);

            if (this.inParams.isRecord == 1 || this.inParams.isProctor == 1) {
              // PC・モバイル/MC+利用/録画ありor監視あり

              (this as InstanceType<typeof WindowSizeChangeMixin>).splitWindow(examUrl, examName)
              .then(() => {
                this.testerPagePhase = TesterPagePhase.OTHER_EXAMINING;
                this.otherExam.testerReq = {
                  process: ExamProcess.START,
                  eai: `${Date.now()}_${this.loginData.examUserName}`,
                  groupId: this.loginData.groupId,
                  group: this.loginData.group,
                  region: `${this.inParams.region} ${this.inParams.examDatetime}`,
                  testName: this.inParams.examName
                };
                const changeTestStatusForOther = () => {
                  this.$store
                    .dispatch(testerPageTypes.ACTION_TESTER_PAGE_CHANGE_TEST_STATUS, this.otherExam.testerReq)
                    .then((data: TestStatusResponseType) => {
                      console.log(data);
                      resolve(true)
                    })
                    .catch((err) => {
                      console.error(err);
                      this.otherExam.testerReq.eai = `${Date.now()}_${this.loginData.examUserName}`;
                      setTimeout(() => changeTestStatusForOther(), 5000);
                    });
                };
                changeTestStatusForOther();
              })
            } else {
              // PC・モバイル/MC+未使用/録画なしand監視なし

              // ログアウト処理し、外部テストに遷移
              this.$window.moveExternalUrl(examUrl, LogoutMethod.LOGOUT)
                .then(() => resolve(true))// この処理は実行されない
            }
          })
          .catch((err: any) => {
            // 外部試験では現在アクセストークン取得/ログイン等は行っていないのでエラー処理のこのブロックには入ってこない
            console.error('外部試験にログインできませんでした。', err);
            reject(err)
          })
      })
    },
    /**
     * 試験終了画面に画面遷移します
     *
     * MC+は「サマリー表示」ボタン/「ログアウト」ボタン押下で試験終了し画面遷移・ログアウトを行います
     */
    onClickMcShowSummary() {
      this.stopMonitoring(MonitoringStopReason.MC_SHOW_SUMMARY);
    },
    /**
     * ログアウトして、ログイン画面にリロードします
     *
     * MC+は「サマリー表示」ボタン/「ログアウト」ボタン押下で試験終了し画面遷移・ログアウトを行います
     */
    onClickMcLogout() {
      this.stopMonitoring(MonitoringStopReason.MC_LOGOUT);
    },
    /**
     * 試験終了画面に画面遷移します
     *
     * 外部試験は「タイムアウト」か「サマリー表示」ボタン/「ログアウト」ボタン押下で試験終了し画面遷移・ログアウトを行います
     */
    onClickOtherShowSummary() {
      this.stopMonitoring(MonitoringStopReason.OTHER_SHOW_SUMMARY);
    },
    /**
     * ログアウトして、ログイン画面にリロードします
     *
     * 外部試験は「タイムアウト」か「サマリー表示」ボタン/「ログアウト」ボタン押下で試験終了し画面遷移・ログアウトを行います
     */
    onClickOtherLogout() {
      this.stopMonitoring(MonitoringStopReason.OTHER_LOGOUT);
    },
  }
});
</script>

<style lang="scss" scoped>
</style>

```