# Change: 迁移 UI 样式从 mindfulness-app-design

## Why
当前项目的 UI 组件样式需要改进，而 `mindfulness-app-design` 项目中有设计良好的 UI 组件样式。我们希望将这些好看的样式迁移到当前项目中，同时保留原项目的业务逻辑和功能实现。

## What Changes
采用分阶段迁移策略，确保代码不出错、可反复修改：

**阶段 1：基础设施迁移（最安全）**
- 创建 `lib/utils.ts` 工具函数（如果不存在）
- 配置路径别名（`@/lib/utils`）在 `vite.config.ts` 和 `tsconfig.app.json` 中
- 安装必要的依赖（clsx, tailwind-merge）

**阶段 2：组件差异分析**
- 逐个比较两个项目的 UI 组件，生成差异报告
- 识别哪些组件只是样式差异（安全迁移）
- 识别哪些组件有逻辑差异（需要谨慎处理）

**阶段 3：迁移确定安全的组件**
- 先迁移那些明显只是样式差异的组件
- 保留当前项目的组件逻辑和功能实现
- 仅更新样式相关的代码（className、CSS 类、样式属性等）

**阶段 4：生成不确定组件的映射表**
- 列出有逻辑差异或不确定的组件
- 提供详细的对比信息供人工确认
- 等待确认后再进行迁移

**阶段 5：迁移剩余组件**
- 在确认后进行剩余组件的迁移
- 确保所有组件的 API 和 props 接口保持不变
- 验证迁移后的组件在现有页面中的使用不受影响

## Impact
- 受影响的能力：UI 组件库（ui-components）
- 受影响的代码：
  - `src/components/ui/*` - 所有 UI 组件文件的样式部分
  - `src/lib/utils.ts` - 可能需要创建（如果不存在）
  - `vite.config.ts` - 可能需要添加路径别名配置
  - `tsconfig.app.json` - 可能需要添加路径别名配置
  - 现有页面（CreatePage、RepairPage、MuseumPage）的视觉表现可能会改变，但功能逻辑保持不变