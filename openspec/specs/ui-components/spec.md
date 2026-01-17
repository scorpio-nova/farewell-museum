## Purpose
Provide consistent UI styling by reusing the helpers and dependencies from `mindfulness-app-design` in this project.
## Requirements
### Requirement: UI 组件样式迁移
UI 组件库 SHALL 使用从 mindfulness-app-design 项目迁移的样式，同时保持原有的功能逻辑不变。

#### Scenario: 样式迁移完成
- **WHEN** UI 组件样式迁移完成
- **THEN** 所有组件的视觉表现应该与源项目一致，但功能逻辑保持不变

#### Scenario: 组件 API 保持不变
- **WHEN** 迁移后的组件被使用
- **THEN** 组件的 props 接口和 API 应该与迁移前保持一致

### Requirement: 工具函数支持
项目 SHALL 提供 `cn` 工具函数用于合并 Tailwind CSS 类名。

#### Scenario: cn 函数可用
- **WHEN** UI 组件需要使用 cn 函数
- **THEN** 可以从 `@/lib/utils` 正确导入并使用

### Requirement: 路径别名配置
项目 SHALL 配置路径别名以支持 `@/lib/utils` 等导入。

#### Scenario: 路径别名工作正常
- **WHEN** 组件文件使用 `@/lib/utils` 导入
- **THEN** TypeScript 和 Vite 都能正确解析路径

### Requirement: UI 组件视觉表现
UI 组件的视觉表现 SHALL 使用从 mindfulness-app-design 迁移的样式，提供更好的视觉效果。

#### Scenario: 指定组件替换
- **WHEN** `sidebar.tsx`, `sonner.tsx`, `toaster.tsx`, and `use-toast.ts` are replaced with their design counterparts
- **THEN** the components render the same styles as the design project while keeping existing props/behavior

