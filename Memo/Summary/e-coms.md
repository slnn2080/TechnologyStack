### 问题: www下用户考试时摄像头没有开启

> 目标页面
- /examining

> 目标组件: 
- Examining

> 以 Examining 出发 依次整理

    | - Examining
      - guardActorPage -- middleware


---

> guardActorPage 中间件

> 要点1: 引入类型
- 从 @nuxt/types 中 引出 
  Context的类型
  Middleware的类型

- 从 store/types/ 下引出
  rootTypes
  loginTypes

- 从 store/types/adapters/ 下引出
  startupAdapter

- 从 store/enum/pageTransition 下引出
  PagePathUtils


> rootTypes
- 这里定义了一堆常量字符串 为root模块下的 getters mutations actions
```ts
// Getters
// 已经启动
export const GETTER_IS_STARTUPPED: string = 'root/GETTER_IS_STARTUPPED';
// 启动
export const GETTER_STARTUP: string = 'root/GETTER_STARTUP';
// 启动 url
export const GETTER_STARTUP_URL: string = 'root/GETTER_STARTUP_URL';
// 显示语言
export const GETTER_DISPLAY_LANG: string = 'root/GETTER_DISPLAY_LANG';

// Mutations
// mutation 启动
export const MUTATION_STARTUP: string = 'root/MUTATION_STARTUP';
// mutation 语言
export const MUTATION_LANGUAGE: string = 'root/MUTATION_LANGUAGE';

// Actions
// 启动
export const ACTION_STARTUP: string = 'root/ACTION_STARTUP';
// 退出并返回登录页
export const ACTION_LOGOUT_AND_REDIRECT_LOGIN_PAGE: string = 'root/ACTION_LOGOUT_AND_REDIRECT_LOGIN_PAGE';
// 启动F5
export const ACTION_STARTUP_FOR_F5: string = 'root/ACTION_STARTUP_FOR_F5';
// 启动子窗口
export const ACTION_STARTUP_FOR_CHILD_WINDOW: string = 'root/ACTION_STARTUP_FOR_CHILD_WINDOW';
// 设置raw参数
export const ACTION_SET_RAW_STARTUP_PARAMETER: string = 'root/ACTION_SET_RAW_STARTUP_PARAMETER';
```


> loginTypes
- 这里定义了一堆常量字符串 为login模块下的 getters mutations actions
```ts
/* eslint-disable prettier/prettier */
// Getters
// 是不是已经登录了
export const GETTER_IS_LOGGED_IN: string = 'login/GETTER_IS_LOGGED_IN';
// 登录
export const GETTER_LOGIN: string = 'login/GETTER_LOGIN';
// 有token
export const GETTER_HAS_ACCESS_TOKEN: string = 'login/GETTER_HAS_ACCESS_TOKEN';
// 获取token
export const GETTER_GET_ACCESS_TOKEN: string = 'login/GETTER_GET_ACCESS_TOKEN';

// Mutations
// 设置toekn
export const MUTATION_SET_ACCESS_TOKEN: string = 'login/MUTATION_SET_ACCESS_TOKEN';
// 使用 actor 设置 token
export const MUTATION_SET_ACCESS_TOKEN_WITH_ACTOR: string = 'login/MUTATION_SET_ACCESS_TOKEN_WITH_ACTOR';
// 登录
export const MUTATION_LOGIN: string = 'login/MUTATION_LOGIN';
// 退出
export const MUTATION_LOGOUT: string = 'login/MUTATION_LOGOUT';

// Actions
// 设置token
export const ACTION_SET_ACCESS_TOKEN = 'login/ACTION_SET_ACCESS_TOKEN';
// 使用 actor 设置 token
export const ACTION_SET_ACCESS_TOKEN_WITH_ACTOR = 'login/ACTION_SET_ACCESS_TOKEN_WITH_ACTOR';
// 登录
export const ACTION_LOGIN: string = 'login/ACTION_LOGIN';
// jtesting 登录
export const ACTION_LOGIN_FOR_JTESTING: string = 'login/ACTION_LOGIN_FOR_JTESTING';
// 子窗口登录
export const ACTION_LOGIN_FOR_CHILD_WINDOW = 'login/ACTION_LOGIN_FOR_CHILD_WINDOW';
// 退出
export const ACTION_LOGOUT: string = 'login/ACTION_LOGOUT';

```


```ts
/* eslint-disable prettier/prettier */
import { Middleware, Context } from '@nuxt/types';
import * as rootTypes from '@/store/types/rootType';
import * as loginTypes from '@/store/types/loginType';
import StartupAdapter from '@/store/types/adapters/startupAdapter';
import { PagePathUtils } from '@/store/enum/pageTransition';

const guardActorPageMiddleware: Middleware = (context: Context) => {
  const prevPath = context.from.path;
  const currentPath = context.route.path;

  console.log('[Middleware INFO] page guard : ', context);
  if (prevPath === currentPath || !context.isDev) {
    console.error('[Middleware LOG] previous path and current path is same!');
    // window.location.href = '/';
    // context.error({
    //   statusCode: 404,
    //   message: "'F5' リフレッシュは禁止です。"
    // });
  }

  // ログインしているか？
  const isLoggedIn = context.store.getters[loginTypes.GETTER_IS_LOGGED_IN]
  // ログインデータ
  const loginData = context.store.getters[loginTypes.GETTER_LOGIN]
  if (PagePathUtils.isAllowedPage(isLoggedIn, loginData.actor, currentPath)) {
    console.log('[Middleware LOG] correct actor page : ', currentPath);
  } else {
    console.error('[Middleware LOG] incorrect actor page : ', currentPath);
    // window.location.href = '/';
    // context.error({
    //   statusCode: 404,
    //   message: "ページがありません。"
    // });
  }
};

export default guardActorPageMiddleware;

```


> startupAdapter.js
- 启动适配器

> 要点:
> 1. camel-case 包
- 它是将- . _ 空格 等分割的字符串转为驼峰式的一个工具包
- 示例:
```js
import { camelCase } from "camel-case";

camelCase("string"); //=> "string"
camelCase("dot.case"); //=> "dotCase"
camelCase("PascalCase"); //=> "pascalCase"
camelCase("version 1.2.10"); //=> "version_1_2_10"



import { camelCaseTransformMerge } from "camel-case";

camelCase("version 12", { transform: camelCaseTransformMerge }); //=> "version12"
```


> 2. 这个就应该是在 kickRT 上设置的参数就会在这里吧

- 这个 StartupAdapter 被实例化的时候 利用constructor中的形参默认值 给适配器做了初始化
```js
import { camelCase } from 'camel-case';

export default class StartupAdapter {

  // 下面这一排都是 形参 ...  并附有默认值
  constructor(
    public rawStartupUrl: string = '',

    public inServer: string = '',
    public target: string = '',

    // TODO: J-Testingでのログインの場合、このパラメータが上書きされるので注意 本来は1 or 2のみを取る値であるが、上書きされた場合、他の値が来るので、常に1と比較しなければいけない
    public actor: number = 0, 
    public lang: string = 'ja',
    public isMobile: number = 0,
    public isMcStartup: number = 0,
    public isProctor: number = 0,
    public isAuth: number = 0,
    public examUrl: string = '',
    public region: string = '',
    public examName: string = '',
    public examDatetime: Date | any = null,
    public isVoiceRecording: number = 0,
    public isRecord: number = 0,
    public isSummary: number = 0,
    // 1～4の数字がアンダースコアで連結された文字列。文字列に含まれる数字（例：1_3_4）によって、それぞれ以下の解析種類が選択されたことを意味する。1:eye_rot 2:other_person 3:people_num 4:voice
    public selectedAnalysisTypes: string = '', 
    public maxRectime: number = 0,
    public matchingTimeout: number = 0,
    public testerRetry: number = 0,
    public checkerRetry: number = 0,
    public webrtcTimeout: number = 0,
    public intervaltime: number = 0,
    public webrtcMaxTime: number = 0,
    // 1-3:する 0:しない
    public isDebug: IsDebug = 0, 
    public isConv: number = 0,
    public videoRecordingPreference: number = 0,
    public voiceQualityPreference: number = 0,
    public passwordUrl: string = '',
    public memo: string = '',
    public isAiAuth: number = 1, // 1：監視者 2:AI
    public isAiFaildManual: number = 1, // 1:強制ログアウト　2:監視者 3:続行
    public isAiIdcardRequest: number = 0, // 1:する 0:しない
    public aiFaceRetry: number = 0,
    public aiIdcardRetry: number = 0,
    public aiAllRetry: number = 0,
    public aiIdcardType: number = 0, // 1：運転免許証、２：パスポート、３：マイナンバーカード
    public aiNameMatch: number = 0,

    public isForce: number = 0,
    public eai: string = '',
    public termSetCode: string = '',

    // このパラメータはJ-Testingのログインの際にmergeされるパラメータ 型情報が異なるので注意
    public accessToken: string | null= '',
    public examUserName: string | null = '',
    public loginId: string | null = '',
    public password: string | null = '',
    //public actor: string | null = '', // TODO:startupパラメータにも同名のパラメータがあるので注意 この値は、startupパラメータと異なり、1 or 2 以外も受け入れるので注意
    public kicked: string | null = '',
    public group: string | null = '',
    public groupId: string | null = '',
  ) {}

  /**
   * スタートアップパラメータ(キャメルケース)をスタートアップアダプターに変換します
   * 将启动参数(camercase)转换成启动适配器。
   *
   * @param {RawStartupParameter} rawStartupParameter
   * @return {StartupAdapter}
   */


  // 作用: 传递一个适配器参数对象 修改适配器的默认参数对象
  // 传过来一个 RawStartupParameter 类型的参数 返回值是StartupAdapter适配器
  public static fromRawStartupParameter(rawStartupParameter: RawStartupParameter): StartupAdapter {
    // 创建 适配器实例
    const r = new StartupAdapter()

    // 如果有 实参 实参的类型是一个对象
    if (rawStartupParameter) {

      // 将对象的key value转为[key, value]数组 并获取每一对的kv
      Object.entries(r).forEach(([k, v]) => {
        // 赋值操作 将实参对象中k所对应的值 赋值给实例对象默认k所对应的值 如果实参对象中没有该值 则使用原本的值
        (r as any)[k] = (rawStartupParameter as any)[k] || v;
      });
    }

    // 返回适配器
    return r
  }

  /**
   * スタートアップアダプターをスタートアップパラメータ(キャメルケース)に変換します
   *
   * @param {StartupAdapter} adapter
   * @return {RawStartupParameter}
   */

  // 作用: 将适配器对象中的key value转换为参数对象 {key: value, ...}
  // 实参是适配器 返回值为任意kv
  public static toRawStartupParameter(adapter: StartupAdapter): RawStartupParameter {
    return { ...adapter }
  }



  /**
   * クエリをスタートアップパラメータ(キャメルケース)に変換します
   *
   * @param {string} query
   * @return {RawStartupParameter}
   * @see front/middleware/initCheck.ts getQuery()
   */

  // 传入 urlquerystring 将其转换为 适配器参数对象
  public static toRawStartupParameterFromQuery(query: string): RawStartupParameter {
    const rawStartupParameter: RawStartupParameter = {}
    query
      .split('?')[1]
      .split('&')
      .forEach((v) => {
        // eslint-disable-next-line prefer-const
        let [key, value] = v.split('=');
        if (isNaN(+value)) {
          if (value === '%22%22' || value === '%27%27') {
            value = '';
          }
          rawStartupParameter[camelCase(key)] = decodeURIComponent(value);
        } else {
          rawStartupParameter[camelCase(key)] = +value;
        }
      });

    return rawStartupParameter
  }

  /**
   * J-Testingで起動したか調べます
   *
   * @param {StartupAdapter} startup
   * @return {boolean}
   */
  // 查看你是否用 J-Testing 启动的适配器 返回值为boolean
  public static isJtStartUp(startup: StartupAdapter): boolean {
    // 根据loginId来判断
    return startup.loginId != null && startup.loginId != ''
  }
}


// IsDebug的类型
export type IsDebug = null | number; // 1-3:する 0:しない

/**
 * @type スタートアップパラメータ(キャメルケース) 
 *
 * この型は、StartupAdapterとは異なる使い方をするために定義してる。
 * 这个句式是为了使用与StartupAdapter不同的用法而定义的。
 * 
 * sessionStorageに格納したり、URLパラメータとして渡すためにクラスインスタンスでは使いづらいため。
 * 因为要存储在sessionStorage中，或者作为URL参数传递，在类实例中很难使用。
 * 
 * また、変換メソッド/パースメソッドについては、StartupAdapterに定義しているので、それ以外での変換を行ってはいけない
 * 另外，关于转换方法/分析方法，因为在StartupAdapter中有定义，所以不能进行除此以外的转换。
 */
// 定义了一个类型 启动参数的类型 任意
export type RawStartupParameter = { [key: string]: any };


```

---

> pageTransition.ts
- 这个文件内 首先引入了
- import { Actor, ActorUtils } from '@/store/enum/Actor';

- 我们依次看看他们都是干什么的

> Actor.ts
- 这个文件内 首先引入了
- import { LanguageEnum } from '~/store/enum/language';

- 我们看看 LanguageEnum 里面写的是什么
- 