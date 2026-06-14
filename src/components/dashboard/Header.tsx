import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="font-heading text-4xl font-bold text-slate-800">
          Dashboard Anda
        </h1>
        <p className="mt-1.5 text-base text-slate-500">
          Selamat datang, Yoga 👋
        </p>
      </div>

      <Link
        href="/pos"
        className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#E85F00]"
      >
        🛒 Buka Kasir
      </Link>
    </div>
  );
}
