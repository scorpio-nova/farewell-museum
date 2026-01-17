import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getMemorial, upsertMemorial } from "../app/storage";
import type { Memorial, MemorialKind, MemorialSymbol } from "../app/types";

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

// 象征物视觉组件
function SymbolVisual({
  symbol,
  progress,
  target,
}: {
  symbol: MemorialSymbol;
  progress: number;
  target: number;
}) {
  const ratio = Math.min(progress / target, 1);
  const percentage = Math.round(ratio * 100);

  if (symbol === "tree") {
    // 树的视觉：根据进度显示不同数量的叶子
    const leafCount = Math.max(1, Math.round(ratio * 10));
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative" style={{ width: "120px", height: "120px" }}>
          {/* 树干 */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-16 bg-amber-800 rounded"></div>
          {/* 叶子 */}
          {Array.from({ length: leafCount }).map((_, i) => {
            const angle = (i / leafCount) * 360;
            const radius = 30 + (ratio * 20);
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            return (
              <div
                key={i}
                className="absolute w-4 h-4 bg-green-600 rounded-full"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            );
          })}
        </div>
        <p className="mt-4 text-sm text-zinc-400">{percentage}%</p>
      </div>
    );
  } else {
    // 建筑的视觉：根据进度显示不同数量的块
    const blockCount = Math.max(1, Math.round(ratio * 8));
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="flex flex-wrap gap-2 justify-center" style={{ width: "120px" }}>
          {Array.from({ length: blockCount }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 bg-stone-600 rounded"
              style={{
                opacity: 0.6 + (ratio * 0.4),
              }}
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-zinc-400">{percentage}%</p>
      </div>
    );
  }
}

export default function RepairPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const memorial = id ? getMemorial(id) : undefined;
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showTombstone, setShowTombstone] = useState(false);
  const [localMemorial, setLocalMemorial] = useState<Memorial | undefined>(memorial);

  // 同步 localStorage 数据
  useEffect(() => {
    if (id) {
      const m = getMemorial(id);
      setLocalMemorial(m);
    }
  }, [id]);

  if (!localMemorial) {
    return (
      <div className="min-h-dvh bg-zinc-950 text-zinc-100 px-5 py-10">
        <div className="mx-auto max-w-md">
          <h1 className="text-xl font-semibold">未找到</h1>
          <p className="mt-2 text-sm text-zinc-400">
            该对象可能尚未创建或已被删除
          </p>
          <div className="mt-6">
            <Link className="text-zinc-200 underline" to="/create">
              返回创建
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isReadOnly = localMemorial.status === "archived";
  const isCompleted = localMemorial.progress >= localMemorial.target;
  const canTap = !isReadOnly && !isCompleted;

  function handleTap() {
    if (!canTap || !localMemorial) return;

    const newProgress = localMemorial.progress + 1;
    const updated: Memorial = {
      ...localMemorial,
      progress: newProgress,
      updatedAt: new Date().toISOString(),
    };

    if (newProgress >= localMemorial.target) {
      // 达到目标，显示完成弹窗
      updated.progress = localMemorial.target;
      upsertMemorial(updated);
      setLocalMemorial(updated);
      setShowCompletionModal(true);
    } else {
      upsertMemorial(updated);
      setLocalMemorial(updated);
    }
  }

  function handleRelease() {
    if (!localMemorial) return;

    const updated: Memorial = {
      ...localMemorial,
      status: "released",
      releasedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    upsertMemorial(updated);
    setShowCompletionModal(false);
    setShowTombstone(true);

    // 约 1200ms 后导航到 /create
    setTimeout(() => {
      nav("/create");
    }, 1200);
  }

  function handleArchive() {
    if (!localMemorial) return;

    const updated: Memorial = {
      ...localMemorial,
      status: "archived",
      archivedAt: new Date().toISOString(),
      progress: localMemorial.target,
      updatedAt: new Date().toISOString(),
    };

    upsertMemorial(updated);
    setShowCompletionModal(false);
    nav("/museum");
  }

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100 px-5 py-10 relative overflow-hidden">
      {/* 墓碑封印动画覆盖层 */}
      {showTombstone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950">
          <div className="tombstone-seal">
            <div className="text-6xl mb-4">🪦</div>
            <p className="text-xl text-zinc-300">已放下</p>
            <p className="mt-2 text-sm text-zinc-500">愿一切安好</p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-md">
        {/* 头部信息 */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            {localMemorial.title}
          </h1>
          <div className="mt-2 flex gap-3 text-sm text-zinc-400">
            <span>{kindLabel[localMemorial.kind]}</span>
            <span>•</span>
            <span>{symbolLabel[localMemorial.symbol]}</span>
          </div>
        </header>

        {/* 进度显示 */}
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="text-center mb-4">
            <div className="text-3xl font-semibold">
              {localMemorial.progress} / {localMemorial.target}
            </div>
            <p className="mt-2 text-sm text-zinc-400">
              {isReadOnly
                ? "已存档"
                : isCompleted
                ? "已完成"
                : "想起时，点一下。"}
            </p>
          </div>

          {/* 象征物视觉 */}
          <SymbolVisual
            symbol={localMemorial.symbol}
            progress={localMemorial.progress}
            target={localMemorial.target}
          />
        </div>

        {/* 点按区域 */}
        {!isReadOnly && (
          <div className="mb-6">
            <button
              onClick={handleTap}
              disabled={!canTap}
              className={`w-full rounded-xl px-6 py-12 text-lg font-medium transition-all ${
                canTap
                  ? "bg-zinc-100 text-zinc-900 hover:bg-white active:scale-95"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
            >
              {isCompleted ? "已完成" : "点按"}
            </button>
          </div>
        )}

        {/* 备注显示 */}
        {localMemorial.note && (
          <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <p className="text-sm text-zinc-400">{localMemorial.note}</p>
          </div>
        )}

        {/* 导航链接 */}
        <div className="flex gap-3">
          <Link className="text-zinc-200 underline text-sm" to="/create">
            返回创建
          </Link>
          <Link className="text-zinc-200 underline text-sm" to="/museum">
            博物馆
          </Link>
        </div>
      </div>

      {/* 完成弹窗 */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-5">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold mb-2">完成了</h2>
            <p className="text-sm text-zinc-400 mb-6">
              你已经完成了 {localMemorial.target} 次修复。现在，你希望如何继续？
            </p>
            <div className="space-y-3">
              <button
                onClick={handleRelease}
                className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-zinc-900 font-medium hover:bg-white active:opacity-90"
              >
                放下
              </button>
              <button
                onClick={handleArchive}
                className="w-full rounded-xl border border-zinc-800 px-4 py-3 text-zinc-200 hover:bg-zinc-800"
              >
                存档到博物馆
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 墓碑封印动画 CSS */}
      <style>{`
        @keyframes tombstoneSeal {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .tombstone-seal {
          animation: tombstoneSeal 1.2s ease-out;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
