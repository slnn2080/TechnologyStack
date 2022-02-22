### 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

### 静态页面托管到github
- 1. 创建仓库
- 2. 创建 gh-pages 分支
- 3. 写index.html 推送到 github 该分支上
- 4. 然后去仓库的pages选项卡里面
- 5. https://github.com/slnn2080/TestRepositories/settings/pages
- 6. 在source的位置上选择 gh-pages 点击save


### Git的使用技巧
> 别人发给我的pullrequest
- 检查代码可以在页面上操作
- 如果有图片的话 需要将这个文件pull到本地查看

- 查看如果没问题的话 需要点 同意


> sourceTree解决冲突
- 可以在sourceTree里面选中有冲突的文件 然后右键 点击冲突解决 然后选择以谁的冲突为准


> 创建request的方式
- 1. 前端页面 命令行到commit - 然后vscode里面只用git工具提交 - 去github主页 - pullrequest - 前面选择到哪个分支 后面选择自己的分支 然后写什么已经截图了 
<!-- 
  https://kinto-dev.atlassian.net/browse/PLB-696
  附上发给你指示的网址
 -->


> 当主分支有新的东西需要下载 或者说 我们的现有分支因为没有对应的东西报错的时候
- 我们可以先在主分支上 pull 最新的数据
- 然后在我们自己的分支上合并主分支的数据就好了


> 在push操作的时候
- git push origin feature/plan_b/PLB-696-s-roomy
- 我们要push到自己的远程分支上 没有的话就会创建吧 自信点是会创建


> 在下拉操作的时候
- git pull --rebase origin master


> 在执行了  git fetch 之后
- 我们还要执行 git merge origin/分支名


> you need to resolve your current index first 解决办法
- 从一个分支A切换到另一个分支B后，对切换后的B分支进行pull操作，因为pull操作实际上包含了fetch+merge操作，在执行 merge操作时，由于很长时间没有对B分支执行过pull/merge操作，本地的B分支库与remote中的B分支库中的差异很大（且这些差异是其他 同事开发的文件），merge时产生冲突，使得B分支的状态为merging，其实是指merge失败，还停留在merge状态，也不能执行pull操 作。

- 这时没有解决冲突，而是从B分支上执行checkout/switchto操作，试图再切换其他分支时 就会报上述的错误

- 解决方式:
- 网上的答案： 
- 1. 解决conflicts后再次执行merge；
- 2. 回退到merge前

- 既然merge冲突是其他同事的文件，我不需要去resolve conflicts，那就退回merge前吧，单纯的改我的文件再push吧，执行以下代码：
- git reset --merge  

<!-- 
    还是报错
    not uptodate. Cannot merge.
    Could not reset index file to revision 'HEAD'.
 -->


### 问题集锦
- failed to push some refs to 'git@github.com:xxx/xxx.git'错误提示；
- github中的README.md文件不在本地代码目录中；

- 解决的办法：
- git pull --rebase origin master


- 场景：
- 在pull的时候出现下面注释中的提示

- 解决办法：
- git config pull.ff false
- git config --global pull.rebase false
<!-- 
    hint: Pulling without specifying how to reconcile divergent branches is
    hint: discouraged. You can squelch this message by running one of the following
    hint: commands sometime before your next pull:
    hint: 
    hint:   git config pull.rebase false  # merge (the default strategy)
    hint:   git config pull.rebase true   # rebase
    hint:   git config pull.ff only       # fast-forward only
    hint: 
    hint: You can replace "git config" with "git config --global" to set a default
    hint: preference for all repositories. You can also pass --rebase, --no-rebase,
    hint: or --ff-only on the command line to override the configured default per
    hint: invocation.


    warning 不建议在没有为偏离分支指定合并策略时执行pull操作 您可以在执行以下次pull操作之前执行下面一条命令来抑制本消息
    git config pull.rebase false    合并 默认策略
    git config pull.rebase true     变基
    git config pull.ff only         仅快进
 -->

- 我们在上述的警告文案描述中可以发现两个重要的Git配置信息pull.rebase和pull.ff。

> pull.ff 
- 当把pull.ff设置为false时，这个变量告诉Git在这种情况下，如果执行不带选项的git pull命令时先尝试快进合并，如果不行再进行正常合并生成一个新的提交。
    pull.ff false

- 当把pull.ff设置为only时，只允许快进合并(相当于执行命令git pull --ff-only)，如果执行不带选项的git pull命令时，如果不能进行快进合并则终止当前操作。
    pull.ff only

- 如果将pull.ff设置为only，而执行不带选项的git pull命令被终止，其实可以使用带参数的git pull --no-ff或者git pull --rebase命令来执行pull操作。


> pull.rebase
- 当pull.rebase为true时，运行不带选项的命令git pull相当于执行git pull --rebase。
- 当pull.rebase为false时，运行不带选项的命令git pull不会被改变含义，即不会变基。如果想变基，需要在执行命令时显式地加上选项--rebase，即git pull --rebase。

- https://blog.csdn.net/wq6ylg08/article/details/114106272

<!-- 
    2.2 理解git pull命令的原理及其各选项的含义
    2.2.1 git pull命令的原理
    git fetch会查询git remote中所有的远程仓库所包含分支的最新提交，并将其记录到.git/FETCH_HEAD文件中。

    .git/FETCH_HEAD是一个版本链接，指向着目前已经从远程仓库取下来的所有分支的最新提交。

    git pull命令等价于：先执行git fetch，再执行git merge FETCH_HEAD将远程仓库对应分支的最新提交合并到当前本地分支中。

    2.2.2 git pull命令中各选项的含义
    其中git pull有这几项常见的选项搭配：

    不带任何选项的git pull命令：先尝试快进合并，如果不行再进行正常合并生成一个新的提交。
    git pull --ff-only命令：只尝试快进合并，如果不行则终止当前合并操作。
    git pull --no-ff命令：禁止快进合并，即不管能不能快进合并，最后都会进行正常合并生成一个新的提交。
    git pull --rebase命令：先尝试快进合并，如果不行再进行变基合并。
    2.3 理解git pull命令出现问题的原因
    现在，看完上述的问题的文案描述、git pull命令的原理及其各选项的含义后，现在我们清楚为什么git pull命令出现该警告文案的原因了：
    
    执行不带任何选项的git pull命令时，会产生三种歧义： git pull --ff-only、git pull --no-ff、git pull --rebase，而这三种pull方式的合并策略差异很大，即对整个分布式项目的版本管理有很大的影响作用。

    而我们执行不带任何选项的git pull命令时，Git就不知道我们到底想用哪种合并策略来执行git pull，因此Git会给出上述的警告文案，建议我们通过git config命令指定不带选项的git pull命令应该按照这三种合并策略的哪种来执行。

    首先理解什么是偏离分支：
    当本地的分支落后于远程分支时，本地分支又自行修改项目文件生成了新的提交，这时本地分支再执行git pull命令就不能快进合并，并且还容易发生冲突。这时的本地分支便称为偏离分支，因为这时的本地分支的最新提交跟远程分支的最新提交不同，产生了偏离。

    接着理解什么是合并策略：
    合并策略便是 
        git merge --ff-only、
        git merge --no-ff、
        git merge --rebase
    这三种常见的合并策略，分别代表着快进合并、非快进普通合并、变基合并。


    而我们执行不带任何选项的git pull命令时，Git就不知道我们到底想用哪种合并策略来执行git pull，因此Git会给出上述的警告文案，建议我们通过git config命令应该按照这三种合并策略的哪种来执行。

    通过上述的文章讲解，现在我们理解了为什么理解git pull命令出现问题的原因，因此只要我们在Git中配置选项pull.rebase或pull.ff的参数即可。配置后，即便我们再执行不带任何选项的git pull命令，也不会再出现上述的警告文案啦。


    如何配置选项pull.rebase或pull.ff的参数
    博主已经在本文的《2.1 理解问题的文案描述》章节中将选项pull.rebase和pull.ff的参数的所有情况进行了一一介绍，因此具体怎么配置按照你使用Git的个人喜好即可。

    例如博主喜欢在git pull时只接受快进合并和变基合并，那么博主可以执行git config pull.ff only，保证每次执行不带选项的git pull时要么快进合并成功，要么快进合并失败。如果快进合并失败，博主再显式执行git pull --rebase进行变基合并即可。
 -->




### 命令
- wq                退出
- git ls-files -s   看看暂存区里面的文件
- git status        确认当前文件是什么状态
- git credential-manager uninstall
- git config --global --remove-section credential

- mkdir: 
    - 创建一个文件夹

- pwd: 
    - 用于显示当前目录

- ls -ah: 
    - 查看隐藏的文件

- cat
    - 打开文件




### SSH
Your identification has been saved in sam.
Your public key has been saved in sam.pub.
<!-- 
    公钥
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC+79/8av2+MVY+QuZOWKBt0b6SzrCm8meMU0TZNkTH7FFNy6XKcVrtZjehHsCkpMaZn6CcuvsmKKprv4zuFzDqqN2+damBCrnqpNwrwzblHQFYMIxWegt7MLGOgyOlzNvWyZICH6wVUmu18RGbIP4x072lCFdGb5sdNv9C8CFf8W89UR34nJgT+7d9aJh5/X5pBa1wG0rsvakyZr/oIFO0pq0pzkiL36bEYwRe3kQjSoYhcVwYlZ18K11b2eU9NnF3OV5Hi/jGB0y+CAFTkzI0iHX2tFMYqDW/bBzjtUnaQw0kk5IqjIIQaiq0h8tKFPAtaTDUgWud+5UbgXe0pzTF love.nn.linlin@gmail.com
 -->


### 创建ssh 公钥
- 由于你的本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以，需要一点设置

> 创建 SSH Key
- cd ~
- ssh-keygen -t rsa -C "你的邮箱地址"
- 然后在ssh文件夹里面复制公钥到github 复制 .pub 文件
<!-- 
    在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，
    
    如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：
    你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。
    如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。
 -->

> 添加ssh到管理器
- ssh-add -l
- ssh-add /Users/liulin/.ssh/erin
<!-- 
    - 这次我选择的是使用ssh 但是发现即使更换了ssh之后 仍然不能推送的github上
    - 提示没有公钥的权限
    - 查询了一下 发现是我们创建的公钥并没有放在苹果的管理器 所以又用上面的命令 将创建的公钥放在了苹果的管理器上 然后再push就好用了
 -->

> 看看有没有配置成功
- ssh -T git@github.com

> 登陆GitHub，打开“Account settings”，“SSH Keys”页面：
- 点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：

> 为什么GitHub需要SSH Key呢？
- 因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。
<!-- 
    当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。
 -->

> 问题集锦
<!-- 
    - 我使用git push到远程仓库 但是总是提示 认证失败
    - 查找了一下原因说之前电脑配置了边用户名 然后又修改过 导致两次的用户名不一样
    - 我们需要删除credential 下面的命令是看有没有 credential
    - git config credential.helper
    - 然后下面的命令是看在哪里 找到 删除掉
    - git config --show-origin --get credential.helper
 -->
---------------------------


### SVN
- 是一种集中式的状态管理 要想用SVN要求所有人有一台电脑作为中央服务器 当这台电脑处于开机的状态的时候 我们才能在上面拿到代码

- 版本库是集中存放在中央服务器的 而干活的时候，用的都是自己的电脑，所以要先从中央服务器取得最新的版本，然后开始干活，干完活了，再把自己的活推送给中央服务器。
<!-- 
    中央服务器就好比是一个图书馆，你要改一本书，必须先从图书馆借出来，然后回到家自己改，改完了，再放回图书馆。
 -->

---------------------------

### Git命令集锦 

---------------------------

### Git
- 每一个人的电脑上都有一个仓库，我们的仓库可以和别的仓库进行沟通
- 分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了，因为版本库就在你自己的电脑上。
<!-- 
    既然每个人电脑上都有一个完整的版本库，那多个人如何协作呢？比方说你在自己电脑上改了文件A，你的同事也在他的电脑上改了文件A，这时，你们俩之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。
 -->

---------------------------

### Git的概念

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
    本地库                  本地库
 -->
<!-- 
    用户A 刚创建的远程库是空的 我们的历史记录 和 代码都在本地库 我们要使用
    push
    把本地库的内容推送到远程库
    用户B 需要将远程库中的内容 克隆下来 需要使用
    clone
    clone这个操作不光是下载远程库的东西 还会把本地库初始化好
    然后用户B 也需要在自己的本地库的基础上进行修改 改完之后他需要提交到本地库再推送到远程库
    但是用户B直接推送是推送不了的 因为这个库是用户A创建的 用户B不能直接往里面写东西
    用户B需要加入团队 也就是 用户A邀请用户B加入团队 加入团队后就有这样的推送权限了
    用户B将代码使用命令 push推动到远程库
    用户A 需要使用命令 将用户A推送到远程库里面的代码 拉取到用户A的本地库
    pull
    这就是一个协同开发的效果
 -->


> 跨团队协作
- 当有一个功能比如用户B实现不了 需要找用户C来帮忙，但是用户C并不是用户AB团队内部的成员所以没有办法进行相关的操作
<!-- 
    比如 代码中心里面有 用户A创建好的远程库
    用户C使用 下面的命令将用户A的远程库里面的内容复制一份到自己的远程库
    fork
    然后用户C 将自己远程库里的代码 进行clone 然后再进行修改 再推送到自己的远程库
    clone
    然后用户C需要发起 拉取请求
    pull request
    然后用户A对里面的内容进行审核 审核如果没有问题 那么他就可以在线做一下合并操作 合并到用户A的远程库里面 这样用户A的远程库里面就会有用户C做的修改了
    merge
 -->   

>  工作区
<!-- 
    本地代码 项目下的文件
    我们在工作区中生成文件 修改文件都是在这里做的 这也就沙箱环境 这个环境下
    删改都可以
 -->

> 暂存区
<!-- 
    暂时放在这里 新增一个文件 删除一个文件 统一一次修改提交
 -->

> 版本库
- 版本库又名仓库，英文名repository，你可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。
<!-- 
    到这里才算是一个版本
 -->

> 将本地版本库推送到远程版本库的操作步骤
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

> 解析：
> 将你本地的仓库和github仓库进行关联
git remote add origin https://github.com/slnn2080/git_test.git
git remote add origin git@github.com:slnn2080/UsefulData.git


> 推送到远程仓库
git push -u origin master
git push origin master
- 第一次推送master分支时，加上了 –u参数
- Git会将本地的master分支内容推送的远程新的master分支，还会把2个master分支关联起来，在以后的推送或者拉取时就可以简化操作

---------------------------

### 设置签名
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

> 用于初始化用户信息
- 下面的命令是干啥的
- git config --global --replace-all user.email 'love.nn.linlin@gmail.com'

---------------------------

### 本地库的初始化

> git init
- 作用：
- 通过git init命令把这个目录变成Git可以管理的仓库：
- .git文件夹中 存放的是本地库相关的子目录和文件 不要删除 也不要乱修改
- 这个文件夹里面的东西乱点的话 本地库就不能正常工作了

> git status
- 作用：
- 查看工作区 和 暂存区的状态
- 可以让我们时刻掌握仓库当前的状态
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
- 把文件添加进去，实际上就是把文件修改添加到暂存区；
<!-- 
    // 我们执行完 git add后 会显示
    On branch master
    No commits yet
    Changes to be committed:
        // 下面有文件可以提交到本地库
    (use "git rm --cached <file>..." to unstage)
    new file:   luck.txt        // 绿色
 -->   

> git commit -m '对提交的文件进行这次提交的描述' 指定文件名
> git commit -m '对提交的文件进行这次提交的描述'
- 从暂存区提交到本地库
- 提交更改，实际上就是把暂存区的所有内容提交到当前分支。


> 提交到指定分支上
> git commit -m '描述' 分支名
- 将文件提交到本地版本库
- 一次commit可以提交n次add的文件
<!-- 
    git commit -m "wrote a readme file"
    [master (root-commit) eaadf4e] wrote a readme file
    1 file changed, 2 insertions(+)
    create mode 100644 readme.txt
 -->

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

---------------------------

### 文件的修改 对比
- 场景：
- 我们已经成功地添加并提交了一个readme.txt文件，现在，是时候继续工作了，于是，我们继续修改readme.txt文件，改成如下内容：
<!-- 
    Git is a distributed version control system.
    Git is free software.
    git status
    On branch master
    Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working directory)
        modified:   readme.txt
    no changes added to commit (use "git add" and/or "git commit -a")
    上面的命令输出告诉我们，readme.txt被修改过了，但还没有准备提交的修改。
 -->


> git status
- 可以让我们时刻掌握仓库当前的状态


> git diff fliename
<!-- 
    比如你休假两周从国外回来，第一天上班时，已经记不清上次怎么修改的readme.txt，所以，需要用git diff这个命令看看：
    $ git diff readme.txt 
    diff --git a/readme.txt b/readme.txt
    index 46d49bf..9247db6 100644
    --- a/readme.txt
    +++ b/readme.txt
    @@ -1,2 +1,2 @@
    -Git is a version control system.
    +Git is a distributed version control system.
    Git is free software.
    可以从上面的命令输出看到，我们在第一行添加了一个distributed单词。
    知道了对readme.txt作了什么修改后，再把它提交到仓库就放心多了，提交修改和提交新文件是一样的两步，第一步是git add：
 -->
---------------------------

### 版本回退
- 上面我们已经学会了如何修改文件 以及提交文件 当我们不断对文件进行修改，然后不断提交修改到版本库里，就好比玩RPG游戏时，每通过一关就会自动把游戏状态存盘，如果某一关没过去，你还可以选择读取前一关的状态。
<!-- 
    有些时候，在打Boss之前，你会手动存盘，以便万一打Boss失败了，可以从最近的地方重新开始。
    Git也是一样，每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为commit。
    commit就相当于 存档 ？？？ 
    一旦你把文件改乱了，或者误删了文件，还可以从最近的一个commit恢复，然后继续工作，而不是把几个月的工作成果全部丢失。
 -->


- 上面我们文件不断的进行了提交 但是多次提交后我们怎么知道 每次提交都修改了什么内容


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


> git log
- 显示从最近到最远的提交日志


> git log --pretty=oneline
- 一个版本使用一行显示 来显示所有的版本列表
<!-- 
    $ git log --pretty=oneline
    1094adb7b9b3807259d8cb349e7df1d4d6477073 (HEAD -> master) append GPL
    e475afc93c209a690c39c13a46716e8fa000c366 add distributed
    eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0 wrote a readme file
 -->


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

- 这个命令显示从最近到最远的提交日志，我们可以看到3次提交，最近的一次是append GPL，上一次是add distributed，最早的一次是wrote a readme file。
<!-- 
    git log
    commit 1094adb7b9b3807259d8cb349e7df1d4d6477073 (HEAD -> master)
    Author: Michael Liao <askxuefeng@gmail.com>
    Date:   Fri May 18 21:06:15 2018 +0800
        append GPL
    commit e475afc93c209a690c39c13a46716e8fa000c366
    Author: Michael Liao <askxuefeng@gmail.com>
    Date:   Fri May 18 21:03:36 2018 +0800
        add distributed
    commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0
    Author: Michael Liao <askxuefeng@gmail.com>
    Date:   Fri May 18 20:59:18 2018 +0800
        wrote a readme file
 -->

- 看到的一大串类似1094adb...的是commit id（版本号）
- 每提交一个新版本，实际上Git就会把它们自动串成一条时间线。如果使用可视化工具查看Git历史，就可以更清楚地看到提交历史的时间线：


> 回退步骤
- 好了，现在我们启动时光穿梭机，准备把readme.txt回退到上一个版本，也就是add distributed的那个版本，怎么做呢？
- 首先，Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样）

> HEAD^
- 上一个版本
> HEAD^^
- 上上一个版本
- 当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。

> git reset
- 使用该命令 回退到上一个版本
- git reset --hard HEAD^
<!-- 
    git reset --hard HEAD^
    HEAD is now at e475afc add distributed
 -->
- 那现在有一个问题 现在最新的版本是C 然后我们回退到了B 我们就看不见C了 就相当于我们从20世纪回退到19世纪后 回不去了怎么办？

- 办法其实还是有的，只要上面的命令行窗口还没有被关掉，你就可以顺着往上找啊找啊，找到那个append GPL的commit id是1094adb...，于是就可以指定回到未来的某个版本：

- git reset --hard 1094a


- 现在，你回退到了某个版本，关掉了电脑，第二天早上就后悔了，想恢复到新版本怎么办？找不到新版本的commit id怎么办？

- 在Git中，总是有后悔药可以吃的。当你用$ git reset --hard HEAD^ 回退到add distributed版本时，再想恢复到append GPL，就必须找到append GPL的commit id。Git提供了一个命令git reflog用来记录你的每一次命令：
<!-- 
    e475afc HEAD@{1}: reset: moving to HEAD^
    1094adb (HEAD -> master) HEAD@{2}: commit: append GPL
    e475afc HEAD@{3}: commit: add distributed
    eaadf4e HEAD@{4}: commit (initial): wrote a readme file
    终于舒了口气，从输出可知，append GPL的commit id是1094adb，现在，你又可以乘坐时光机回到未来了。
 -->


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

### 合并多次提交
- 我们对代码的每一次的修改 都会进行一次 add 和 commit 这样我们的修改才会被提交到本地的版本库
- 但是每次我们不要对每次的修改都commit
- 可以 add - add - add - commit
- 这样可以提交一次

> git diff HEAD -- readme.txt
- 可以查看工作区和版本库里面最新版本的区别
---------------------------

### 撤销修改
> 情景1: 未提交到暂存区的时候 
> git checkout -- file
- 可以丢弃工作区的修改

> git checkout .
- 撤销所有未add的更改
<!-- 
    git checkout -- readme.txt
    命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：
    - 一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
    - 一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
    - 总之，就是让这个文件回到最近一次git commit或git add时的状态。
    git checkout -- file命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到git checkout命令。
 -->

> 情景2: 已经提交到暂存区 但是还没有进行提交(commit)
> git reset HEAD readme.txt
- 可以把暂存区的修改撤销掉（unstage），重新放回工作区
<!-- 
    git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用HEAD时，表示最新的版本。
 -->
- 还记得如何丢弃工作区的修改吗？
- git checkout -- readme.txt


> 情景3: 已经提交了不合适的修改到版本库时
- 想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

---------------------------

### 修改 commit -m 
- git commit --amend
- 会进入到 vim 编辑器

---------------------------

### 删除文件
- 先添加一个新文件test.txt到Git并且提交：
- 一般情况下，你通常直接在文件管理器中把没用的文件删了，或者用rm命令删了：
<!--    
    rm test.txt
 -->

- 这个时候，Git知道你删除了文件，因此，工作区和版本库就不一致了，git status命令会立刻告诉你哪些文件被删除了：
- 现在你有两个选择，

- 一是确实要从版本库中删除该文件，那就用命令git rm删掉，并且git commit：
<!-- 
    git rm file
    git commit
 -->

> git rm file
- 从版本库中删除该文件

- 另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本


> git checkout -- test.txt
- git checkout其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

---------------------------

### git restore
- git restore命令是撤销的意思，也就是把文件从缓存区撤销，回到未被追踪的状态。
- 该命令有两种常用的用法。
- 1. git restore <file>
- git restore <file>会撤销文件的修改，撤销到最近一次执行git add的内容。

- 2. git restore --staged <file>
- 会把文件从暂存区移除，文件的修改不会受影响。

- 注意：
- 在git中有工作区、暂存区、仓库区（本地代码区）三部分，要注意git restore命令在工作区是不会其作用的，也就是一个文件在工作区，使用git restore是不起作用的。
- 也就是说 如果文件没有add 这个命令会报错

---------------------------

### 远程仓库相关
- 总结：
- 假如我们关联错了远程仓库的情况下 我们是没有办法推送到这个远程仓库中的
- 因为这个远程仓库的用户列表中没有我们的ssh

> git push -u origin master
- 把本地库的内容推送到远程，用git push命令，实际上是把当前分支master推送到远程。
- 由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。


> SSH警告
- 当你第一次使用Git的clone或者push命令连接GitHub时，会得到一个警告：
<!-- 
    The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
    RSA key fingerprint is xx.xx.xx.xx.xx.
    Are you sure you want to continue connecting (yes/no)?
    这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入yes回车即可。
    Git会输出一个警告，告诉你已经把GitHub的Key添加到本机的一个信任列表里了：
 -->


> 删除远程库
- 如果添加的时候地址写错了，或者就是想删除远程库，可以用git remote rm <name>命令。使用前，建议先用git remote -v查看远程库信息：


> git remote rm <name>
- 删除远程库


> git remote -v
- 查看远程库信息
- 然后，根据名字删除，比如删除origin：
- git remote rm origin


> 从远程库克隆
- git clone git@github.com:michaelliao/gitskills.git
- 克隆一个本地库
- 如果有多个人协作开发，那么每个人各自从远程克隆一份就可以了。
- 也就是说 我需要克隆下来一个仓库　克隆应该是没有问题的 但是推送就要看我们的ssh在不在他的用户列表里面了

---------------------------

### 分支管理
- 在版本回退里，你已经知道，每次提交，Git都把它们串成一条时间线，这条时间线就是一个分支。截止到目前，只有一条时间线，在Git里，这个分支叫主分支，即master分支。

- HEAD严格来说不是指向提交，而是指向master，master才是指向提交的，所以，HEAD指向的就是当前分支。

- 一开始的时候，master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点：

- 每次提交，master分支都会向前移动一步，这样，随着你不断提交，master分支的线也越来越长

- 当我们创建新的分支，例如dev时，Git新建了一个指针叫dev，指向master相同的提交，再把HEAD指向dev，就表示当前分支在dev上：

- 不过，从现在开始，对工作区的修改和提交就是针对dev分支了，比如新提交一次后，dev指针往前移动一步，而master指针不变：
<!-- 
            master
              ↓
    A -- B -- C -- D
                   ↓
                   dev
                   ↓
                   HEAD
 -->

- 假如我们在dev上的工作完成了，就可以把dev合并到master上。Git怎么合并呢？最简单的方法，就是直接把master指向dev的当前提交，就完成了合并：

- 合并完分支后，甚至可以删除dev分支。删除dev分支就是把dev指针给删掉，删掉后，我们就剩下了一条master分支：


> 创建分支
> git checkout -b dev

> 查看当前分支
> git branch
- git branch命令会列出所有分支，当前分支前面会标一个*号。
- 现在，dev分支的工作完成，我们就可以切换回master分支：

- 切换回master分支后，再查看一个readme.txt文件，刚才添加的内容不见了！因为那个提交是在dev分支上，而master分支此刻的提交点并没有变：

- 现在，我们把dev分支的工作成果合并到master分支上：

> git merge dev
- 用于合并指定分支到当前分支。
- 合并后，再查看readme.txt的内容，就可以看到，和dev分支的最新提交是完全一样的。
<!-- 
    $ git merge dev
    Updating d46f35e..b17d20e
    Fast-forward
    readme.txt | 1 +
    1 file changed, 1 insertion(+)
    注意到上面的Fast-forward信息，Git告诉我们，这次合并是“快进模式”，也就是直接把master指向dev的当前提交，所以合并速度非常快。
    当然，也不是每次合并都能Fast-forward，我们后面会讲其他方式的合并。
    合并完成后，就可以放心地删除dev分支了：
 -->


> git branch -d dev
- 合并完成后，就可以放心地删除dev分支了：

- 我们注意到切换分支使用git checkout <branch>，而前面讲过的撤销修改则是git checkout -- <file>，同一个命令，有两种作用，确实有点令人迷惑。


> git switch 分支名
- 最新版本的Git提供了新的git switch命令来切换分支：


> git switch -c dev
- 创建并切换到新的dev分支

---------------------------

### 解决冲突
- 人生不如意之事十之八九，合并分支往往也不是一帆风顺的。
- 当我们A分支文件修改了最后一行 B分支文件修改了最后一行 并且都进行了提交 这个时候我们进行合并的时候

- 这种情况下，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突，我们试试看：
<!-- 
    $ git merge feature1
    Auto-merging readme.txt
    CONFLICT (content): Merge conflict in readme.txt
    Automatic merge failed; fix conflicts and then commit the result.
 -->

- 果然冲突了！Git告诉我们，readme.txt文件存在冲突，必须手动解决冲突后再提交。git status也可以告诉我们冲突的文件：

- 执行 git status 命令来查看冲突的文件
- 我们可以直接查看readme.txt的内容：
<!-- 
    Git is a distributed version control system.
    Git is free software distributed under the GPL.
    Git has a mutable index called stage.
    Git tracks changes of files.
    <<<<<<< HEAD
    Creating a new branch is quick & simple.
    =======
    Creating a new branch is quick AND simple.
    >>>>>>> feature1
 -->

- Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容，我们修改如下后保存：
<!-- 
    Creating a new branch is quick and simple.
 -->

- 再提交：
<!-- 
    git add readme.txt 
    git commit -m "conflict fixed"
    [master cf810e4] conflict fixed
 -->

- git log --graph --pretty=oneline --abbrev-commit
- 用带参数的git log也可以看到分支的合并情况：
<!-- 
    git log --graph --pretty=oneline --abbrev-commit
    *   cf810e4 (HEAD -> master) conflict fixed
    |\  
    | * 14096d0 (feature1) AND simple
    * | 5dc6824 & simple
    |/  
    * b17d20e branch test
    * d46f35e (origin/master) remove test.txt
    * b84166e add test.txt
    * 519219b git tracks changes
    * e43a48b understand how stage works
    * 1094adb append GPL
    * e475afc add distributed
    * eaadf4e wrote a readme file
 -->

- 最后，删除feature1分支：

- 用git log --graph命令可以看到分支合并图。

---------------------------

### 分支策略
- 在实际开发中，我们应该按照几个基本原则进行分支管理：
- 首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

- 干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；

- 你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

- 也就是说 master 是用来发布版本的 我们都要从dev上创建自己的分支干活 然后合并到dev上

---------------------------

### Bug分支 stash功能
- 软件开发中，bug就像家常便饭一样。有了bug就需要修复，在Git中，由于分支是如此的强大，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

- 当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支issue-101来修复它，但是，等等，当前正在dev上进行的工作还没有提交：

- 并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug，怎么办？

- 幸好，Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：

> git stash
- 运行这个命令将当前正在进行的工作保存起来 然后去别的分支修改bug

> 修改bug
- 创建分支来修复bug。
- 首先确定要在哪个分支上修复bug，假定需要在master分支上修复，就从master创建临时分支：
<!-- 
    git checkout master
    git checkout -b issue-101
 -->

- 现在修复bug，需要把“Git is free software ...”改为“Git is a free software ...”，然后提交：
<!-- 
    git add readme.txt 
    git commit -m "fix bug 101"
 -->

- 修复完成后，切换到master分支，并完成合并，最后删除issue-101分支：
- git switch master
- git merge --no-ff -m "merged bug fix 101" issue-101

- 太棒了，原计划两个小时的bug修复只花了5分钟！现在，是时候接着回到dev分支干活了！
- git switch dev
- git status
- 工作区是干净的，刚才的工作现场存到哪去了？用git stash list命令看看：

> git stash list
<!-- 
    stash@{0}: WIP on dev: f52c633 add merge
 -->
- 工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：


> git stash apply
- 恢复刚才使用 git stash 保存起来的工作
- 但是恢复后，stash内容并不删除，你需要用git stash drop来删除；


> git stash pop
- 恢复的同时把stash内容也删了：

- 你可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令：
- git stash apply stash@{0}


> git cherry-pick 4c805e2
- 在master分支上修复了bug后，我们要想一想，dev分支是早期从master分支分出来的，所以，这个bug其实在当前dev分支上也存在。
- 那怎么在dev分支上修复同样的bug？重复操作一次，提交不就行了？
- 有木有更简单的方法？
- 有！
- 同样的bug，要在dev上修复，我们只需要把4c805e2 fix bug 101这个提交所做的修改“复制”到dev分支。
- 注意：我们只想复制4c805e2 fix bug 101这个提交所做的修改，并不是把整个master分支merge过来。

- 为了方便操作，Git专门提供了一个cherry-pick命令，让我们能复制一个特定的提交到当前分支：
<!-- 
    $ git branch
    * dev
    master
    $ git cherry-pick 4c805e2
    [master 1d4b803] fix bug 101
    1 file changed, 1 insertion(+), 1 deletion(-)
    Git自动给dev分支做了一次提交，注意这次提交的commit是1d4b803，它并不同于master的4c805e2，因为这两个commit只是改动相同，但确实是两个不同的commit。用git cherry-pick，我们就不需要在dev分支上手动再把修bug的过程重复一遍。
    有些聪明的童鞋会想了，既然可以在master分支上修复bug后，在dev分支上可以“重放”这个修复过程，那么直接在dev分支上修复bug，然后在master分支上“重放”行不行？当然可以，不过你仍然需要git stash命令保存现场，才能从dev分支切换到master分支。
    修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；
    当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场；
    在master分支上修复的bug，想要合并到当前dev分支，可以用git cherry-pick <commit>命令，把bug提交的修改“复制”到当前分支，避免重复劳动。
 -->

---------------------------

### Feature分支
- 软件开发中，总有无穷无尽的新的功能要不断添加进来。
- 添加一个新功能时，你肯定不希望因为一些实验性质的代码，把主分支搞乱了，所以，每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支。

- 现在，你终于接到了一个新任务：开发代号为Vulcan的新功能，该功能计划用于下一代星际飞船。
<!-- 
    $ git switch -c feature-vulcan
    Switched to a new branch 'feature-vulcan'
 -->

- 5分钟后，开发完毕：
<!-- 
    $ git add vulcan.py
    $ git status
    On branch feature-vulcan
    Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
        new file:   vulcan.py
    $ git commit -m "add feature vulcan"
    [feature-vulcan 287773e] add feature vulcan
    1 file changed, 2 insertions(+)
    create mode 100644 vulcan.py
 -->

- 切回dev，准备合并：
<!-- 
    $ git switch dev
 -->

- 一切顺利的话，feature分支和bug分支是类似的，合并，然后删除。

- 但是！　就在此时，接到上级命令，因经费不足，新功能必须取消！　虽然白干了，但是这个包含机密资料的分支还是必须就地销毁：


> git branch -a
- 查看所有分支
- 带有 remotes/origin的是远程分支


> git branch -r
- 查看远程分支


> git branch -d feature-vulcan
> git branch -D feature-vulcan
- 删除分支
<!-- 
    $ git branch -d feature-vulcan
    error: The branch 'feature-vulcan' is not fully merged.
    If you are sure you want to delete it, run 'git branch -D feature-vulcan'.
 -->

- 销毁失败。Git友情提醒，feature-vulcan分支还没有被合并，如果删除，将丢失掉修改，如果要强行删除，需要使用大写的-D参数。。

- 现在我们强行删除：
<!-- 
    git branch -D feature-vulcan
 -->

- 如果要丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除。


> 删除远程分支
> git push origin --delete branchname
<!-- 
    - git branch -r -d origin/branchname
    - 这句是删除本地与远程的关联

    git push origin --delete branchname
    - 这句是删除远程的分支
 -->

---------------------------

### 什么是分支   另一个老师的总结
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

### 多人协作
- 当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin。

> git remote
- 要查看远程库的信息，用git remote：
- 或者，用git remote -v显示更详细的信息：
<!-- 
    $ git remote -v
    origin  git@github.com:michaelliao/learngit.git (fetch)
    origin  git@github.com:michaelliao/learngit.git (push)
    上面显示了可以抓取和推送的origin的地址。如果没有推送权限，就看不到push的地址。
 -->


> 推送分支
- 推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上：


> git push origin master
- 如果要推送其他分支，比如dev，就改成： git push origin dev
- 但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？
- master分支是主分支，因此要时刻与远程同步；
- dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
- bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
- feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

- 总之，就是在Git中，分支完全可以在本地自己藏着玩，是否推送，视你的心情而定！


> 抓取分支
- 多人协作时，大家都会往master和dev分支上推送各自的修改。
- 现在，模拟一个你的小伙伴，可以在另一台电脑（注意要把SSH Key添加到GitHub）或者同一台电脑的另一个目录下克隆：
<!-- 
    $ git clone git@github.com:michaelliao/learngit.git
    Cloning into 'learngit'...
    remote: Counting objects: 40, done.
    remote: Compressing objects: 100% (21/21), done.
    remote: Total 40 (delta 14), reused 40 (delta 14), pack-reused 0
    Receiving objects: 100% (40/40), done.
    Resolving deltas: 100% (14/14), done.
 -->

- 当你的小伙伴从远程库clone时，默认情况下，你的小伙伴只能看到本地的master分支。不信可以用git branch命令看看：
<!-- 
    $ git branch
    * master
 -->

- 现在，你的小伙伴要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是他用这个命令创建本地dev分支：

> git checkout -b dev origin/dev
- 现在，他就可以在dev上继续修改，然后，时不时地把dev分支push到远程：
<!-- 
    $ git add env.txt
    $ git commit -m "add env"
    [dev 7a5e5dd] add env
    1 file changed, 1 insertion(+)
    create mode 100644 env.txt

    $ git push origin dev
    Counting objects: 3, done.
    Delta compression using up to 4 threads.
    Compressing objects: 100% (2/2), done.
    Writing objects: 100% (3/3), 308 bytes | 308.00 KiB/s, done.
    Total 3 (delta 0), reused 0 (delta 0)
    To github.com:michaelliao/learngit.git
    f52c633..7a5e5dd  dev -> dev
 -->

- 抽取：
- 也就是说，当我clone下来一个仓库之后 我就要创建自己的dev分支开始开发功能


- 你的小伙伴已经向origin/dev分支推送了他的提交，而碰巧你也对同样的文件作了修改，并试图推送：
<!-- 
    $ cat env.txt
    env
    $ git add env.txt
    $ git commit -m "add new env"
    [dev 7bd91f1] add new env
    1 file changed, 1 insertion(+)
    create mode 100644 env.txt


    $ git push origin dev
    To github.com:michaelliao/learngit.git
    ! [rejected]        dev -> dev (non-fast-forward)
    error: failed to push some refs to 'git@github.com:michaelliao/learngit.git'
    hint: Updates were rejected because the tip of your current branch is behind
    hint: its remote counterpart. Integrate the remote changes (e.g.
    hint: 'git pull ...') before pushing again.
    hint: See the 'Note about fast-forwards' in 'git push --help' for details.
 -->

- 推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git已经提示我们，先用git pull把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突，再推送：
<!-- 
    $ git pull
    There is no tracking information for the current branch.
    Please specify which branch you want to merge with.
    See git-pull(1) for details.
        git pull <remote> <branch>
    If you wish to set tracking information for this branch you can do so with:
        git branch --set-upstream-to=origin/<branch> dev
 -->


- git pull也失败了，原因是没有指定本地dev分支与远程origin/dev分支的链接，根据提示，设置dev和origin/dev的链接：
> git branch --set-upstream-to=origin/dev dev
<!-- 
    $ git branch --set-upstream-to=origin/dev dev
    Branch 'dev' set up to track remote branch 'dev' from 'origin'.
 -->

- 再pull：
<!-- 
    git pull
    Auto-merging env.txt
    CONFLICT (add/add): Merge conflict in env.txt
    Automatic merge failed; fix conflicts and then commit the result.
 -->

- 这回git pull成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样。解决后，提交，再push：


> pull数据时候的流程
- 总结：
<!-- 
    因此，多人协作的工作模式通常是这样：
    首先，可以试图用git push origin <branch-name>推送自己的修改；

    如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
    如果合并有冲突，则解决冲突，并在本地提交；

    没有冲突或者解决掉冲突后，再用git push origin <branch-name>推送就能成功！

    如果git pull提示no tracking information，
    则说明本地分支和远程分支的链接关系没有创建，
    
    用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。
    这就是多人协作的工作模式，一旦熟悉了，就非常简单。
 -->


- 查看远程库信息，使用git remote -v；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
- 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。


- 1. 先将远程仓库的项目 clone下来
- 2. 创建自己的dev分支 git checkout -b dev origin/dev
- 3. 如果push的时候有冲突 先拉取最新的文件 然后再push

---------------------------

### Rebase
- 在上一节我们看到了，多人在同一个分支上协作时，很容易出现冲突。即使没有冲突，后push的童鞋不得不先pull，在本地合并，然后才能push成功。

- 每次合并再push后，分支变成了这样：
<!-- 
    $ git log --graph --pretty=oneline --abbrev-commit
    * d1be385 (HEAD -> master, origin/master) init hello
    *   e5e69f1 Merge branch 'dev'
    |\  
    | *   57c53ab (origin/dev, dev) fix env conflict
    | |\  
    | | * 7a5e5dd add env
    | * | 7bd91f1 add new env
    | |/  
    * |   12a631b merged bug fix 101
    |\ \  
    | * | 4c805e2 fix bug 101
    |/ /  
    * |   e1e9c68 merge with no-ff
    |\ \  
    | |/  
    | * f52c633 add merge
    |/  
    *   cf810e4 conflict fixed
 -->

- 总之看上去很乱，有强迫症的童鞋会问：为什么Git的提交历史不能是一条干净的直线？
- 其实是可以做到的！ Git有一种称为rebase的操作，有人把它翻译成“变基”。

- 先不要随意展开想象。我们还是从实际问题出发，看看怎么把分叉的提交变成直线。
- 在和远程分支同步后，我们对hello.py这个文件做了两次提交。用git log命令看看：
<!-- 
    $ git log --graph --pretty=oneline --abbrev-commit
    * 582d922 (HEAD -> master) add author
    * 8875536 add comment
    * d1be385 (origin/master) init hello
    *   e5e69f1 Merge branch 'dev'
    |\  
    | *   57c53ab (origin/dev, dev) fix env conflict
    | |\  
    | | * 7a5e5dd add env
    | * | 7bd91f1 add new env
    ...
 -->

- 注意到Git用(HEAD -> master)和(origin/master)标识出当前分支的HEAD和远程origin的位置分别是582d922 add author和d1be385 init hello，本地分支比远程分支快两个提交。

- 现在我们尝试推送本地分支：
<!-- 
    $ git push origin master
    To github.com:michaelliao/learngit.git
    ! [rejected]        master -> master (fetch first)
    error: failed to push some refs to 'git@github.com:michaelliao/learngit.git'
    hint: Updates were rejected because the remote contains work that you do
    hint: not have locally. This is usually caused by another repository pushing
    hint: to the same ref. You may want to first integrate the remote changes
    hint: (e.g., 'git pull ...') before pushing again.
    hint: See the 'Note about fast-forwards' in 'git push --help' for details.
 -->

- 很不幸，失败了，这说明有人先于我们推送了远程分支。按照经验，先pull一下：
<!-- 
    $ git pull
    remote: Counting objects: 3, done.
    remote: Compressing objects: 100% (1/1), done.
    remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0
    Unpacking objects: 100% (3/3), done.
    From github.com:michaelliao/learngit
    d1be385..f005ed4  master     -> origin/master
    * [new tag]         v1.0       -> v1.0
    Auto-merging hello.py
    Merge made by the 'recursive' strategy.
    hello.py | 1 +
    1 file changed, 1 insertion(+)
 -->

- 再用git status看看状态：
<!-- 
    $ git status
    On branch master
    Your branch is ahead of 'origin/master' by 3 commits.
    (use "git push" to publish your local commits)
    nothing to commit, working tree clean
 -->

- 加上刚才合并的提交，现在我们本地分支比远程分支超前3个提交。
<!-- 
    用git log看看
    git log --graph --pretty=oneline --abbrev-commit
    *   e0ea545 (HEAD -> master) Merge branch 'master' of github.com:michaelliao/learngit
    |\  
    | * f005ed4 (origin/master) set exit=1
    * | 582d922 add author
    * | 8875536 add comment
    |/  
    * d1be385 init hello
 -->

- 对强迫症童鞋来说，现在事情有点不对头，提交历史分叉了。如果现在把本地分支push到远程，有没有问题？
- 有！ 什么问题？ 不好看！ 有没有解决方法？ 有！ 这个时候，rebase就派上了用场。我们输入命令git rebase试试：

> git rebase
- 
<!-- 
    First, rewinding head to replay your work on top of it...
    Applying: add comment
    Using index info to reconstruct a base tree...
    M	hello.py
    Falling back to patching base and 3-way merge...
    Auto-merging hello.py
    Applying: add author
    Using index info to reconstruct a base tree...
    M	hello.py
    Falling back to patching base and 3-way merge...
    Auto-merging hello.py
 -->

- 输出了一大堆操作，到底是啥效果？再用git log看看：
<!-- 
    git log --graph --pretty=oneline --abbrev-commit
    * 7e61ed4 (HEAD -> master) add author
    * 3611cfe add comment
    * f005ed4 (origin/master) set exit=1
    * d1be385 init hello
 -->

- 原本分叉的提交现在变成一条直线了！
- 这种神奇的操作是怎么实现的？其实原理非常简单。
- 我们注意观察，发现Git把我们本地的提交“挪动”了位置，放到了f005ed4 (origin/master) set exit=1之后，这样，整个提交历史就成了一条直线。rebase操作前后，最终的提交内容是一致的，但是，我们本地的commit修改内容已经变化了，它们的修改不再基于d1be385 init hello，而是基于f005ed4 (origin/master) set exit=1，但最后的提交7e61ed4内容是一致的。

- 这就是rebase操作的特点：把分叉的提交历史“整理”成一条直线，看上去更直观。缺点是本地的分叉提交已经被修改过了。
- 最后，通过push操作把本地分支推送到远程：
<!-- 
    Mac:~/learngit michael$ git push origin master
    Counting objects: 6, done.
    Delta compression using up to 4 threads.
    Compressing objects: 100% (5/5), done.
    Writing objects: 100% (6/6), 576 bytes | 576.00 KiB/s, done.
    Total 6 (delta 2), reused 0 (delta 0)
    remote: Resolving deltas: 100% (2/2), completed with 1 local object.
    To github.com:michaelliao/learngit.git
    f005ed4..7e61ed4  master -> master
 -->

- 再用git log看看效果：
<!-- 
    $ git log --graph --pretty=oneline --abbrev-commit
    * 7e61ed4 (HEAD -> master, origin/master) add author
    * 3611cfe add comment
    * f005ed4 set exit=1
    * d1be385 init hello
    ..
 -->

- rebase操作可以把本地未push的分叉提交历史整理成直线；
- rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

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



### Git开发总结

> SourceTree
- 1. 我们要去链接中复制 url 然后拿到ssh链接 在进行clone
- 2. 我们在 sourceTree 中 点击新规 然后 选择从clone url开始 克隆项目
- 3. 我们pull下来的东西里面只有 master 我们要在origin里面选择 一个我们想要的分支 然后选择右键 检出 这样我们本地才会有这个分支