## 1. 数据模型更新
- [x] 1.1 在 `src/app/types.ts` 的 `Memorial` 类型中添加 `archivedAt?: string` 和 `releasedAt?: string` 字段

## 2. 修复页面实现
- [x] 2.1 实现纪念品信息展示（title、kind、symbol）
- [x] 2.2 实现进度显示（progress / target）
- [x] 2.3 实现象征物视觉反馈（根据 progress 显示不同状态）
- [x] 2.4 实现点按交互（点击增加 progress，保存到 localStorage）
- [x] 2.5 实现防误触逻辑（progress >= target 时不再增加）
- [x] 2.6 实现完成弹窗（progress === target 时显示）
- [x] 2.7 实现"放下"功能（设置 status = released，记录 releasedAt，触发墓碑封印动画）
- [x] 2.8 实现墓碑封印 CSS 动画（约 1200ms 后导航到 /create）
- [x] 2.9 实现"存档"功能（设置 status = archived，记录 archivedAt，progress = target，跳转到 /museum）
- [x] 2.10 实现只读模式检测（status === "archived" 时禁用点按功能）

## 3. 博物馆页面实现
- [x] 3.1 实现纪念品列表展示（仅显示 status === "archived" 的项）
- [x] 3.2 实现卡片组件（显示 symbol 缩略、title、kind、archivedAt）
- [x] 3.3 实现空状态提示和返回创建按钮
- [x] 3.4 实现卡片点击跳转到 `/repair/:id`

## 4. 验收测试
- [x] 4.1 验证修复页面能正确加载和显示纪念品信息
- [x] 4.2 验证点击点按区能增加进度并持久化
- [x] 4.3 验证完成弹窗在进度达到 target 时出现
- [x] 4.4 验证"放下"功能触发动画并导航到 /create
- [x] 4.5 验证"存档"功能正确设置状态并跳转到 /museum
- [x] 4.6 验证已归档纪念品在修复页面为只读
- [x] 4.7 验证博物馆页面正确显示已归档列表
- [x] 4.8 验证空状态和导航功能正常
