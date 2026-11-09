# 中行本地版 · iPhone 工程

目标设备：iPhone 13，iOS 18.7.1。最低系统版本：iOS 16。

本次使用现有仓库 `lihai132/xz`，分支 `master`。该仓库当前公开；工程不包含银行原始 IPA 或任何真实账户数据。

这是第一个可交互原型工程，不是已完成全部原版页面复刻的产品。它不含真实银行连接，没有登录和密码采集功能，页面没有固定“演示版”标识。

## 当前完成的内容

- 首页、账户、账户详情、收支明细和详情、预设收款人管理。
- 本地转账流程：金额校验、收款人选择、附言、确认/取消、更新虚拟余额和生成本地记录。
- 收入/支出和月份筛选，搜索，余额隐藏，本地保存和重置。
- 财富资产概览、信用卡空状态、生活服务入口、我的、消息、设置、关于。
- 扫码、付款码、贷款、外汇、真实缴费等功能只有说明/空状态，尚未实现原版业务流程。

共检查了 30 个页面入口，其中包括说明页和空状态页，不能理解为 30 个原版业务页面已还原。

## 技术形式与还原程度

使用 SwiftUI 启动的 WKWebView 原生容器，页面代码随 App 内置；这是可编译为 IPA 的混合 App，页面控件并非全部用 SwiftUI 编写。页面不从网站下载，网络请求由内容策略禁止，原生导航也限制为本地文件。

已检查用户提供 IPA 的资源清单，并静态查看部分首页、转账脚本和样式。本版界面为独立重建的初始原型，没有直接移植银行业务脚本，也没有取得银行完整原始工程。

尚未在真实 iPhone 或 iOS 模拟器上与原版逐屏比较，不能声称百分之百还原。轮播图、部分图标、布局和宣传内容仍为重建样式，需要原版截图/录屏来进一步校准。

## 不用 Mac 的打包方式

工程不需要 npm 依赖。云端通过 GitHub Actions 的 macOS 主机编译；用户无需购买 Mac。

1. 用 `lihai132` 账号在 GitHub 新建一个 **Private** 仓库，例如 `boc-local`。
2. 将本目录的内容上传到仓库根目录，包含 `.github/workflows/build-ios.yml`、`project.yml`、`App/` 和 `Web/`。不要只上传 ZIP 文件，也不要多套一层 BOCDemo 目录。
3. 上传到 `main` 分支后会自动开始编译；也可以打开 **Actions → Build iPhone IPA → Run workflow** 手动运行。
4. 等待任务完成，下载 Artifacts 中的 **BOCDemo-unsigned-IPA**，解压得到 `BOCDemo-unsigned.ipa`。
5. 该 IPA 尚未签名，不能直接点击安装。必须执行下面的本机签名步骤。

流程会联网安装 XcodeGen，并使用 GitHub 提供的 Xcode 编译。本次交付尚未在 GitHub 云端执行这个流程；首次运行仍需要检查编译日志。私有仓库的云端运行受 GitHub 账户可用额度和计费规则约束。

编译成功后通过 Actions Artifact 下载未签名 IPA，保留 7 天。`BuildAssets/icons.json`（如存在）只用于还原通过文本连接上传的图标。

## Windows 安装到 iPhone

1. 从 https://sideloadly.io/ 下载 Windows 版 Sideloadly，按其要求安装 Apple 设备驱动依赖。
2. 数据线连接 iPhone，解锁手机；如有提示，在手机上选择“信任此电脑”。
3. 打开 Sideloadly，选择该 iPhone，拖入 `BOCDemo-unsigned.ipa`。
4. 在本机工具中登录自己的 Apple 账号并完成验证，不要将密码、验证码或签名证书发到聊天里。
5. 点击 Start，等待签名和安装完成。
6. 如系统要求，在手机“设置 → 通用 → VPN 与设备管理”中信任用于签名的开发者；如提示需要开发者模式，按系统提示在“设置 → 隐私与安全性 → 开发者模式”启用并重启确认。
7. 点击桌面“中行本地版”图标打开。

免费 Apple 账号的签名一般 7 天有效，需重新签名/刷新；Sideloadly 提供自动刷新功能，需要电脑和设备连接条件满足。免费账号通常最多同时安装 3 个此类 App。保留相同签名账号和 Bundle ID 有助于更新覆盖，但重装前仍应考虑本地记录可能丢失。

## 文件说明

- `project.yml`：XcodeGen 工程定义。
- `App/BOCDemoApp.swift`：原生 App 入口、本地页面加载和导航限制。
- `App/Assets.xcassets`：图标。
- `Web/`：HTML、CSS 和本地交互逻辑。
- `.github/workflows/build-ios.yml`：编译设备版 App，打包未签名 IPA。
- `scripts/prepare_assets.py`：通过文本连接上传时还原图标；直接使用 PNG 源文件时无需还原。

Windows 可直接用浏览器打开 `Web/index.html` 预览页面。这只用于预览，并不替代最终 iPhone 原生安装。

## 已执行的验证

Windows 上分别使用 Chrome 和 Playwright WebKit 引擎检查：

- 390×844、3 倍像素的 iPhone 13 布局；模拟 47px 顶部和 34px 底部安全区域。
- 30 个入口渲染，无横向溢出。
- 空值、负数、零、超过两位小数、指数格式和余额不足校验。
- 确认/取消、按整数分精确扣减、单次生成记录。
- 附言文本转义、搜索、明细筛选、隐藏余额和重置。
- 重载后保存状态，本地 file:// 资源加载。
- 无应用脚本错误、无外部网络请求。

WebKit 检查是 Windows 桌面引擎检查，不代表 iOS 18.7.1 真机验证，也不代表 Xcode 已编译通过。原生编译、安装、手机键盘和实际安全区域仍需在下一阶段核对。

## 官方参考

- Sideloadly：https://sideloadly.io/faq
- GitHub macOS 构建主机：https://docs.github.com/en/actions/reference/runners/github-hosted-runners
- 中国银行 App Store：https://apps.apple.com/cn/app/id399608199

原银行 IPA 不包含在此工程中。请保留为个人本地原型用途。
