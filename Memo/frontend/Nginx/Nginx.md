                      请求路径为 / 代理到8000端口
                  ↗
请求  ---  8080服务器
                  ↘   请求路径为  /api 代理到3000端口


- localhost:8080/index.html, 代理到localhost:8000/index.html
- localhost:8080/api/login, 代理到localhost:3000/api/login

- 8080是一个台服务器 我们请求都发往8080这台服务器 然后内部由8080转发到 8000 或者 3000
- 比如我们要访问index就由代理服务器转发到前端服务器

- 也就是说我们不管请求前端页面 还是请求后台的接口都是通过 8080服务器进行转发
- 这样前端和后台通讯都在8080端口就不会产生跨域问题

- 1. 前端请求只写相对路径 .get("/login") 这样它就会往当前服务器所在的地址发请求
- 2. 下载Nginx服务器
- 3. 配置Nginx服务器
<!-- 
  serever {
    linsten       8080;     // 要修改
    server_name   localhost;

    location / {
      proxy_pass http://localhost:8000;
    }
    location /api {
      proxy_pass http://localhost:3000;
    }
  }
 -->

- 4. 启动nginx
- nginx

