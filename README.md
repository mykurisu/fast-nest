[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=mykurisu)](https://github.com/mykurisu/fast-nest)

#   Fast-Nest

帮助你快速初始化基于Nest.js的node后端服务

>   本项目适用：
>   -   node简易应用初始化
>   -   node项目初学试验
>   -   有兴趣的童鞋亦可作为项目脚手架(项目内都是基础功能与结构，是可以作为简单的脚手架的)

##  食用前

-   希望使用者有JavaScript基础，熟悉typescript更佳。
-   希望有简单node应用开发基础(可选)
-   希望能先了解Nest.js框架([传送门](https://github.com/nestjs/nest))

##  如何启动项目


```bash
git clone https://github.com/mykurisu/fast-nest.git

cd fase-nest

npm install

npm start
```

如代码所示，将本项目克隆至本地，安装好依赖即可启动服务，默认端口为**8000**，若需要调整请在根目录的**config.ts**中进行调整。

项目启动后，如果没有启动本地的MongoDB会出现超时的报错，这时有三种方案：

①   将**common.module**中的mongo公共服务挂载删除

②   本地启动MongoDB，连接数据库的配置亦在**config.ts**内

③   连接远端的MongoDB，配置也在**config.ts**内填写

**温馨提示：数据库地址不宜暴露在GIT项目中，建议数据库配置写在settings.json中，部署时再自行创建配置文件。**

##  项目内容

-   [x] 小而全的Node项目目录结构
-   [x] 按照核心、功能以及公共三个维度进行模块划分
-   [x] 内置格式化返回数据的拦截器
-   [x] 内置格式化返回错误信息的过滤器
-   [x] 内置符合容器规范的日志中间件
-   [x] 内置MongoDB初始化服务
-   [x] 内置服务接口文档生成功能
-   [x] 内置模块创建脚本
-   [x] 内置文件上传模块
-   [x] 内置缓存模块
-   [x] 打包发布，兼容node容器发布模式

##  项目指令

`npm start` 启动项目

`npm run build` 打包项目输出js到build文件夹

`npm run deploy` 打包项目输出js并直接运行

`npm run deploy:pm2` 通过pm2将项目运行，具体配置可以在 pm2.json 中进行更改

`npm run doc` 一键输出服务内的所有模块与接口信息

`npm run create ${ModuleName}` 一键新建模块

##  有关项目的开发实录

-   [Fast-Nest项目简介](https://juejin.im/post/5dda8ea96fb9a07a7f355f43)

##  最后

如果对大家有帮助，不妨为我点个star。该项目会长期维护，争取成为真正的应用脚手架。
