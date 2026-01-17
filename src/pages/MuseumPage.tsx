import { Link, useNavigate } from "react-router-dom";
import { loadMemorials } from "../app/storage";
import type { MemorialKind, MemorialSymbol } from "../app/types";

const kindLabel: Record<MemorialKind, string> = {
  person: "亲人",
  event: "事件",
  relationship: "关系",
};

const symbolLabel: Record<MemorialSymbol, string> = {
  tree: "树",
  building: "建筑",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

// 象征物缩略图组件
function SymbolThumbnail({ symbol }: { symbol: MemorialSymbol }) {
  if (symbol === "tree") {
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-green-900/30 rounded-lg">
        <span className="text-2xl">🌳</span>
      </div>
    );
  } else {
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-stone-900/30 rounded-lg">
        <span className="text-2xl">🏛️</span>
      </div>
    );
  }
}

// 纪念品卡片组件
function MemorialCard({ memorial }: { memorial: ReturnType<typeof loadMemorials>[0] }) {
  const nav = useNavigate();

  return (
    <button
      onClick={() => nav(`/repair/${memorial.id}`)}
      className="w-full text-left rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:bg-zinc-900/60 transition-colors"
    >
      <div className="flex gap-4">
        <SymbolThumbnail symbol={memorial.symbol} />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-zinc-100 truncate">{memorial.title}</h3>
          <div className="mt-1 flex gap-2 text-xs text-zinc-400">
            <span>{kindLabel[memorial.kind]}</span>
            <span>•</span>
            <span>{symbolLabel[memorial.symbol]}</span>
          </div>
          {memorial.archivedAt && (
            <p className="mt-2 text-xs text-zinc-500">
              归档于 {formatDate(memorial.archivedAt)}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export default function MuseumPage() {
  const items = loadMemorials().filter((m) => m.status === "archived");

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100 px-5 py-10">
      <div className="mx-auto max-w-md">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">博物馆</h1>
          <p className="mt-2 text-sm text-zinc-400">
            这里保存着你已完成的告别仪式
          </p>
        </header>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center">
            <p className="text-zinc-400 mb-6">还没有存档的纪念品</p>
            <p className="text-sm text-zinc-500 mb-6">
              先创建一个白膜，完成修复后选择"存档到博物馆"
            </p>
            <Link
              to="/create"
              className="inline-block rounded-xl bg-zinc-100 px-6 py-3 text-zinc-900 font-medium hover:bg-white active:opacity-90"
            >
              返回创建
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <MemorialCard key={item.id} memorial={item} />
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link
            to="/create"
            className="text-zinc-200 underline text-sm"
          >
            返回创建
          </Link>
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          注：这是一个轻量仪式工具，不替代任何专业帮助。
        </p>
      </div>
    </div>
  );
}
