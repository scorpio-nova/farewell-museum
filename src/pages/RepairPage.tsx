import { useParams, Link } from "react-router-dom";
import { getMemorial } from "../app/storage";

export default function RepairPage() {
  const { id } = useParams();
  const m = id ? getMemorial(id) : undefined;

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100 px-5 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="text-xl font-semibold">修复</h1>
        <p className="mt-2 text-sm text-zinc-400">
          {m ? `对象：${m.title}` : "未找到该对象（可能尚未创建）"}
        </p>
        <div className="mt-6 flex gap-3">
          <Link className="text-zinc-200 underline" to="/create">
            返回创建
          </Link>
          <Link className="text-zinc-200 underline" to="/museum">
            博物馆
          </Link>
        </div>
      </div>
    </div>
  );
}