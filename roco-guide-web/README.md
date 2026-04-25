# 洛克王国世界攻略 Web 应用

## 功能
- 📖 完整攻略查阅（六大章节）
- 🔍 全文搜索
- 📑 侧栏目录导航（可折叠跳转）
- 🌙 日夜主题切换（自动记忆）
- 💬 AI 对话助手（豆包 API）

## 快速使用

### 1. 打开页面
直接用浏览器打开 `index.html` 即可。

### 2. 配置 AI 对话（可选）
点击右上角 💬 图标 → 左下角「⚙️ API 设置」：
- **API Key**：在 火山引擎控制台 获取
- **API 地址**：默认 `https://ark.cn-beijing.volces.com/api/v3/chat/completions`
- **模型**：默认 `doubao-1.5-pro-32k`
- **🌐 公开 CORS 代理**：解决跨域问题（见下方）

## CORS 跨域问题解决方案

浏览器直接调用豆包 API 会被 CORS 拦截，报错 `Failed to fetch`。有三种解决方式：

### 方案一：使用公开 CORS 代理（最简单）
在「API 设置」的 **CORS 代理地址** 填入：
```
https://cors-anywhere.herokuapp.com/
```
⚠️ 首次使用需先访问 `https://cors-anywhere.herokuapp.com/` 点击 **Request temporary access**。

其他可用公开代理：
- `https://thingproxy.freeboard.io/fetch/`（无需申请，但可能不稳定）

### 方案二：部署到 Vercel（推荐，永久解决）
1. 把整个 `roco-guide-web` 文件夹推送到 GitHub
2. 打开 [vercel.com](https://vercel.com) → New Project → 导入仓库
3. 部署完成后，浏览器访问 Vercel 提供的域名
4. 在「API 设置」里 **留空** CORS 代理地址（同域名下无跨域问题）

### 方案三：使用内置代理（已准备好）
`api/chat.js` 是 Vercel Serverless Function 代理，部署后：
1. 部署到 Vercel（同上）
2. 在「API 设置」的 CORS 代理地址填入：`https://你的域名.vercel.app/api/chat`
3. 保存后即可使用，无需申请权限

## 文件说明
| 文件 | 说明 |
|------|------|
| `index.html` | 主页面 |
| `app.js` | 全部交互逻辑（搜索/导航/主题/AI对话） |
| `api/chat.js` | Vercel 代理函数（解决 CORS） |
| `vercel.json` | Vercel 部署配置 |
| `README.md` | 本文件 |

## 部署到 Vercel（三步）
```bash
# 1. 初始化 git 仓库（如果还没有）
cd roco-guide-web
git init
git add .
git commit -m "初始提交"

# 2. 推送到 GitHub（先在 GitHub 创建仓库）
git remote add origin https://github.com/你的用户名/roco-guide-web.git
git push -u origin main

# 3. 在 vercel.com 导入该仓库，点击 Deploy
```

部署完成后，把 Vercel 域名填入「CORS 代理地址」即可。
