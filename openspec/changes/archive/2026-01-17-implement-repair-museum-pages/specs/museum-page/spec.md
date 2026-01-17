## ADDED Requirements
### Requirement: 博物馆列表展示
博物馆页面 SHALL 展示所有状态为 archived 的纪念品列表。

#### Scenario: 显示已归档纪念品
- **WHEN** 用户访问 `/museum` 页面
- **THEN** 页面显示所有 status === "archived" 的纪念品

#### Scenario: 不显示已释放的纪念品
- **WHEN** 用户访问 `/museum` 页面
- **THEN** status === "released" 的纪念品不显示在列表中

### Requirement: 纪念品卡片信息
博物馆页面的每个纪念品卡片 SHALL 显示以下信息：象征物（symbol）缩略图、标题（title）、类型（kind）和归档时间（archivedAt 或格式化日期）。

#### Scenario: 卡片信息展示
- **WHEN** 博物馆页面加载
- **THEN** 每个纪念品卡片显示 symbol 缩略、title、kind 和 archivedAt（或格式化日期）

### Requirement: 空状态处理
博物馆页面 SHALL 在没有已归档纪念品时显示空状态提示，并提供返回创建页面的按钮。

#### Scenario: 空状态显示
- **WHEN** 博物馆页面加载且没有 status === "archived" 的纪念品
- **THEN** 显示空状态提示（例如："先创建一个白膜"）和返回 `/create` 的按钮

### Requirement: 卡片点击导航
博物馆页面 SHALL 允许用户点击纪念品卡片，跳转到对应的修复页面（`/repair/:id`），该页面将以只读模式显示。

#### Scenario: 点击卡片进入修复页
- **WHEN** 用户在博物馆页面点击某个纪念品卡片
- **THEN** 导航到 `/repair/:id` 页面，该页面以只读模式显示（因为 status === "archived"）
