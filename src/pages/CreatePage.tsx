import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Memorial, MemorialKind, MemorialSymbol } from "../app/types";
import { upsertMemorial } from "../app/storage";

function newId() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

const kindLabel: Record<MemorialKind, string> = {
  person: "亲人",
  event: "事件",
  relationship: "关系",
};

const symbolLabel: Record<MemorialSymbol, string> = {
  tree: "树",
  building: "建筑",
};

export default function CreatePage() {
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<MemorialKind>("person");
  const [symbol, setSymbol] = useState<MemorialSymbol>("tree");
  const [target, setTarget] = useState(60);
  const [note, setNote] = useState("");
  const [touched, setTouched] = useState(false);

  const titleError = useMemo(() => {
    if (!touched) return "";
    if (!title.trim()) return "请给它一个名字（必填）";
    if (title.trim().length > 24) return "名字太长了（建议 24 字以内）";
    return "";
  }, [title, touched]);

  function onSubmit() {
    setTouched(true);
    if (titleError) return;

    const now = new Date().toISOString();
    const m: Memorial = {
      id: newId(),
      title: title.trim(),
      kind,
      symbol,
      note: note.trim() ? note.trim() : undefined,
      target,
      progress: 0,
      status: "active",
      createdAt: now,
      updatedAt: now,
    };

    upsertMemorial(m);
    nav(`/repair/${m.id}`);
  }

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-md px-5 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">告别博物馆</h1>
          <p className="mt-2 text-sm text-zinc-400">
            创建一个“白膜”。用可控的积累，完成一次体面的告别。
          </p>
        </header>

        <div className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div>
            <label className="text-sm text-zinc-300">名字</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="例如：外婆 / 那段关系 / 2022 的夏天"
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-zinc-100 outline-none focus:border-zinc-600"
            />
            {titleError ? (
              <p className="mt-2 text-sm text-rose-400">{titleError}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-zinc-300">类型</label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as MemorialKind)}
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-3 outline-none focus:border-zinc-600"
              >
                {Object.entries(kindLabel).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-zinc-300">象征物</label>
              <select
                value={symbol}
                onChange={(e) => setSymbol(e.target.value as MemorialSymbol)}
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-3 outline-none focus:border-zinc-600"
              >
                {Object.entries(symbolLabel).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-300">修复目标次数</label>
              <span className="text-sm text-zinc-200">{target}</span>
            </div>
            <input
              type="range"
              min={10}
              max={200}
              step={5}
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="mt-3 w-full"
            />
            <p className="mt-2 text-xs text-zinc-400">建议 40–80。</p>
          </div>

          <div>
            <label className="text-sm text-zinc-300">备注（可选）</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="一句话就好。比如：想起时点一下。"
              className="mt-2 h-24 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 outline-none focus:border-zinc-600"
            />
          </div>

          <button
            onClick={onSubmit}
            className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-zinc-900 font-medium hover:bg-white active:opacity-90"
          >
            继续
          </button>

          <button
            onClick={() => nav("/museum")}
            className="w-full rounded-xl border border-zinc-800 px-4 py-3 text-zinc-200 hover:bg-zinc-900"
          >
            去看看博物馆
          </button>
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          注：这是一个轻量仪式工具，不替代任何专业帮助。
        </p>
      </div>
    </div>
  );
}