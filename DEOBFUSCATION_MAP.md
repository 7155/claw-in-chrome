# 1.0.66_0 模块索引

本轮处理是“自动反混淆 + 人工入口标注”，目标是提升可读性，**不等于**
恢复原始源码工程结构。

## 核心文件

- `assets/sidepanel-BoLm9pmH.js`
  - 侧栏主界面入口。
  - 包含聊天 UI、模型选择、权限提示、OAuth 与供应商凭据刷新。
  - 本轮补了几个关键锚点：
    - `$Q(e = {})`：模型选择与粘性模型读取
    - `qQ`：会话输入 store
    - `t1`：权限弹窗 store
    - `auth.refresh_state`：凭据刷新与 sidepanel 首屏鉴权
    - `__cpModelBootstrap*`：模型首屏初始化去重

- `assets/service-worker.ts-H0DVM1LS.js`
  - 后台消息桥。
  - 负责 sidepanel 打开、权限通知、OAuth 刷新、MCP 权限回包等后台事件。

- `assets/PermissionManager-9s959502.js`
  - 权限模型、权限检查和 OAuth 辅助逻辑。
  - 和侧栏里的权限弹窗、权限提示串联较深。

- `assets/mcpPermissions-qqAoJjJ8.js`
  - 浏览器自动化工具与 MCP 权限流程。
  - 和标签页消息、权限确认、工具执行能力有关。

- `assets/useStorageState-hbwNMVUA.js`
  - 存储相关 hook 与状态同步。
  - 侧栏模型配置、用户配置、缓存状态会频繁经过这里。

- `assets/index-5uYI7rOK.js`
  - React 运行时与打包入口之一。
  - 控制台里看到的 React `#185` 多半会指到这里，但真正业务原因通常不在这里。

## 自定义供应商

- `custom-provider-models.js`
  - 统一拉取兼容供应商的 `/models`，并整理成可选模型列表。

- `custom-provider-settings.js`
  - `options.html` 对应的自定义供应商配置 UI。

- `sidepanel-inline-provider.js`
  - sidepanel 里的内联供应商配置 UI。

- `provider-format-adapter.js`
  - 供应商格式适配层。
  - 用来区分 OpenAI / Anthropic 兼容接口的字段与请求格式。

## 页面与壳层

- `sidepanel.html`
  - 侧栏页面入口，负责挂载主 bundle 和调试脚本。

- `options.html`
  - 设置页入口。

- `service-worker-loader.js`
  - 后台脚本加载壳。

## 后续人工整理建议

- 先继续拆 `assets/sidepanel-BoLm9pmH.js`
  - 可按“模型 / 权限 / 聊天初始化”三块继续做语义注释。

- 再处理 `assets/service-worker.ts-H0DVM1LS.js`
  - 适合把消息类型按“面板 / OAuth / 通知 / MCP”分类补注释。
