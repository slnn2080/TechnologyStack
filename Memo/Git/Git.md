### 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


### SSH
Your identification has been saved in sam.
Your public key has been saved in sam.pub.
<!-- 
    公钥
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC+79/8av2+MVY+QuZOWKBt0b6SzrCm8meMU0TZNkTH7FFNy6XKcVrtZjehHsCkpMaZn6CcuvsmKKprv4zuFzDqqN2+damBCrnqpNwrwzblHQFYMIxWegt7MLGOgyOlzNvWyZICH6wVUmu18RGbIP4x072lCFdGb5sdNv9C8CFf8W89UR34nJgT+7d9aJh5/X5pBa1wG0rsvakyZr/oIFO0pq0pzkiL36bEYwRe3kQjSoYhcVwYlZ18K11b2eU9NnF3OV5Hi/jGB0y+CAFTkzI0iHX2tFMYqDW/bBzjtUnaQw0kk5IqjIIQaiq0h8tKFPAtaTDUgWud+5UbgXe0pzTF love.nn.linlin@gmail.com
 -->


### SVN
- 是一种集中式的状态管理 要想用SVN要求所有人有一台电脑作为中央服务器 当这台电脑处于开机的状态的时候 我们才能在上面拿到代码


### Git
- 每一个人的电脑上都有一个仓库，我们的仓库可以和别的仓库进行沟通
- 本质上是一个数据库


### Git的概念
> 区域
- 工作区
<!-- 
    本地代码 项目下的文件
    我们在工作区中生成文件 修改文件都是在这里做的 这也就沙箱环境 这个环境下
    删改都可以
 -->

- 暂存区
<!-- 
    暂时放在这里 新增一个文件 删除一个文件 统一一次修改提交
 -->

- 版本库
<!-- 
    到这里才算是一个版本
 -->


> 对象
- git对象
- 树对象
- 提交对象



- wq                退出
- git ls-files -s   看看暂存区里面的文件
- git status        确认当前文件是什么状态
- git credential-manager uninstall
- git config --global --remove-section credential


### 利用ssh 托管项目

### 创建ssh 公钥
- cd ~
- ssh-keygen -t rsa -C "你的邮箱地址"
- 然后在ssh文件夹里面复制公钥到github 复制 .pub 文件


### 添加ssh到管理器
- ssh-add -l
- ssh-add /Users/liulin/.ssh/erin


### 看看有没有配置成功
- ssh -T git@github.com



### 困扰了我3小时的问题
- 我使用git push到远程仓库 但是总是提示 认证失败
- 查找了一下原因说之前电脑配置了边用户名 然后又修改过 导致两次的用户名不一样

- 我们需要删除credential 下面的命令是看有没有 credential
- git config credential.helper

- 然后下面的命令是看在哪里 找到 删除掉
- git config --show-origin --get credential.helper



### 我在使用push上传到git服务器器的一系列问题
- 这次我选择的是使用ssh 但是发现即使更换了ssh之后 仍然不能推送的github上
- 提示没有公钥的权限
- 查询了一下 发现是我们创建的公钥并没有放在苹果的管理器 所以又用上面的命令 将创建的公钥放在了苹果的管理器上 然后再push就好用了




### Git交互
- 我们的代码可以分为两种一种是本地的代码，一种是托管在github上远程的代码

- 1. 我们在github上新建一个仓库 我们新建的仓库是空的 要把我们的代码推送到仓库才会有内容
<!-- 
  新建仓库后 页面会有一堆好像要配置的东西先不用管
 -->

- 2. 进入我们的项目文件夹 进入终端 输入命令 完成操作
<!-- 
  git init    // 将普通的文件夹变成git的仓库
      绿色：代码在工作区  我们需要将这些代码由工作区 推到 暂存区 再从暂存区 推到 版本区(仓库区)

  git add .   // 将处在工作区的文件推送到 暂存区
      黄色

  git commit -m '提交的信息'    // 将文件由 暂存区 推到 版本区(仓库区)
      无颜色

  git remote add origin https://github.com/slnn2080/git_test.git
              // 将本地仓库 和 远程仓库进行关联
  
  git push origin master -u      
              // 推送到远程仓库 push推送 origin远程 master哪个分支 第一次加-u
 -->


> 用于初始化用户信息
git config --global user.name 'slnn2080'
git config --global user.email 'love.nn.linlin@gmail.com'

git config user.name 'slnn2080'
git config user.email 'love.nn.linlin@gmail.com'

git config --global --replace-all user.email 'love.nn.linlin@gmail.com'


> 将你本地的仓库和github仓库进行关联
git remote add origin https://github.com/slnn2080/git_test.git


> 推送到远程仓库
git push -u origin master
git push origin master
- 第一次推送master分支时，加上了 –u参数
- Git会将本地的master分支内容推送的远程新的master分支，还会把2个master分支关联起来，在以后的推送或者拉取时就可以简化操作


> 检查当前文件状态
git status


> 下载文档
git clone url


> 文件说明：
.gitignore 哪些东西不想接受版本的控制 比如node_modules


> 拉取
> 第一次从远程仓库克隆下来的项目 使用git clone url 但是接下来 我们使用拉取就可以了
> git pull origin master
- 拉取远程的master分支


> 我设置了一个7天的token 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 

---------------------------

### Git

> 为什么要使用Git
> 1. 从个人的角度来说 
- 我们开发一个项目 不可能一路绿灯到底 如果我们可以将整个项目 进入存档操作 那么是不是可以利用存档 读档来回退到项目的一个合适的阶段


> 2. 从团队的角度
- 我们可能很多人开发一个项目 也有可能多人负责同一个功能
- 那就有可能 小王在这个功能上写了很多的逻辑 小刘也在这个功能上写了很多的逻辑
- 当上传文件的时候就会造成冲突


> git的特点
- 1. 协同修改
    多人并行的修改服务器端的同一个文件

- 2. 数据备份
    不仅保存目录和文件的当前状态 还能够保存每一个提交过的历史状态


> 版本管理
- 在保存每一个版本的文件信息的时候要做到不保存重复数据 以节约存储空间 提高运行效率 这方面svn采用的是增量式管理的方式 而git采取了文件系统快照的方式


> 权限控制
- 对团队中参与开发的人员进行权限控制
- 对团队开发者贡献的代码进行审核 --- git独有


> 历史记录
- 查看修改人 修改时间 修改内容 日志信息
- 将本地文件恢复到某一个历史状态


> 分支管理
- 允许开发团队在工作过程中多条生产线同时推进任务 进一步提高效率


> Git的结构
<!-- 
    
    本地库          实实在在存储每一个历史版本 这些是我们每次提交的


    暂存区          临时存储 打算提交还没提交 可以提交到本地库 也 可以撤销


    工作区          写代码的地方 平时修改等工作
 -->

- 比如 我们新建了一个文件 需要使用
    git add

    将文件添加到暂存区 然后我们使用
    git commit

        将暂存区的文件提交到本地库


> git和github gitlab 代码托管中心
- github就是代码托管中心 git还有其他的托管中心 
    - 比如在局域网的环境下 我们可以搭建 gitlab服务器 作为代码托管中心
    - 比如在外网环境下 我们有github和码云作为代码的托管中心


> 代码托管中心的用处
- 帮我们维护远程库


> 本地库 和 远程库
> 团队内部协作
<!-- 
                远程库

        ↗ push        ↓ clone

    本地库          本地库
 -->

- 用户A 刚创建的远程库是空的 我们的历史记录 和 代码都在本地库 我们要使用
    push
    把本地库的内容推送到远程库


- 用户B 需要将远程库中的内容 克隆下来 需要使用
    clone
    clone这个操作不光是下载远程库的东西 还会把本地库初始化好

- 然后用户B 也需要在自己的本地库的基础上进行修改 改完之后他需要提交到本地库再推送到远程库

- 但是用户B直接推送是推送不了的 因为这个库是用户A创建的 用户B不能直接往里面写东西
- 用户B需要加入团队 也就是 用户A邀请用户B加入团队 加入团队后就有这样的推送权限了
- 用户B将代码使用命令 push推动到远程库


- 用户A 需要使用命令 将用户A推送到远程库里面的代码 拉取到用户A的本地库
    pull

- 这就是一个协同开发的效果


> 跨团队协作
- 当有一个功能比如用户B实现不了 需要找用户C来帮忙，但是用户C并不是用户AB团队内部的成员所以没有办法进行相关的操作

- 比如 代码中心里面有 用户A创建好的远程库
- 用户C使用 下面的命令将用户A的远程库里面的内容复制一份到自己的远程库
    fork

- 然后用户C 将自己远程库里的代码 进行clone 然后再进行修改 再推送到自己的远程库
    clone


- 然后用户C需要发起 拉取请求
    pull request

- 然后用户A对里面的内容进行审核 审核如果没有问题 那么他就可以在线做一下合并操作 合并到用户A的远程库里面 这样用户A的远程库里面就会有用户C做的修改了
    merge

---------------------------

### git命令行操作

### 本地库操作
> 本地库的初始化
> git init

- 作用：
- .git文件夹中 存放的是本地库相关的子目录和文件 不要删除 也不要乱修改
- 这个文件夹里面的东西乱点的话 本地库就不能正常工作了


> 设置签名
- git要求我们要设置签名 用于标识开发人员的身份 比如大家都提交 怎么区分谁是谁

    用户名：
    Email：

- 注意： 这里设置的签名(用户名和密码) 和 代码托管中心中的用户名和密码完全没有关系 这里只是用来辨识提交修改等操作 是谁完成的


> 设置签名的命令
- 签名分为两个级别
- 那哪个签名会生效？ 就近原则 谁近谁生效 项目级别优先于系统用户级别 二者都有的时候采用项目级别

- 1. 项目级别
- 仅在当前本地库或者当前项目内有效
- 项目级别 签名的信息 会存放在 .git/config 文件里面 注意该文件是隐藏的
<!-- 
    cat .git/config
 -->


- 2. 系统用户级别
- 登录当前电脑系统的用户 只要是这个用户 签名就对这个用户有效
- 系统用户 签名的信息 会存放在用户根目录下的 .gitconfig 文件里面 该文件隐藏
<!-- 
    cd ~
    pwd
    cat .gitconfig
 -->


> 修改 / 设置 系统级别 签名
> git config --global
- 示例：
- 设置 用户名 ： git config --global user.name slnn2080
- 设置 邮箱名 ： git config --global user.email love.nn.linlin...

> 修改 / 设置 用户级别 签名
> git config 
- 示例：
- 设置 用户名 ： git config user.name slnn2080
- 设置 邮箱名 ： git config user.email love.nn.linlin...

---------------------------

### 添加提交 以及 查看状态操作

> git status
- 作用：
- 查看工作区 和 暂存区的状态
<!-- 
    // 一个空的文件夹 我们输入 git status 后显示的状态

    On branch master        // 当前在master分支上
    No commits yet          // 本地库里面没有东西任何提交

    nothing to commit       // 暂存区内没有任何可提交的
    (create/copy files and use "git add" to track)  
                            // 你可以复制 或 创建文件 使用 git add 来追踪这些文件 就是让git去管这个文件



    // 当我们在本地创建一个文件之后
    On branch master
    No commits yet

    Untracked files:
    (use "git add <file>..." to include in what will be committed)
        // 可以使用git add luck.txt 提交到暂存区

    luck.txt                // 红色的 发现了一个没有追踪的文件 

    nothing added to commit but untracked files present (use "git add" to track)
        // 你没有将文件放到暂存区 但是存在未追踪的文件
 -->


> git add 指定文件名 或者 .
- 将文件送到暂存区
<!-- 
    // 我们执行完 git add后 会显示
    On branch master
    No commits yet

    Changes to be committed:
        // 下面有文件可以提交到本地库

    (use "git rm --cached <file>..." to unstage)
    new file:   luck.txt        // 绿色
 -->    


> git rm --cached 文件名 或者 .
- 撤销提交到暂存区的指定文件或者所有文件
- 只是删除暂存区中的文件 不是真的把工作区的文件删掉了


> git checkout --文件名
- 可以撤销或取消这次修改
<!--    
    我们将文件进行修改后 使用 git status 查看文件状态出现的提示
    意思是我们可以通过该命令撤销刚才对文件的修改
 -->


> git reset HEAD 文件名
<!-- 
    我们将修改的文件使用git add推送到了暂存区
    可以使用该命令 变成没用放在暂存区里面的操作
 -->


> git commit 指定文件名
- 当我们使用这个命令的时候 下一个界面就是让我们输入 对提交文件进行描述的信息
- 这个描述信息相当于 代码里面的注释 这里的话就是记录下本次提交是干了什么事
<!-- 
    会弹出vim编辑器窗口
    我们直接输入
    :set nu     // 显示行号

    输入 i 进如编辑模式  然后找一行添加描述
    输入 esc :wq 写入退出


    [master (root-commit) a2844d7] 这是第一次 根提交
    1 file changed, 1 insertion(+)
    create mode 100644 luck.txt

    On branch master    // 现在是 master分支
    nothing to commit, working tree clean
                        // 工作区没有修改和新建 暂存区也是干净的
 -->


> git commit -m '对提交的文件进行这次提交的描述' 指定文件名
> git commit -m '对提交的文件进行这次提交的描述'
- 从暂存区提交到本地库

> 提交到指定分支上
> git commit -m '描述' 分支名

---------------------------

### 查看历史记录的命令
- 要控制版本的前进和后退 我们要使用 git log查看历史记录

> git log 
- 查看本地库的修改的版本的历史记录

>>> (HEAD -> master)
- 它是当前版本的指针 我们对版本进行读档操作的时候 就是移动这个 HEAD
- 表示：当前在哪一个版本上
<!-- 
    commit 07790997bf7ff5f05b0326917d53d70963f3a074
    // 以上面一长串的数字做为索引 进行的提交 这串数字是一串哈希值

     (HEAD -> master)
        // HEAD 是一个指针 指向当前的版本 我们做前进和后退的时候就是移动这个HEAD的指针

    Author: slnn2080 <nn@gmail.com>
    Date:   Sun Sep 5 23:03:45 2021 +0900
    这是第二次提交


    commit a2844d7b243dba6b5a2cf9da70cacf9cdc18fe38
    Author: slnn2080 <nn@gmail.com>
    Date:   Sun Sep 5 22:54:45 2021 +0900
    这是第一次提交
 -->

- 查看历史记录还可以更加的简洁一点点


> git log --pretty=oneline
- 一个版本使用一行显示 来显示所有的版本列表


> git log --oneline
- 哈希值只显示一部分的版本列表
- 只显示当前指针后面的信息 指针前面的信息不会显示哈
<!-- 
    0779099 (HEAD -> master) 这是第二次提交
    a2844d7 这是第一次提交
 -->


> git reflog
- 便于观察我们移动到其它版本需要几步 HEAD指针需要移动的步数
- 当前指针前后的版本都会被展示

- 观察这个部分：
    HEAD@{0}  ---  HEAD@{1}

- 移动到这个版本需要一步操作
<!-- 
    0779099 (HEAD -> master) HEAD@{0}: commit: 这是第二次提交
    a2844d7 HEAD@{1}: commit (initial): 这是第一次提交
 -->

---------------------------

### 前进后退历史版本操作的本质
- git在帮我们管理历史版本的时候 它有一个指针 指针的名字就叫 HEAD
- 我们可以基于 HEAD 这个指针 在众多版本之间 移动 历史记录和回退和前进


- 控制 版本前进 后退 有3中方式
- 1. 基于索引值操作     推荐
- 2. 使用^符号   只能回退
- 3. 使用~符号   只能回退 但是能指定回退步数


- 比如 我们现在有下面的三个版本
<!-- 
    1ac3862 (HEAD -> master) HEAD@{0}: commit: 这是第三次提交
    0779099 HEAD@{1}: commit: 这是第二次提交
    a2844d7 HEAD@{2}: commit (initial): 这是第一次提交
 -->


> git reset --hard 带上类似哈希值的部分
- 根据哈希值回退或前进到指定版本 内容也会变成上一个版本的内容
<!-- 
    git reset --hard 0779099
    0779099 (HEAD -> master) HEAD@{0}: reset: moving to 0779099

    1ac3862 HEAD@{1}: commit: 这是第三次提交
    0779099 (HEAD -> master) HEAD@{2}: commit: 这是第二次提交
    a2844d7 HEAD@{3}: commit (initial): 这是第一次提交
 -->


> git reset --hard HEAD
- 回到最新的版本位置


> git reset --hard HEAD^
- 回退一次版本
- git reset --hard HEAD^^^ 回退三次


> git reset --hard HEAD~指定步数
- 回退一次版本
- git reset --hard HEAD~3 回退三次


### git reset 后面接的参数 --hard / --soft / mixed 对比
> git reset --hard
- 暂存区和工作区都会被重置掉 同时在本地库移动HEAD指针

> git reset --soft
- 只在本地库移动HEAD指针
<!-- 
    原来的状态                现在的状态
    本地库  暂存区  工作区            暂存区  工作区
                            本地库

                            使用sort本地库回退了一个版本
                            因为和暂存区的版本不一致了 所以内容也不一致
 -->

> git reset --mixed
- 在本地库移动HEAD指针 也会重置暂存区
<!-- 
    原来的状态                现在的状态
    本地库  暂存区  工作区                   工作区
                            本地库  暂存区

                            使用mixed本地库和暂存区回退了一个版本
                            工作区的内容没变 会显示工作区内容需要git add
 -->

---------------------------

### 永久删除文件后找回
- 这里我们主要指将文件提交到本地库后 删除它怎么办？
- 思路
- 通过git管理的项目 每一次提交的版本都会版本记录 只要我们提交 它会把每一次提交都保存下来 方便我们前进或者回退

- 这样的话 我们就可以通过这个特点来找回删除的文件
<!-- 
    比如我们把一个文件从工作区提交到了本地库
    然后我们在电脑了把文件删除了 也就是说 工作区没有文件了

    在删除的状态下 我们使用 git status也能观察到 delete aaa.txt 也是需要你提交的

    也就是说 即使你删除了文件 就这个动作而言 你也是需要add commit的
    然后在git里面又会形成一个新的版本

    然后我们再通过回退到删除文件前的版本就可以取回删除前的文件
 -->

- 基于上面这点 我们在已经提交完一次之后 删除了文件 接下来我们可以这样操作
- git add . 
- git commit -m '刚才删除了文件提交这次删除文件的操作 想要回退到删除前版本'
- git reflog
- git reset --hard 删除文件前版本的哈希值

---------------------------

### 添加到暂存区的删除文件找回
- 刚才我们研究了一下 已经添加到本地库的文件 然后本地进行了删除后 怎么找回
- 也就是说 新建了一个文件add后rm 没有commit的情况下 怎么操作
- 也是一样 我们需要将删除的步骤保存到


> git reset --hard HEAD
- 我们使用这条命令回退到创建文件的时候的版本 来找回删除的文件


> 总结：
- 删除文件并找回的前提：
- 删除前 文件存在时的状态提交到了本地库

- 操作方式 git reset --hard 指针位置
    删除操作已经提交到本地库： 指针位置指向历史记录
    删除操作尚未提交到本地库： 指针位置使用HEAD

---------------------------

### 比较文件
- 说下场景 我们创建了两个文件 都将这两个文件提交至了本地库
- 然后修改了其中的一个文件 并没有将这个操作提交到暂存区之前 我们可以使用 git diff 命令来看下这次的修改 和 指定版本有什么地方不一样

> git diff 指定文件
- 将工作区中的文字和暂存区的文件进行比较
<!-- 
    修改文件后 尚未提交到暂存区前(尚未git add前) 使用该命令
    直接使用后面没有任何参数的情况下 是跟暂存区里面的版本进行比较
 -->

<!-- 
    diff --git a/test.txt b/test.txt
    index b5b9ef6..dba919f 100644

    --- a/test.txt
    +++ b/test.txt

    @@ -1 +1,2 @@

    abcdefg
    +hijklmn
 -->

- 如果我们将此次修改提交到了暂存区(git add后) 再进行比较的话 使用git diff命令会发现没有任何区别


> git diff HEAD/hash值 目标文件
- 将工作区中的文件和本地库历史记录比较

- HEAD ： 表示最新
- hash ： 表示指定版本

- 使用HEAD指针 指向本地库的一个历史记录 就是在跟本地库里面的做对比 看看两次的文件哪里有不同

**注意：**
- 不带文件名比较多个文件

> git diff HEAD^ 目标文件
- 和某一个历史版本进行比较

---------------------------

### 什么是分支
- 在版本控制过程中， 使用多条线同时推进多个任务 叫做分支
<!-- 
    版本库初始化后 本身就会有一个master这个分支
    比如我们现在想开发一些新的功能 我们不想在master主干上进行开发 因为不想对master分支造成影响

    这时候我们就可以开辟一个新的分支 分支命名的时候喜欢以 feature 开头
    feature 是功能的意思

    创建新的分支是从主干分支复制出来的 也就是说刚创建分支的时候 主干和分支的内容都是一致的

    master      ○

    feature/blue    ○   →   ○
    feature/game    ○   →   ○   →   ○

    我们可以看到 这些分支在往前开发的时候是彼此独立的 也就是说我们在没有做合并的动作之前 是不会有影响的

    比如 有一个分支开发失败了 这个功能和我们的需求不符 那么我只需要将这个分支删掉就可以了 不会影响到主干和其它分支

    方便我们试错

    比如还有的时候 我们的开发人员 技术可能不行 执行让他在主干上开发 风险太大 所以给他新建一个分支

    如果一个功能开发完毕 我们就可以考虑将它合并到主干 这样对主干来说就一个大版本的升级

    master      ○                   ○
                                ↗
    feature/blue    ○   →   ○
    feature/game    ○   →   ○   →   ○


    比如master主干上有bug了 我们可以开辟一个hot_fix分支 热修复
    服务器不停叫做热修复
    服务器停了叫做冷修复

    hot_fix                                 ○ 
                                        ↗       ↘
    master      ○                   ○               ○
                                ↗
    feature/blue    ○   →   ○
    feature/game    ○   →   ○   →   ○

    将bug修复完毕后再合并到我们的主干
 -->

> 分支的好处
- 同时并行推进多个功能开发 提高开发效率
- 各个分支在开发过程中 如果某一个分支开发失败不会对其它分支有任何影响 失败的分支删除重新开始即可


> 查看所有的分支
> git branch -v


> 创建新的分支
> git branch 分支名


> 切换到指定分支
> git checkout 分支名


> 提交到指定分支上
> git commit -m '描述' 分支名


- 注意 我们创建分支后 分支里面的文件 和 master里面的文件是一样的
- 相当于我们复制了一份主干的文件 然后自己开发

- 比如我们现在切换到了 刚才新建的 feature 分支 然后我们对一个文件进行了修改
- 修改后我们将修改后的文件 add commit
<!-- 

 -->


> 合并操作
- 当我们分支上的功能开发完毕之后 我们会将分支上的功能合并到master
- 1. 切换到被合并的分支上 也就是增加新内容的分支上
<!-- 
    比如我们现在有两条分支
    master
    feature     添加了新内容

    我们现在要将feature合并到master分支上

    假如我们所处的分支是feature， 那么第一步就要切换到 master 分支上
 -->

- 2. 执行merge命令

> git merge 指定分支的名字
- 我们所处master 指定将哪一个分支的修改合并过来


### git在合并的时候会产生冲突
- 比如我们现在电脑上有两条分支 这两条分支都可以同时推进
<!-- 
    master      分支
    feature     分支
 -->

- 但是恰巧 两条分支改的都是同一个文件的同一个位置 而且内容又不一致 这时候git在合并的时候就拿不定注意了 到底是听谁的呢？
<!-- 
    Auto-merging good.text
    merge conflict in good.text
    automatic merge failed fix confiicts and then commit the result

    MERGEING

    自动合并失败 即将手动指定
 -->

- 那怎么办？
- 我们跟组内人员协商好用谁的 然后把文件改成最终的版本
- 别忘记编辑文件 删除特殊符号

- 依次重新进行下 git add  git commit -m '' 这时候不能带文件名

---------------------------

### Git基本原理
> 哈希：
- 哈希是一个系列的加密算法，各个不同的哈希算法虽然加密强度不同 但是有以下几个共同点
<!-- 
    不仅仅可以对文本操作 音频 视频都可以
 -->

    - 不管输入数据的数据量有多大 输入同一个哈希算法 得到的加密结果长度固定(md5就是一种哈希算法)
    - 哈希算法确定，输入数据确定 输出数据能够保证不变
    - 哈希算法确定，输入数据有变化，输出数据能够保证不变
    - 哈希算法不可逆

- Git底层采用的是SHA-1算法：
- 哈希算法可以被用来验证文件 比如有没有丢失数据
<!-- 
    原始文件    通过哈希算法    得到一串数字    服务器

    目标文件    通过哈希算法    得到一种数字    客户端

    然后我们比较两个数字的结果 如果有一点变化 比如下载的过程中丢失了一部分 我们都能通过哈希结果看到 差异会很大
 -->


---------------------------

### Git保存版本的机制

> svn
- 集中式版本控制工具的文件管理机制
- 以文件变更列表的方式存储信息 这类系统将它们保存的信息看做是一组基本文件和每个文件随时间逐步累积的差异
<!-- 
    增量式 只保存修改的部分 要是下文件需要 修改前和修改的部分 进行合并
 -->

> git
- git把数据看做是小型文件系统的一组快照，每次提交更新的时候git都会对当前的全部文件制作一个快照并保存这个快照的索引，为了高效
- 如果文件没有修改，git不再重新存储该文件，而是只保留一个连接指向之前存储的文件，所以git的工作方式可以称之为快照流
<!-- 
    git把每一个版本都当成快照 假如有重复的文件 那么下一个快照的指针指向上一个快照

    重复的快照指向前一个快照

    我们上传的每一个文件我进行快照 然后得到一个哈希值
    所有目录里面的文件的哈希值构成一个树对象 树对象里面包含了每一个具体的文件以及哈希值
 -->

---------------------------

### Git分支管理机制

> 创建分支的示意图
<!-- 

初始化本地库之后就会有master分支
                            ↘
                            (HEAD)
                            master  

                              ↓
    根提交
    98ca9   ←   34ac2   ←   f30ab

                              ↑

                            testing

当我们创建一个分支(testing)后 它也是指向最后一个版本的 我们创建一个分支相当于多创建一个指针指向最后一个 f30ab 版本

我们创建一个指针和把所有文件都复制一份 效率上是有很大的差别的
 -->

- 98ca9 提交后就是 34ac2 再提交后就是 f30ab


> 切换分支的示意图
- 在切换分支的时候 其实只是移动了指针 本质上还是指向了同一个版本
<!-- 
                            master  

                              ↓
    根提交
    98ca9   ←   34ac2   ←   f30ab

                              ↑

                            (HEAD)
                            testing
 -->


- 比如我们在 testing 版本上做出了一些修改的时候 testing就向前推进了一个版本 而master还停留在原地
<!-- 
                            master  

                              ↓
    根提交
    98ca9   ←   34ac2   ←   f30ab   ←   87ab2

                                          ↑

                                        (HEAD)
                                        testing
 -->


- 当我再切换分支回master的分支的时候 我们只是移动了指针 让它指向了上一个版本
<!-- 
                            (HEAD)
                            master  

                              ↓
    根提交
    98ca9   ←   34ac2   ←   f30ab   ←   87ab2

                                          ↑

                                        testing
 -->

---------------------------

### 远程仓库相关
> 在本地创建远程仓库地址别名
<!-- 
    https://github.com/slnn2080/git_study.git
    比如我们要推送到上面的地址，但是每次往上面的地址推送会很麻烦 记起来也很麻烦

    所以我们可以将上面的地址保存起来
 -->

> git remote -v
- 查看我们保存的地址别名


> git remote add origin https://github.com/....
- origin 以后就是后面地址的别名
- 我们将后面的地址起名为origin 放到remote里面
<!-- 
    git remote add origin https://github.com/slnn2080/git_study.git

    上面是github上面的让我们输入的代码提示 就是这样
    我们看看 将上面的地址保存起来是什么样的？

    git remote -v

    origin  https://github.com/slnn2080/git_study.git (fetch)
    origin  https://github.com/slnn2080/git_study.git (push)

    fetch 用来取回
    push  用来推送
 -->

- 在推送远程仓库之前 我们设置一下地址的别名


> 推送操作
> git push origin master
- git push 用来推送
- origin 是用来推送到哪里
- master 是用来推送到哪个分支
<!-- 
    推送前不要忘记 git commit等命令操作
 -->


> 克隆操作
> git clone url
- 注意我们要创建一个文件夹用来接收项目
- 这个命令一共有三个效果
- 1. 完整的把远程库下载到本地
- 2. 替我创建创建 origin 远程地址别名
- 3. 帮我们初始化本地库
<!-- 
    使用 git remote -v 看看都有什么别名
 -->

---------------------------

### 邀请加入团队
- 仓库里面 --- settings --- collaborators --- 输入要请求人的github账号 --- 复制链接 发送给对方

- 变成团队成员后 再执行推送 就可以推送了

---------------------------

> 有的时候报错 没有凭证 可以使用ssh克隆代码

- 新仓库没有ssh 创建ssh key
    ssh-keygen -t rsa -b 4096 -C "你的邮箱" 

- 打开ssh文件夹
- 执行：open /Users/xxx/.ssh
- 复制 rsa.pub中的内容
- 放到gitlab中
- 克隆ssh


### 创建ssh 公钥
- cd ~
- ssh-keygen -t rsa -C "你的邮箱地址"
- 然后在ssh文件夹里面复制公钥到github 


### 添加ssh到管理器
- ssh-add -l
- ssh-add /Users/liulin/.ssh/erin
 
---------------------------

### 远程库修改的拉取
- pull这个操作是fetch 和 merge两个操作的合并动作
- 抓取fetch 和pull都是读的操作
<!-- 
    
    使用fetch的时候 相当于先将远程库的东西下载到本地 然后我们可以看看 拉取的东西 然后在通过git merge命令再来合并操作

    比如我们可以使用fetch 将远程库的东西抓取下来
    git fetch origin master

    git fetch只是将远程库的东西下载到本地 但是没有修改本地工作区的文件
    比如我们可以使用
    git checkout origin/master 我们切换到 拉取的位置 看看就知道了

    我们还可以回到刚才的分支
    git checkout master

    接下来再进行合并的操作
    git merge origin/master
  -->

- pull = fetch + merge
> git fetch [远程库地址别名] [远程分支名]
> git fetch [远程库地址别名/远程分支名]
- 它只是把文件下载下来 并没有改变工作区 下载的文件在本地
- 我们可以使用 git checkout origin/master 来查看

> git merge origin/master
- 我们将远程的master合并到本地的master 合并之后本地就有新的内容了


> git pull origin master
- 相当于fetch 和 merge

---------------------------

### 将本地工程推送到远程库

> git push 创建的别名 要推送到的分支
- git push origin master
- 当我们拉取的文件比较简单不会产生冲突的时候 我们就使用pull操作
- 如果为了保险 那我们就使用fetch因为我们可以检查看看


> 协助开发时冲突的解决
- 比如两个人都改了同一个文件的同一个地方 那么只有选推送的人才能推送进去 后推送的人就推送不上去了
- 他必须拉取下来然后才能推送 但是拉取下来的时候 同一个位置有自己的内容 有别人的内容 git又不能给我们做决定了 这个就是冲突


- 解决冲突
- 要点：
- 1. 如果不是基于github远程库的最新版做的修改 不能推送 必须先拉取下来
- 2. 拉取下来后如果进入冲突状态 则按照 分支冲突解决 操作解决即可

---------------------------

### 扩展
- 在linux中文件名以.开头的都是隐藏文件家


> linux命令

- tail -n 3 指定文件
    只展示3行指定文件里面的内容 应该是最后三行

- rm 目标
    删除一个文件

- ls 目标
    查看文件夹下的文件
<!-- ls .git -->

- ls -lA 目标
    查看隐藏文件

- ls -lA|less
    查看所有文件包含隐藏文件

- ll 目标
    查看目标文件夹里面的东西

- pwd
    查看当前文件夹目录

- cat 目标
    打开目标文件
<!-- cat .git/config -->

- cd ~
    返回系统用户目录

- vim good.txt
    vim编辑器
    创建一个 good.txt 文件

- :set nu
    在vim编辑器里面 输入上面的命令会出现行号

- i
    在vim编辑器里面 输入i进如编辑模式

- 空格
    向下翻页

- b
    向上翻页

- q
    退出

- esc :wq
    退出 写入退出

- mkdir 文件夹
    创建目录














### 远程库操作