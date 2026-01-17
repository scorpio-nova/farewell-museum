export type MemorialKind = "person" | "event" | "relationship";
export type MemorialSymbol = "tree" | "building";
export type MemorialStatus = "active" | "archived" | "released";

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
};