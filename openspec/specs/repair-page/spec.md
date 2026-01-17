# repair-page Specification

## Purpose
TBD - created by archiving change implement-repair-museum-pages. Update Purpose after archive.
## Requirements
### Requirement: 修复页面信息展示
修复页面 SHALL 展示纪念品的基本信息，包括标题（title）、类型（kind）和象征物（symbol）。

#### Scenario: 加载修复页面
- **WHEN** 用户访问 `/repair/:id` 路由
- **THEN** 页面显示该纪念品的 title、kind 和 symbol 信息

### Requirement: 进度显示
修复页面 SHALL 显示当前进度和目标进度，格式为 "progress / target"（例如 "12 / 60"）。

#### Scenario: 显示进度信息
- **WHEN** 修复页面加载
- **THEN** 页面显示当前 progress 值和 target 值，格式为 "progress / target"

### Requirement: 象征物视觉反馈
修复页面 SHALL 根据进度（progress）显示象征物的视觉状态变化。progress 越大，象征物越完整（例如：树有更多叶子，建筑有更多块）。

#### Scenario: 象征物随进度变化
- **WHEN** 纪念品的 progress 值增加
- **THEN** 象征物的视觉表现变得更完整（例如：树的叶子数量增加，建筑的块数增加）

### Requirement: 点按交互增加进度
修复页面 SHALL 提供点按交互区域，用户点击后 progress 值增加 1，并立即保存到 localStorage。

#### Scenario: 点击增加进度
- **WHEN** 用户点击点按区域
- **THEN** 该纪念品的 progress 值增加 1，并保存到 localStorage

#### Scenario: 刷新后进度保持
- **WHEN** 用户增加进度后刷新页面
- **THEN** 进度值保持不变（从 localStorage 读取）

### Requirement: 防误触机制
修复页面 SHALL 在 progress 达到或超过 target 后，禁止继续增加进度。此时点击点按区域不再增加 progress，而是触发完成弹窗。

#### Scenario: 进度达到目标后禁止增加
- **WHEN** progress >= target 时用户点击点按区域
- **THEN** progress 值不再增加，完成弹窗出现

### Requirement: 完成弹窗
修复页面 SHALL 在 progress 达到 target 时显示完成弹窗，提供两个选择：放下（Release）或存档（Archive）。

#### Scenario: 完成弹窗显示
- **WHEN** progress === target 时用户点击点按区域
- **THEN** 显示完成弹窗，包含"放下"和"存档"两个按钮

### Requirement: 放下功能
修复页面 SHALL 在用户选择"放下"时，将纪念品状态设置为 released，记录 releasedAt 时间戳，展示"最后告别"文案，并触发墓碑封印 CSS 动画。动画播放约 1200ms 后，自动导航到 `/create` 页面。

#### Scenario: 选择放下触发动画
- **WHEN** 用户在完成弹窗中选择"放下"
- **THEN** 纪念品 status 设置为 "released"，releasedAt 记录当前时间，显示"最后告别"文案，播放墓碑封印 CSS 动画

#### Scenario: 动画后导航
- **WHEN** 墓碑封印动画开始播放
- **THEN** 约 1200ms 后自动导航到 `/create` 页面

### Requirement: 存档功能
修复页面 SHALL 在用户选择"存档"时，将纪念品状态设置为 archived，记录 archivedAt 时间戳，将 progress 固定为 target，并跳转到 `/museum` 页面。

#### Scenario: 选择存档
- **WHEN** 用户在完成弹窗中选择"存档"
- **THEN** 纪念品 status 设置为 "archived"，archivedAt 记录当前时间，progress 设置为 target，跳转到 `/museum` 页面

### Requirement: 已归档纪念品只读模式
修复页面 SHALL 检测纪念品状态，如果 status === "archived"，则禁用点按功能，使页面处于只读模式。

#### Scenario: 已归档纪念品只读
- **WHEN** 用户访问 `/repair/:id` 且该纪念品 status === "archived"
- **THEN** 点按区域被禁用或隐藏，页面显示为只读模式，无法修改进度

