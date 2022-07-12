### testerPageStore

> actions

> testerPageTypes.ACTION_TESTER_PAGE_GET_TESTER
- testerPage/ACTION_TESTER_PAGE_GET_TESTER
- 所以这个是提交到 testerPageStore 里面 action 里面的逻辑

- 1. 返回值是一个 Promise<number>
```js
// 取得考试人员情报的 处理
[testerPageTypes.ACTION_TESTER_PAGE_GET_TESTER](context): Promise<number> {

  // 没有直接commit 而是继续分发到 另一个store testerTypes.ACTION_TESTER
  return new Promise((resolve, reject) => {
    context
      .dispatch(testerTypes.ACTION_TESTER)
      .then((testerAdapter: TesterAdapter) => {
        context.commit(testerPageTypes.MUTATION_TESTER_PAGE_SET_TESTER, testerAdapter)
        resolve(testerAdapter.status)
      })
      .catch((e: any) => {
        if (
          ErrorAdapter.isErrorState(e)
          && (e.status == 401)
        ) {
          // 認証エラー
          context.commit(testerPageTypes.MUTATION_TESTER_PAGE_SET_AUTH_ERROR, true)
        }
        reject(e)
      })
  });
},
```


> testerTypes.ACTION_TESTER
- tester/ACTION_TESTER
- 这是提交到 testerStore 里面的逻辑
```js
// 这是 actions 选项
const actions: ActionTree<TesterState, TesterState> = {

  // 这个action的动作 返回值是一个 promise 
  // 参数: context, 传递过来的testId
  [types.ACTION_TESTER](context, testerId: number | null = null): Promise<TesterAdapter> {

    console.log('[LOG INFO] tester data : ', testerId);
    // context.commit(types.MUTATION_TESTER, new TesterAdapter(testerId));

    // promise
    return new Promise((resolve, reject) => {

      // params 看看 testerId 是否为空 如果是 则 params 为 {} 如果有 testerId 则整理成这样的对象 {tester_id: testerId}
      const params = (testerId === null) ? {} : {params: {tester_id: testerId}}

      // 然后开始发起请求
      this.$axios
        // get请求 参数
        .$get(Endpoint.TESTER.url, params)

        // TesterResponseType类型就是定义了 返回的数据的类型 有几个都啥类型等
        .then((response: TesterResponseType) => {

          // 如果 错误码 为 200 
          if (response.status === 200) {

            // 
            const startup_parameters = response.result.startup_parameters ? response.result.startup_parameters : {} as any;
            
            // 「空白」をJSで使用可能に処理する。
            // "双引号为%22 '单引号为%27 "" ''
            let memo = encodeURIComponent(startup_parameters.memo);
            memo === '%22%22' || memo === '%27%27' ? memo = '' : memo = decodeURIComponent(memo);

            context.commit(types.MUTATION_TESTER, {
              testerId: response.result.tester_id,
              examName: response.result.exam_name,
              status: response.result.status,
              loginId: response.result.login_id,
              authenticatedAt: response.result.authenticated_at,
              startupParameters: {
                isProctor: startup_parameters.is_proctor * 1,
                memo,
              },
              rejected: response.result.rejected,
              testers: response.result.testers ? response.result.testers.map(tester => ({
                testerId: tester.tester_id,
                examName: tester.exam_name,
                status: tester.status,
                loginId: tester.login_id,
                startupParameters: {
                  isProctor: (tester.startup_parameters ? tester.startup_parameters : {} as any).is_proctor,
                },
              })) : [],
            });
            resolve(context.getters[types.GETTER_TESTER]);
          } else {
            const err: ErrorStatus = {
              endpoint: Endpoint.TESTER,
              status: response.status,
              message: response.message
            };
            context.dispatch(errTypes.ACTION_SET_ERROR, err);


            // 認証エラーまたは二重ログインの場合はログをサーバーに保存
            if (response.status == 401 || response.status == 405) {
              const startup: StartupAdapter = context.getters[rootTypes.GETTER_STARTUP];
              if (startup.isDebug != null) {
                const exLoginId = context.getters[loginTypes.GETTER_LOGIN].loginId
                const token = context.getters[loginTypes.GETTER_GET_ACCESS_TOKEN]
                const data = {
                  error_reason: 'auth_error',
                  ex_login_id: exLoginId,
                  token: token,
                  response: response,
                }
                const detail:string = JSON.stringify(data).slice(0, LogReceiveAdapter.DETAILS_MAX_LENGTH) || 'detail is empty!!';
                context.dispatch(logReceiveTypes.ACTION_POST_LOG_RECEIVE, {
                  type: LogReceiveAdapter.LogReceiveType.ERROR,
                  path: Endpoint.TESTER.url,
                  module: 'front-api',
                  location: 'out/error:auth_error',
                  details: detail,
                  timestamp: Formatter.date('yyyy-MM-dd hh:mm:ss', new Date()),
                } as LogReceiveAdapter.LogReceiveRequestType);
              }
              /// / 二重ログインの場合はログアウト
              if (response.status == 405) {
                context.dispatch(testerPageTypes.ACTION_TESTER_PAGE_LOGOUT);
              }
            }

            reject(err);
          }
        })
        .catch((e: any) => {
          console.error('[Tester error] : ', e);

          // ネットワークエラーの場合はログをサーバーに保存
          if (e.message == 'Network Error') {
            const startup: StartupAdapter = context.getters[rootTypes.GETTER_STARTUP];
            if (startup.isDebug != null) {
              const exLoginId = context.getters[loginTypes.GETTER_LOGIN].loginId
              const token = context.getters[loginTypes.GETTER_GET_ACCESS_TOKEN]
              const data = {
                error_reason: 'network_error',
                ex_login_id: exLoginId,
                token: token,
                response: { ...e },
              }
              const detail:string = JSON.stringify(data).slice(0, LogReceiveAdapter.DETAILS_MAX_LENGTH) || 'detail is empty!!';
              context.dispatch(logReceiveTypes.ACTION_POST_LOG_RECEIVE, {
                type: LogReceiveAdapter.LogReceiveType.ERROR,
                path: Endpoint.TESTER.url,
                module: 'front-api',
                location: 'out/error:network_error',
                details: detail,
                timestamp: Formatter.date('yyyy-MM-dd hh:mm:ss', new Date()),
              } as LogReceiveAdapter.LogReceiveRequestType);
            }
          }

          reject(e);
        });
    });
  },
}
```