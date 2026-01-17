## 目标（Goals）
- 用户能创建一个“告别对象”（亲人/事件/关系），选择一个象征物（树/建筑），设定修复目标次数 $N$（默认 60）。
- 用户每次“想起”就点按一次：进度 +1，象征物更完整一点。
- 进度达到 $N$ 后，用户做二选一：**放下**（结束并归零/淡出）或 **存档**（进入博物馆展示，偶尔触发轻量问候文案）。

## 非目标（Non-goals）
- 不做深度对话、心理咨询、个性化疗愈承诺。
- 不做账号体系/云同步（MVP 仅 localStorage）。

## 页面（3 页）
### 2.1 /create 创建页（已完成基础版）
字段：
- title（必填，1–24 字）
- kind：person | event | relationship
- symbol：tree | building
- target：N（10–200，步进 5，默认 60）
- note（可选，一句话）
行为：
- 校验 title
- 创建 Memorial 并保存到 localStorage
- 跳转到 /repair/:id
验收（AC）：
- title 为空不可提交，提示错误
- 创建后 localStorage 里能找到该对象
- 能跳转到 /repair/:id 并正确读取
### 2.2 /repair/:id 打卡修复页（本次要实现）
展示：
- title、kind、symbol
- 进度：progress / target（例如 “12 / 60”）
- 视觉：象征物随进度变化（MVP：progress 越大，树叶越多 / 建筑块越完整）
- 文案：轻量提示（例：“想起时，点一下。”）
交互：
- 主交互：点击/按压“点按区” -> progress += 1
- 防误触：progress 达到 target 后，点击不再增加（只触发“完成弹窗”）
- 完成弹窗（二选一）：
  - 【放下】：
    - status = released
    - 记录 releasedAt
    - 展示一次“最后告别”文案（1–2 行）
    - 返回 /create（或 /museum 也可，MVP 任选其一但要固定）
  - 【存档】：
    - status = archived
    - 记录 archivedAt
    - progress 固定为 target
    - 跳转 /museum（或留在页内展示“已存档”状态）
验收（AC）：
- 能通过 URL 进入 /repair/:id 并展示正确对象
- 点击一次进度 +1，并持久化到 localStorage（刷新不丢）
- progress == target 后弹窗出现；两个按钮分别产生对应状态变更并持久化
- released 的对象不会出现在 museum 列表（只 archived 的出现）
### 2.3 /museum 博物馆展示页（本次要实现）
展示：
- 博物馆列表：status = archived 的对象
- 每个卡片包含：symbol 缩略、title、kind、archivedAt（或日期）
- 空状态：没有存档时显示引导（“先创建一个白膜” + 按钮回 /create）
交互：
- 点击卡片进入 /repair/:id（只读模式或展示“已存档”提示）
  - MVP 建议：repair 页如果 status=archived，则隐藏点按按钮/禁用点按
验收（AC）：
- museum 页能正确读取 archived 列表
- 空状态与返回创建按钮可用
- 点击卡片可进入 repair 详情页
- archived 对象不会被继续 +1（防止进度被改乱）

### 数据模型（localStorage）
Memorial:
- id: string
- title: string
- kind: "person" | "event" | "relationship"
- symbol: "tree" | "building"
- note?: string
- target: number
- progress: number
- status: "active" | "archived" | "released"
- createdAt: string (ISO)
- updatedAt: string (ISO)
- archivedAt?: string (ISO)
- releasedAt?: string (ISO)

## 4. 风格与文案约束（Tone）
- 克制、温柔、非治疗式。
- 必须包含免责声明（例如：这是一个轻量仪式工具，不替代任何专业帮助）。