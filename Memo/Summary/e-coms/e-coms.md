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

- 总结:
- 这个类是控制 适配器 的一个类
- 1. 类中的构造器里面利用形参 先初始化了成员属性
- 2. 传递一个参数对象 修改适配器中的配置配置
- 3. 获取给定适配器的参数
- 4. 传入url字符串转换为适配器参数

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

> pageTransition.ts (引入 PagePathUtils)
- 这个文件内 首先引入了
- import { Actor, ActorUtils } from '@/store/enum/Actor';

- 我们依次看看他们都是干什么的

    | - store
      | - enum
        - pageTransition.ts
          - Actoor.ts
            - language.ts

> Actor.ts
- 这个文件内 首先引入了
- import { LanguageEnum } from '~/store/enum/language';

> 我们看看 LanguageEnum 里面写的是什么
- 1. 首先它引进来两段文本 分别是中英文的提示文本和协议文本
```js
// 提示文本
import ENV_SETTING_TERM_OF_USE_TEXT_JA from '../const/ja/ENV_SETTING_TERM_OF_USE_TEXT';
import ENV_SETTING_TERM_OF_USE_TEXT_EN from '../const/en/ENV_SETTING_TERM_OF_USE_TEXT';

// 协议文本
import ENV_SETTING_NOTES_AND_AGREEMENTS_TEXT_JA from '../const/ja/ENV_SETTING_NOTES_AND_AGREEMENTS_TEXT';
import ENV_SETTING_NOTES_AND_AGREEMENTS_TEXT_EN from '../const/en/ENV_SETTING_NOTES_AND_AGREEMENTS_TEXT';
```

- 2. 这个文件里面创建了 两个 枚举类 和 两个 namespace 和 一个类型
- 两个语言类的枚举类 可能是做i18n用的 都是各个页面上 有出现语言的地方分别对应的语言
```js
export enum JapaneseLanguageEnum { }


export namespace JapaneseLanguageEnum { }

export enum EnglishLanguageEnum { }

export namespace EnglishLanguageEnum { }

export type LanguageEnum =
  | typeof JapaneseLanguageEnum
  | typeof EnglishLanguageEnum;
```

> 我们再看看 Actor.ts 文件本身的内容
- 总结:
- 这个类是跟角色有关系的
- 1. 这个类中的 枚举类中 定义了多种角色
- 2. 单个角色的数据类型 id name isAccessLimitTarget
- 3. 这个类中还提供了一套工具类
  - 获取角色列表
  - 传入语言创建角色数据数组
  - 传入语言和给定角色 返回对应的角色数据
  - 返回角色名

```ts
// 应该是系统中会出现的角色 参考人员的默认值为1
export enum Actor {
  /** 受験者 */
  TESTER = 1,
  /** 監視者 */
  CHECKER,
  /** 試験管理者 */
  TEST_MANAGER,
  /** システム管理者 */
  SYSTEM_MANAGER,
  /** 監督官 */
  SUPERVISOR,
}


// 系统角色相关的数据类型
export type ActorData = {
  id: Actor;
  name: string;
  // 是否是访问限制的目标
  isAccessLimitTarget: boolean;
};


// 系统角色的工具类
export class ActorUtils {
  /**
   * アクターリストを生成します
   *
   * @return {Actor[]}
   */

  // 返回的是一个角色数组
  public static getList(): Actor[] {
    return [
      Actor.TESTER,
      Actor.CHECKER,
      Actor.TEST_MANAGER,
      Actor.SYSTEM_MANAGER,
      Actor.SUPERVISOR,
    ];
  }

  /**
   * アクター情報リストを生成します
   *
   * @param {LanguageEnum} displayLang
   * @return {ActorData[]}
   */

  // 创建 系统角色 的 数据列表
  // displayLang: 需要显示的语言, 类型为 LanguageEnum
  // 返回值: ActorData类型的数组 id: Actor; name: string; isAccessLimitTarget: boolean; 

  // 我觉得这个可能是默认的数据列表
  public static makeActorDataList(displayLang: LanguageEnum): ActorData[] {
    return [
      {
        id: Actor.TESTER,
        name: displayLang.ACTOR_TESTER,
        isAccessLimitTarget: false,
      },
      {
        id: Actor.CHECKER,
        name: displayLang.ACTOR_CHECKER,
        isAccessLimitTarget: true,
      },
      {
        id: Actor.TEST_MANAGER,
        name: displayLang.ACTOR_TEST_MANAGER,
        isAccessLimitTarget: true,
      },
      {
        id: Actor.SYSTEM_MANAGER,
        name: displayLang.ACTOR_SYSTEM_MANAGER,
        isAccessLimitTarget: true,
      },
      {
        id: Actor.SUPERVISOR,
        name: displayLang.ACTOR_SUPERVISOR,
        isAccessLimitTarget: true,
      },
    ];
  }

  /**
   * アクターの文字列表現を取得します
   *
   * @param {Actor} actor
   * @param {LanguageEnum} displayLang
   * @return {ActorData | null}
   */

  // 获取 系统角色 的字符串(数据)
  // 参数: actor 一个角色
  // 参数: 显示的语言 
  // 返回值: id name isAccessLimitTarget 或者是 null
  public static getActorData(actor: Actor, displayLang: LanguageEnum): ActorData | null {
    // 传入要显示的语言 生成一个 多种角色的列表
    const list = ActorUtils.makeActorDataList(displayLang);

    // 从列表中找到 给定角色(参数)所对应你的数据
    const found = list.find(v => v.id == actor);
    if (found == undefined) {
      return null;
    }
    return found;
  }

  /**
   * アクターの文字列表現を取得します
   *
   * @param {Actor} actor
   * @param {LanguageEnum} displayLang
   * @return {string}
   */

  // 返回角色名
  public static toString(actor: Actor, displayLang: LanguageEnum): string {
    const found = ActorUtils.getActorData(actor, displayLang);
    if (! found) {
      return '';
    }
    return found.name;
  }
}

```


> pageTransition.ts
- 我们再看看这个文件本身的逻辑

- 总结:
- 这是一个跟 路径 或者说 角色可允许页面的相关的文件
- 1. 首先定义了 常量 和 路径对象的映射对象
```js
export const pagePathInfoMap: { [pageName: string] : PagePathInfo } = {
  LOGIN_PAGE: {
    path: '/login',
    match: Defaults.equalsPath,
    bodyId: 'PRE00001',
  },
}
```

- 2. 定义了允许登录的页面的map 从上述的map中挑选了一部分map拿下来的
- 3. 操作页面信息的工具类
  - 是否是同意允许的页面
  - 



**问题:**
- 这个文件中有一个不明白的地方 为什么 *PagePath* 它的属性值类型是应该是 对象 但是这里却是一个 string 呢
```js
export const PagePath: {[pageName: string]: string} = (function () {

  // 初始化为空对象
  const result: {[pageName: string]: string} = {};

  // 返回的是 LOGING: "/login" 这样的一个对象
  Object.entries(pagePathInfoMap)
    .forEach(([key, value]) => {
      result[key] = value.path;
    })
  return result;
}())
```


```js
/* eslint-disable prettier/prettier */
import { Actor, ActorUtils } from '@/store/enum/Actor';

// 定义了 页面路径信息 的类型
type PagePathInfo = {
  path: string;
  match: (self: PagePathInfo, path: string) => boolean;
  bodyId: string | ((self: PagePathInfo, isLoggedIn: boolean, actor: Actor) => string);
}

/**
 * デフォルトメソッド
 *
 * @class
 */

// 默认方法 返回值类型 any
const Defaults: any = {
  /**
   * パスの比較関数
   *
   * @param {PagePathInfo} self
   * @param {string} path
   * @return {boolean}
   */


  // 是否等于 path 判断两个路径是否相等
  equalsPath(self: PagePathInfo, path: string): boolean {
    return self.path == path;
  },

  /**
   * パスの比較関数
   *
   * @param {PagePathInfo} self
   * @param {boolean} isLoggedIn
   * @param {Actor} actor
   * @return {string}
   */

  // 传入角色 如果该角色没有定义的话 我们返回错误信息
  getBodyId(self: PagePathInfo, isLoggedIn: boolean, actor: Actor): string {
    switch (actor) {
      case Actor.TESTER:
      case Actor.CHECKER:
      case Actor.TEST_MANAGER:
      case Actor.SYSTEM_MANAGER:
      case Actor.SUPERVISOR:
        return ''

      default:
        throw new Error(`定義されていないアクターが指定されました。(actor=${actor})`);
    }
  },
}

/**
 * @const ページパス情報の連想配列
 */

// 这是直接定义了一个对象 并且定义了对象中的值 也是对象 对象套对象(属性名任意 值的类型有指定)
// 参数: 属性名任意 值类型是pathInfo
export const pagePathInfoMap: { [pageName: string] : PagePathInfo } = {
  //========================================
  // 共通ページ
  //========================================
  LOGIN_PAGE: {
    path: '/login',
    match: Defaults.equalsPath,
    bodyId: 'PRE00001',
  },
  REDIRECT_PAGE: {
    path: '/redirect',
    match: Defaults.equalsPath,
    bodyId: '',
  },
  IFRAME_PAGE: {
    path: '/iframe',
    match: Defaults.equalsPath,
    bodyId: '',
  },
  // /alerting/system-errorもこのページとして扱う
  ALERTING_PAGE: {
    path: '/alerting/[^/]+',
    match: (self: PagePathInfo, path: string): boolean => {
      return /^\/alerting\/[^/]+\/?$/.test(path)
    },
    bodyId: '',
  },
  //========================================
  // 受験者
  //========================================
  ENV_SETTING_PAGE: {
    path: '/env-setting',
    match: Defaults.equalsPath,
    bodyId: 'PRE00002',
  },
  IDENTIFICATION_PAGE: {
    path: '/identification',
    match: Defaults.equalsPath,
    bodyId: 'PRE00003',
  },
  AI_IDENTIFICATION_PAGE: {
    path: '/identification-ai',
    match: Defaults.equalsPath,
    bodyId: 'PRE00003',
  },
  EXAMINING_PAGE: {
    path: '/examining',
    match: Defaults.equalsPath,
    bodyId: 'PRE00004',
  },
  EXAM_END_PAGE: {
    path: '/exam-end',
    match: Defaults.equalsPath,
    bodyId: 'PRE00005',
  },
  TERMS_PAGE: {
    path: '/terms',
    match: Defaults.equalsPath,
    bodyId: '',
  },
  // J-testing専用
  CLOSE_PAGE: {
    path: '/close',
    match: Defaults.equalsPath,
    bodyId: '',
  },
  //========================================
  // 監視者/管理者
  //========================================
  MONITORING_PAGE: {
    path: '/monitoring',
    match: Defaults.equalsPath,
    bodyId: 'PRE00006',
  },
  MANAGEMENT_PAGE: {
    path: '/management',
    match: Defaults.equalsPath,
    bodyId: 'PRE00007',
  },
  EXAMINEES_PAGE: {
    path: '/examinees',
    match: Defaults.equalsPath,
    bodyId: 'PRE00007',
  },
  EXAMINEES_DETAIL_PAGE: {
    path: '/examinees/\\d', // パスに受験者IDとか入る場合は正規表現でいい？
    match: (self: PagePathInfo, path: string): boolean => {
      return /^\/examinees\/\d+\/?$/.test(path)
    },
    bodyId: 'PRE00007',
  },
  CHECKERS_MONITORING_PAGE: {
    path: '/checkers/monitoring',
    match: Defaults.equalsPath,
    bodyId: 'PRE00007',
  },
  ANALYSISI_REQUEST_PAGE: {
    path: '/analysis-request',
    match: Defaults.equalsPath,
    bodyId: 'PRE00007',
  },
  ACCESS_LIMIT_PAGE: {
    path: '/access-limit',
    match: Defaults.equalsPath,
    bodyId: 'PRE00007',
  },
  LOGVIEW_PAGE: {
    path: '/logview',
    match: Defaults.equalsPath,
    bodyId: 'PRE00007',
  },
  DELETE_SETTING_PAGE: {
    path: '/delete-setting',
    match: Defaults.equalsPath,
    bodyId: 'PRE00007',
  },
  DELETE_PLAN_PAGE: {
    path: '/delete-plan',
    match: Defaults.equalsPath,
    bodyId: 'PRE00007',
  },
  LOGINS_PAGE: {
    path: '/logins',
    match: Defaults.equalsPath,
    bodyId: 'PRE00007',
  },
}

// 允许的页面的 数据类型
type AllowedPage = {
  firstPage: PagePathInfo;
  pageList: PagePathInfo[];
};

/**
 * @const 
 */
// 这个有点像路由啊
const commonAllowdPageList: PagePathInfo[] = [
  pagePathInfoMap.LOGIN_PAGE,
  pagePathInfoMap.REDIRECT_PAGE,
  pagePathInfoMap.IFRAME_PAGE,

  pagePathInfoMap.ALERTING_PAGE,  // TODO: 受験者専用ページだがログインしていない(actor情報を持っていない)状態でも画面遷移できるページなので、共通ページとして扱う
  pagePathInfoMap.TERMS_PAGE,     // TODO: 受験者専用ページだがログインしていない(actor情報を持っていない)状態でも画面遷移できるページなので、共通ページとして扱う
  pagePathInfoMap.CLOSE_PAGE,     // TODO: 受験者専用ページだがログインしていない(actor情報を持っていない)状態でも画面遷移できるページなので、共通ページとして扱う
]
/**
 * @const 許可されたページパス情報の連想配列
 */

// 根据角色 返回该角色可以进入的页面 
// 这是一个立即执行函数 
const allowedPageMap: { [actor: number/*Actor*/]: AllowedPage } = (function () {

  // 创建 传入角色 返回许可进入的页面
  const make = (actor: Actor): AllowedPage => {
    // 未ログインの場合に許可されている共通ページ
    // 如果未登录的情况下 允许进入的是page

    // TODO : 引き続きactor専用ページ追加
    if (actor === Actor.TESTER) {
      return {
        firstPage: pagePathInfoMap.ENV_SETTING_PAGE, 
        pageList: [
          pagePathInfoMap.ENV_SETTING_PAGE,
          pagePathInfoMap.IDENTIFICATION_PAGE,
          pagePathInfoMap.AI_IDENTIFICATION_PAGE,
          pagePathInfoMap.EXAMINING_PAGE,
          pagePathInfoMap.EXAM_END_PAGE,
          // pagePathInfoMap.TERMS_PAGE, // TODO: 受験者専用ページだがログインしていない(actor情報を持っていない)状態でも画面遷移できるページなので、共通ページとして扱う
          // pagePathInfoMap.CLOSE_PAGE, // TODO: 受験者専用ページだがログインしていない(actor情報を持っていない)状態でも画面遷移できるページなので、共通ページとして扱う
        ].concat(commonAllowdPageList),
      }
    } else if (actor === Actor.CHECKER) {
      return {
        firstPage: pagePathInfoMap.MONITORING_PAGE,
        pageList: [
          pagePathInfoMap.MONITORING_PAGE,
          pagePathInfoMap.EXAMINEES_DETAIL_PAGE,
        ].concat(commonAllowdPageList),
      }
    } else if (actor === Actor.TEST_MANAGER) {
      return {
        firstPage: pagePathInfoMap.EXAMINEES_PAGE,
        pageList: [
          pagePathInfoMap.EXAMINEES_PAGE,
          pagePathInfoMap.EXAMINEES_DETAIL_PAGE,
        ].concat(commonAllowdPageList),
      }
    } else if (actor === Actor.SYSTEM_MANAGER) {
      return {
        firstPage: pagePathInfoMap.MANAGEMENT_PAGE,
        pageList: [
          pagePathInfoMap.MANAGEMENT_PAGE,
          pagePathInfoMap.EXAMINEES_PAGE,
          pagePathInfoMap.EXAMINEES_DETAIL_PAGE,
          pagePathInfoMap.CHECKERS_MONITORING_PAGE,
          pagePathInfoMap.ACCESS_LIMIT_PAGE,
          pagePathInfoMap.LOGVIEW_PAGE,
          pagePathInfoMap.DELETE_SETTING_PAGE,
          pagePathInfoMap.DELETE_PLAN_PAGE,
          pagePathInfoMap.LOGINS_PAGE,
        ].concat(commonAllowdPageList),
      }
    } else if (actor === Actor.SUPERVISOR) {
      return {
        firstPage: pagePathInfoMap.MANAGEMENT_PAGE,
        pageList: [
          pagePathInfoMap.MANAGEMENT_PAGE,
          pagePathInfoMap.EXAMINEES_PAGE,
          pagePathInfoMap.EXAMINEES_DETAIL_PAGE,
          pagePathInfoMap.CHECKERS_MONITORING_PAGE,
          pagePathInfoMap.ACCESS_LIMIT_PAGE,
          pagePathInfoMap.LOGVIEW_PAGE,
          pagePathInfoMap.DELETE_SETTING_PAGE,
          pagePathInfoMap.DELETE_PLAN_PAGE,
          pagePathInfoMap.LOGINS_PAGE,
        ].concat(commonAllowdPageList),
      }
    }
    throw new Error(`定義されていないアクターが指定されました。(actor=${actor})`);
  }

  // result的类型是一个对象 属性名是权限代号, 值为AllowedPage
  const result: {[actor: number/*Actor*/]: AllowedPage} = {};

  // 获取 权限列表 [1,2,3,4,5] 这种
  ActorUtils.getList()
    .forEach(actor => {

      // 拿到每一个权限代号 根据这个权限代号 返回一个该权限允许登录的页面数组
      result[actor as number] = make(actor);
    })
  return result;
}())


// 这种赋值方式很有趣啊
/*
  const PagePath = 自调用函数的返回值 
    返回值的类型是一个对象 key:string value:string
*/
export const PagePath: {[pageName: string]: string} = (function () {

  // 初始化为空对象
  const result: {[pageName: string]: string} = {};

  // 返回的是 LOGING: "/login" 这样的一个对象
  Object.entries(pagePathInfoMap)
    .forEach(([key, value]) => {
      result[key] = value.path;
    })
  return result;
}())


// 一个关于 路径 的工具类
export class PagePathUtils {
  /**
   * ログイン後のページパスを取得します
   *
   * @param {Actor} actor
   * @return {string}
   */

  // 登录后第一个页面的路径 传入角色
  public static getFirstPagePath(actor: Actor): string {
    const allowedPage = allowedPageMap[actor];
    return allowedPage.firstPage.path;
  }

  /**
   * 指定のパスが許可されたパスか調べます
   *
   * @param {boolean} isLoggedIn
   * @param {Actor | null} actor
   * @param {string} currentPath
   * @return {boolean}
   */
  // 是否是许可的页面路径
  public static isAllowedPage(isLoggedIn: boolean, actor: Actor | null, currentPath: string): boolean {
    if (! isLoggedIn) {
      // 未ログインの場合
      return commonAllowdPageList.some((pagePathInfo: PagePathInfo) => pagePathInfo.match(pagePathInfo, currentPath))
    } else {
      // ログイン済みの場合
      const allowedPage = allowedPageMap[actor as Actor];
      if (! allowedPage) {
        throw new Error(`定義されていないアクターが指定されました。(actor=${actor})`);
      }

      return allowedPage.pageList.some((pagePathInfo: PagePathInfo) => pagePathInfo.match(pagePathInfo, currentPath))
    }
  }

  /**
   * 指定のパスの<body>タグのIDを取得します
   *
   * @param {boolean} isLoggedIn
   * @param {Actor | null} actor
   * @param {string} currentPath
   * @return {boolean}
   */
  public static getBodyId(isLoggedIn: boolean, actor: Actor | null, currentPath: string): string {
    const pagePathInfo = Object.values(pagePathInfoMap).find((pagePathInfo) => pagePathInfo.match(pagePathInfo, currentPath)) as PagePathInfo
    if(pagePathInfo) {
      if (pagePathInfo.bodyId instanceof Function) {
        return (pagePathInfo.bodyId as Function)(pagePathInfo, isLoggedIn, actor)
      } else {
        return pagePathInfo.bodyId
      }
    }
    return ''
  }
}

```

---

> 最后我们看看 guardActorPage 中间件的作用
- 根据路径 前一个path 和 当前的path打印信息
- 查看是否登录了 然后是不是该角色允许登录的页面

```js
/* eslint-disable prettier/prettier */
import { Middleware, Context } from '@nuxt/types';
import * as rootTypes from '@/store/types/rootType';
import * as loginTypes from '@/store/types/loginType';
import StartupAdapter from '@/store/types/adapters/startupAdapter';
import { PagePathUtils } from '@/store/enum/pageTransition';

// 从中间件的名字来看你 应该类似路由守卫的工作
const guardActorPageMiddleware: Middleware = (context: Context) => {
  // 获取从哪个路径过来的
  const prevPath = context.from.path;

  // 获取当前的路径
  const currentPath = context.route.path;


  console.log('[Middleware INFO] page guard : ', context);

  // 如果前一个路径 和 现在的路径相同 或者 不是 开发环境的时候 那么抛出下面的信息
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



### Examinging.vue
- 我们看看这个组件 这个组件就是 参数测试的人 直到 测试开始测试的页面

> html模板部分
```html
<template>
  <div style="width:100%;height:100%;">
    <!-- 「試験レギュレーション」画面 -->
    <!-- 这个应该是规则页面 就是点同意那个 -->
    <template v-if="isPhaseAgreement">
      <AgreementIndex
        :tester-conditions="testerConditions"
        @agree="execExam"
      >
      </AgreementIndex>
    </template>



    <!-- 「MC+試験」画面 -->
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



    <!-- 「外部試験」画面 -->
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
```

- 既然这个组件中有三个页面展示 那么 我们分别看下这3个页面

    | - Examinging.vue
      - AgreementIndex.vue
      - McExaminingIndex.vue
      - OtherExaminingIndex.vue


> AgreementIndex.vue
- Examinging父组件 会向 AgreementIndex 组件传递参数
- 1. :tester-conditions="testerConditions"
- 2. @agree="execExam"


> testerPageAdapter.ts
- 名称: 考试人页面适配器

- 位置:
- TesterConditions 数据是从 @/store/types/adapters/testerPageAdapter 文件中解构出来的

- 引入依赖
```js
import { Matching } from './matchingAdapter';
import { TesterAdapter } from '@/store/types/adapters/testerAdapter';
import { TesterRecordingAdapter } from '@/store/types/adapters/testerRecordingAdapter';
import { TesterState } from '@/store/enum/TesterState';
import { StepbarState } from '@/store/enum/StepbarState';
import { ChatItem } from '@/store/enum/ChatItem';
import { Marking, Record } from '@/store/types/adapters/commonMarkingTimelineAdapter';
import { KVSMaster } from '@/plugins/kvs/master';
import { DeviceState } from '@/store/enum/deviceState';
```

> Matching:
```js

```


> TesterAdapter:
- 感觉这个文件的作用 就是初始化下考试人的信息
```js
/* eslint-disable camelcase */
// 创建一个 考试人 的适配器
export class TesterAdapter {
  // 初始化信息
  constructor(
    //id
    public testerId: number = 0,
    // name
    public examName: string = '',
    // status
    public status: number = 0,
    //loginId
    public loginId: string = '',
    // 已认证的 在...
    public authenticatedAt: string | null = '',
    // 启动时候的参数
    public startupParameters: StartupParameters = new StartupParameters(),
    // 拒绝
    public rejected: number = 0,
    // 考试人们的数组
    public testers: Tester[] = [],
  ) {}
}



// 这是一个考试人的类
class Tester {
  constructor(
    // 考试人的id
    public testerId: number = 0,
    // name
    public examName: string = '',
    // status
    public status: number = 0,
    // loginID
    public loginId: string = '',
    // 启动时候的参数
    public startupParameters: StartupParameters = new StartupParameters(),
  ) {}
}


// 这是启动参数的类
export class StartupParameters {
  constructor(
    // 是不是监考员
    public isProctor: number = 0,
    // memo 是啥
    public memo: string = '',
  ) {}
}


// 这是一个结果的类型
type Result = {
  tester_id: number;
  exam_name: string;
  status: number;
  login_id: string;
  authenticated_at: string | null;
  startup_parameters: {
    is_proctor: number;
    memo: string;
  };
  rejected: number;
  testers: TesterResult[];
};

type TesterResult = {
  tester_id: number;
  exam_name: string;
  status: number;
  login_id: string;
  startup_parameters: {
    is_proctor: number;
  };
};

/** 受験者情報取得処理リクエスト */
// 类型: 考试人请求类型
export type TesterRequestType = {
  tester_id: number;
};

/** 受験者情報取得処理レスポンス */
// 考试人响应类型
export type TesterResponseType = {
  // 処理結果ステータス
  status: number;
  result: Result;
  message: string;
};

/** 受験者情報更新リクエスト */
// 考试人状态请求更新
export type TesterStatusRequestType = {
  tester_id?: number;
  status: number;
};

// 考试人状态响应更新呢
/** 受験者情報更新レスポンス */
export type TesterStatusResponseType = {
  status: number;
  message: string;
};
```

> TesterRecordingAdapter:
- 名称: 考试人的录制适配器
```js
export class TesterRecordingAdapter {
  constructor(
    // 入口的key id
    public accessKeyId: string | null = '',
    // 秘密的 入口 key
    public secretAccessKey: string | null = '',
    // session token
    public sessionToken: string | null = '',
    // 桶
    public bucket: string | null = '',
    public key: string | null = '',
    public uploadId: string | null = '',
    // 间隔
    public interval: number = 0
  ) {}
}

type Result = {
  access_key_id: string;
  secret_access_key: string;
  session_token: string;
  bucket: string;
  key: string;
  upload_id: string;
  interval: number
};

export type TesterRecordingRequestType = {
  method: string;
};

export type TesterRecordingResponseType = {
  status: number;
  result: Result;
  message: string;
};


// 考试人记录恢复适配器
export class TesterRecordingRecoveryAdapter {
  constructor(
  ) {}

  /**
   * @param {TesterRecordingRecoveryResponseType} response
   * @return {TesterRecordingRecoveryAdapter}
   */
  public static fromResponse(response: TesterRecordingRecoveryResponseType): TesterRecordingRecoveryAdapter {
    const r = new TesterRecordingRecoveryAdapter()

    return r
  }
}


export type TesterRecordingRecoveryRequestType = {
  key: string;
};

export type TesterRecordingRecoveryResponseType = {
  status: number;
  message: string;
  result?: any;
};
```


> TesterState.ts
- 这个文件是一个枚举类 里面分别是考试人员的状态信息 分别处于哪一个阶段
```js
export enum TesterState {
  NONE = 0,
  LOGIN = 1,
  // 匹配
  MATCHED = 2,
  // 鉴定识别身份
  IDENTIFICATED = 3,
  // 考试之前
  BEFORE_EXAM = 4,
  // 考试中
  EXAMING = 5,
  // 中断考试
  INTERRUPTION_EXAM = 6,
  // 结束考试
  FINISH_EXAM = 7
}
```


> StepbarState.ts
- 名称:
- 阶段 bar 的状态
```js
export enum StepbarState {
  // 设置环境中
  ENV_SETTING = 1,
  // 同意规则
  TERM_AGREE = 2,
  // 鉴定识别身份
  IDENTIFICATION = 3,
  // 考试之前
  BEFORE_EXAM = 4
}
```


> ChatItem.ts
- 这是一个枚举类
```js
import { MessageObject } from '@/plugins/kvs/type/sendMessageType';

/* eslint-disable prettier/prettier */

// 定义一个枚举类 聊天发送人
export enum ChatItemSender {
  // 监考员
  PROCTOR = 'proctor',
  // 应试人
  EXAMINEE = 'examinee',
}


// 类型
export type ChatItem = {
  // 发送人
  sender: ChatItemSender;
  // 运行时间 经过时间
  elapsedTime: string | null; // [監視者専用] 送信時間等メッセージの負荷情報
  message: string;

  sendAt: Date;   // 送信時間
  sentAt: Date | null; // 送信完了時間
  hasError: boolean;

  // 相关的 信息对象 (key msg 不正画像等)
  relationalMessageObject: MessageObject;
}
```


> MessageObject.ts
- 这个就是上方需要的相关的信息对象
```js
import { Formatter } from '@/utils/Formatter';

// 枚举类
export enum KvsDataType {
  // 命令
  COMMAND = 'command',
  // 信息
  MESSAGE = 'message',
};


export enum KvsCommand {
  // 信息被接受
  MESSAGE_RECEIVED = '<<<MESSAGE_RECEIVED>>>',
  // 登出
  KICK_OUT = '<<<KICK_OUT>>>',
  // 关闭之前
  BEFORE_CLOSE = '<<<BEFORE_CLOSE>>>',
  // 关闭之前ok
  BEFORE_CLOSE_OK = '<<<BEFORE_CLOSE_OK>>>',
  // 识别 身份验证
  IDENTIFICATION_AUTHENTICATING = '<<<AUTHENTICATING>>>',
  // 识别 接受的
  IDENTIFICATION_ACCEPTED = '<<<ACCEPTED>>>',
  // 识别 失败的
  IDENTIFICATION_REJECTED = '<<<REJECTED>>>'
}

// 类型: 数据头部信息 
type DataHeader = {
  dataType: KvsDataType;
};

export type CommandObject = DataHeader & {
  command: KvsCommand;
  data?: string; // 必要ならJSONでも突っ込む？
};


// 定义MessageObject的数据类型
export type MessageObject = DataHeader & {

  // 唯一的key
  uniqueKey: string;      // 
  message: string;        // メッセージ
  url: string | null;     // 不正報告画像 URL (監視者から受験者へ送るとき)
  loginId: string;        // ログインID
  domainName: string;     // プロクタードメイン名
};

/**
 * MessageObjectのuniqueKeyを生成するための関数
 *
 * @param {string} prefix
 * @return {string}
 */
let idCounter: number = 0

// 生成唯一key的函数 需要传入一个前缀 key: 前缀_id_时间
export function getMessageUniqueKey(prefix: string): string {
  const id = ++ idCounter
  const date = Formatter.date('yyyyMMddhhmmss', new Date())

  return `${prefix}_${id}_${date}`
}

```


> Marking, Record.ts
```js
/* eslint-disable camelcase */
export class CommonMarkingTimelineAdapter {
  constructor(
  ) {}
}

// マーキング情報配列構造体
export class Marking {
  constructor(
    public markingAt: string | null = '',
    public url: string | null = '',
    public mark: string | null = '',
    public recordId: number = 0,
  ) {
  }
}
// マーキング情報配列構造体
export class ExtendMarking extends Marking {
  public recordIndex: number = -1;
  public recordUrl: string | null = null;
  public recordTime: number = 0;

  /**
   *
   *
   * @param {Marking} marking
   * @param {number} recordIndex
   * @param {string | null} recordUrl
   * @param {number} recordTime
   * @return {ExtendMarking}
   */
  public static createInstance(
    marking: Marking,
    recordIndex: number,
    recordUrl: string | null,
    recordTime: number
  ): ExtendMarking {
    const r = new ExtendMarking()

    r.markingAt   = marking.markingAt
    r.url         = marking.url
    r.mark        = marking.mark
    r.recordId    = marking.recordId
    r.recordIndex = recordIndex
    r.recordUrl   = recordUrl
    r.recordTime  = recordTime

    return r
  }
}

// レコード情報配列構造体
// 记录
export type Record = {
  id: string;
  startAt: string;
  stopAt: string;
  url: string | null;
  playTimeFrom: string | null;
  playTimeTo: string | null;
}

// 再生情報配列構造体
// 视频播放数据
export type VideoPlayData = {
  url: string;
  startTime: number;
}

```


> DeviceState.ts
```ts
export enum DeviceState {
  /** チェック前 检查前*/
  BEFORE_CHECK = 1,
  /** 許可済 许可*/
  ALLOWED,
  /** ブロック済 拒绝*/
  DENIED,
}
```


> 接下来我们看下 TesterPageAdapter 的内容
- 这个是不是 考试的人 所在的页面
- 参考人员一系列的认证操作吧

```js
export class TesterPageAdapter {

  // 初始化部分
  constructor(
    /*
     * 共通
     */
    // ステップバーステータス
    public stepbarState: StepbarState | null = StepbarState.ENV_SETTING,
    // ネットワークエラー
    // 中断
    public disconnect: boolean = false,
    // 认证失败
    public isAuthError: boolean = false,

    /*
     * 「環境設定」画面
     */
    // 試験利用規約同意
    public isExamTermAgree: boolean = false,
    // 利用規約既読
    public isProcterTermRead: boolean = false,
    // プロクター利用規約同意
    public isProcterTermAgree: boolean = false,
    // カメラ有効
    public enableCamera: DeviceState = DeviceState.BEFORE_CHECK,
    // マイク有効
    public enableMicrophone: DeviceState = DeviceState.BEFORE_CHECK,

    /*
     *「本人認証」画面
     */
    // 本人確認中
    public isIdentifyCheckPending: boolean = false,
    // 本人認証作業完了
    public isIdentityCheckFinished: boolean = false,
    // 本人認証失敗
    public isIdentifyCheckNG: boolean = false,
    // チャットアイテム一覧
    public chatItems: ChatItem[] = [],

    /*
     *「試験」&「試験終了」画面
     */
    //  受験システム(MC+ or 外部試験)にログイン済みか
    public isLoggedInTestSystem: boolean = false,
    // 受験者ステータス
    public testerState: TesterState | null = TesterState.LOGIN,
    // テスターステータス等
    public testerAdapter: TesterAdapter | null = null,
    // 録画ステータス等
    public testerRecordingAdapter: TesterRecordingAdapter | null = null,
    // マーキング情報
    public markingTotalScore: number = 0,
    public markings: Marking[] = [],
    public records: Record[] = [],

    /*
     *「AI本人認証」画面
     */
    public identityImage: string = '',
    public idImage: string = '',
    public countRetryNum: number = 0,
    public fixedStrAiIdentifyList: { str: string; check: boolean }[] = [],
    public noticeAiDisplay: { selectedStr: string; noticeType: number; retry?: number, limite?: number, failStr?: string } = {
      retry: undefined,
      limite: undefined,
      failStr: undefined,
      noticeType: 1,
      selectedStr: '',
    }
  ) {}
}

export type TesterConditions = {
  // 是否中断
  isDisconnect: boolean;
  // 試験状況
  isBeforeExam: boolean;
  isExaming: boolean;
  isInterruptionExam: boolean;
  isFinishExam: boolean;
  // 録画状況
  isBeforeRecording: boolean;
  isRecording: boolean;
  isAfterRecording: boolean;
}

```

- TesterPageAdapter 这个文件是被导入到 Examining.vue 中使用的 在 计算属性中 整理了一个 testerConditions 对象
- 将这个对象传递到了 子组件中

- 该对象上身上有:
```js
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
```


> AgreementIndex.vue
```vue
<template>
  <div>
    <div v-if="testerConditions.isDisconnect" class="alert alert-warning header-alert-fix">
      {{ displayLang.IDENTIFICATION_DISCONNECT_NETWORK }}
    </div>

    <div class="main">
      <div class="container">
        <div class="mt-5 mb-5">
          <div class="card">
            <div>
              <div class="card-header text-center header-notes">
                <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                {{ displayLang.EXAMINING_TERM }}
              </div>
              <div class="card-body">
                <p class="exp-text">
                  {{ displayLang.EXAMINING_TERM_EXP_TEXT }}
                </p>
                <div class="card mb-3">
                  <div ref="scroll" class="card-body terms-text white-space:pre-wrap; word-wrap:break-word;" @scroll="onScroll">
                    <div>
                      {{  displayLang.EXAMINING_TERM_NOTE_HEADER }}
                    </div>
                    <div
                      v-for="(note, index) of displayLang.EXAMINING_TERM_NOTES.split('\n').filter(v => v.trim().length > 0)"
                      :key="index"
                    >
                      ・{{ note }}
                    </div>
                  </div>
                </div>

                <div
                  v-if="!testerConditions.isExaming"
                  class="custom-control custom-checkbox terms-check mb-4"
                >
                  <input
                    id="termscheck"
                    value="testerPage.isExamTermAgree"
                    type="checkbox"
                    class="custom-control-input"
                    :disabled="!termRead"
                    @change="onChangeAgree"
                  />
                  <label class="custom-control-label" for="termscheck">{{
                    displayLang.EXAMINING_TERM_AGREE
                  }}</label>
                </div>
              </div>
            </div>

            <div class="card-footer text-center">
              <button
                v-if="testerConditions.isBeforeExam"
                type="button"
                class="btn btn-primary"
                :disabled="!testerPage.isExamTermAgree"
                @click.once="$emit('agree')"
              >
                {{ displayLang.EXAMINING_LOGIN_TEST_SYSTEM }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { LanguageEnum } from '@/store/enum/language';
import { TesterConditions } from '@/store/types/adapters/testerPageAdapter';
import * as rootTypes from '@/store/types/rootType';
import * as testerPageTypes from '@/store/types/testerPageType';
import { TesterPageAdapter } from '@/store/types/adapters/testerPageAdapter';

export default Vue.extend({
  name: 'AgreementIndex',
  components: {
  },
  props: {
    testerConditions: {
      type: Object as PropType<TesterConditions>,
      required: true,
    },
  },
  data() {
    return {
      termRead: false as boolean,
    } as any
  },
  computed: {
    displayLang(): LanguageEnum {
      return this.$store.getters[rootTypes.GETTER_DISPLAY_LANG];
    },

    // 
    testerPage(): TesterPageAdapter {
      return this.$store.getters[testerPageTypes.GETTER_TESTER_PAGE];
    },
  },
  mounted() {
    this.onScroll();
  },
  methods: {
    /**
     * 「受験利用規約同意」のスクロールポジション監視のイベントハンドラ
     */
    onScroll() {
      const target = this.$refs['scroll'] as HTMLDivElement;
      if (target) {
        if (Math.ceil(target.scrollTop) >= (target.scrollHeight - target.clientHeight) && !this.termRead) {
          this.termRead = true;
        }
      }
    },
    /**
     * 「同意」チェックボックスのイベントハンドラ
     */
    onChangeAgree(event: Event) {
      const target = event.currentTarget as HTMLInputElement;
      if (target) {
        this.$store.dispatch(testerPageTypes.ACTION_TESTER_PAGE_EXAM_TERM_AGREE, target.checked)
      }
    },
  },
});
</script>

```

