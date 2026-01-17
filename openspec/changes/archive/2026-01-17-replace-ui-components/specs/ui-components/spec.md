## MODIFIED Requirements
### Requirement: UI 组件视觉表现
UI 组件的视觉表现 SHALL 使用从 mindfulness-app-design 迁移的样式，提供更好的视觉效果。

#### Scenario: 指定组件替换
- **WHEN** `sidebar.tsx`, `sonner.tsx`, `toaster.tsx`, and `use-toast.ts` are replaced with their design counterparts
- **THEN** the components render the same styles as the design project while keeping existing props/behavior
