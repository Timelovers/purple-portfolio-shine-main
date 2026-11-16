# 设计演示（不会替换现有主页）

这是一份给评审看的独立预览，不是上线方案。合并前，现有主页、`/promptvault/` 和 `/career-coach/` 的行为都保持原样。

## 预览路径

本地开发：

```bash
npm install
npm run dev
```

浏览器打开：

- 设计演示：<http://localhost:8080/design-demo>
- 关于：<http://localhost:8080/design-demo/about>
- PromptVault 案例：<http://localhost:8080/design-demo/work/promptvault>
- AI 求职智航案例：<http://localhost:8080/design-demo/work/career-coach>

生产构建后：

```bash
npm run build
npm run preview
```

默认预览地址是 <http://localhost:4173/design-demo>。

## 怎么看

1. 先看 `/design-demo`。右侧（窄屏在文案下方）是四张作品卡片，鼠标移动时纸面会起涟漪，卡片会轻轻错位。
2. 点 PromptVault 或求职智航进入案例。案例里的「结构」可以切换分段。
3. 右上角可以切换深色，以及关掉动效。系统如果开了「减少动态效果」，演示会默认静止。
4. 「打开站内演示」会进入现有的 `/promptvault/` 或 `/career-coach/`，不是新做的应用。
5. 「现有主页」回到原来的 `/`。联系区只有原来的邮箱、X、GitHub 和简历 PDF，没有表单。

文案来自主页简介、项目卡片、文章，以及这两个应用已经写在仓库里的界面说明。没有补雇主、工期或人数。

## 压缩包

如果有 `lijiaxing-design-demo.zip`，解压后在该目录执行静态服务器（需要站点根路径，不要直接双击 `index.html`）：

```bash
npx serve .
```

然后打开 `/design-demo`。
