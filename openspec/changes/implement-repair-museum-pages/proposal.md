# Change: 实现修复页和博物馆页

## Why
根据 `openspec/specs/mvp.md` 的要求，需要完成 `/repair/:id` 和 `/museum` 两个核心页面的实现。当前这两个页面只有基础框架，缺少完整的交互功能、视觉反馈和状态管理。

## What Changes
- 实现 `/repair/:id` 页面的完整功能：
  - 展示纪念品信息（title、kind、symbol）
  - 显示进度（progress / target）
  - 象征物视觉随进度变化
  - 点击点按区增加进度（progress += 1）
  - 进度达到 target 后显示完成弹窗（二选一：放下/存档）
  - 选择"放下"时触发墓碑封印 CSS 动画，约 1200ms 后导航到 `/create`
  - 选择"存档"时跳转到 `/museum`
  - 已归档（archived）的纪念品在修复页面为只读模式（禁用点按功能）
- 实现 `/museum` 页面的完整功能：
  - 展示所有 status = archived 的纪念品列表
  - 每个卡片显示 symbol 缩略、title、kind、archivedAt
  - 空状态提示和返回创建按钮
  - 点击卡片进入 `/repair/:id`（只读模式）
- 更新数据模型：在 `Memorial` 类型中添加 `archivedAt?: string` 和 `releasedAt?: string` 字段
- 更新存储逻辑：支持保存和读取这些新字段

## Impact
- 受影响的能力：repair-page、museum-page
- 受影响的代码：
  - `src/pages/RepairPage.tsx` - 完整重写
  - `src/pages/MuseumPage.tsx` - 完整重写
  - `src/app/types.ts` - 添加可选时间戳字段
  - `src/app/storage.ts` - 可能需要更新（但应该已经支持任意字段）
