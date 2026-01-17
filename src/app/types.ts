export type MemorialKind = "person" | "event" | "relationship";
export type MemorialSymbol = "tree" | "building";
export type MemorialStatus = "active" | "archived" | "released";

export type ProgressMessage = {
  progress: number; // 打卡次数节点
  content: string; // 留言内容
  createdAt: string; // ISO 时间戳
};

export type Memorial = {
  id: string;
  title: string;
  kind: MemorialKind;
  symbol: MemorialSymbol;
  note?: string;
  target: number;
  progress: number;
  status: MemorialStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  archivedAt?: string; // ISO
  releasedAt?: string; // ISO
  messages?: ProgressMessage[]; // 留言记录
};