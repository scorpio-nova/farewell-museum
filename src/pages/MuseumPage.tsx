import { Link } from "react-router-dom";
import { loadMemorials } from "../app/storage";

export default function MuseumPage() {
  const items = loadMemorials().filter((m) => m.status === "archived");

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100 px-5 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="text-xl font-semibold">博物馆</h1>
        <p className="mt-2 text-sm text-zinc-400">当前存档：{items.length}</p>
        <div className="mt-6">
          <Link className="underline" to="/create">返回创建</Link>
        </div>
      </div>
    </div>
  );
}