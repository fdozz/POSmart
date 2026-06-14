"use client";

import { useRouter } from "next/navigation";
import { PackagePlus, Boxes, UserPlus, Truck, Link2 } from "lucide-react";

const ACTIONS = [
  {
    id: "tambah-produk",
    label: "Tambah Produk",
    icon: PackagePlus,
    href: "/products",
    gradient: "linear-gradient(145deg, #FF6B00 0%, #FF9A3C 100%)",
    shadow: "shadow-orange-200",
  },
  {
    id: "kelola-stok",
    label: "Kelola Stok",
    icon: Boxes,
    href: "/products",
    gradient: "linear-gradient(145deg, #3B82F6 0%, #60A5FA 100%)",
    shadow: "shadow-blue-200",
  },
  {
    id: "tambah-pelanggan",
    label: "Tambah Pelanggan",
    icon: UserPlus,
    href: "/customers",
    gradient: "linear-gradient(145deg, #10B981 0%, #34D399 100%)",
    shadow: "shadow-green-200",
  },
  {
    id: "tambah-supplier",
    label: "Tambah Supplier",
    icon: Truck,
    href: "/suppliers",
    gradient: "linear-gradient(145deg, #EC4899 0%, #F472B6 100%)",
    shadow: "shadow-pink-200",
  },
  {
    id: "integrasi",
    label: "Integrasi",
    icon: Link2,
    href: "/settings",
    gradient: "linear-gradient(145deg, #F59E0B 0%, #FCD34D 100%)",
    shadow: "shadow-amber-200",
  },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <div className="rounded-[20px] bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-slate-700">Aksi Cepat</h3>
        <p className="mt-0.5 text-xs text-slate-400">Pintasan untuk tugas umum</p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => router.push(action.href)}
              className={`group flex flex-col items-center justify-center gap-4 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${action.shadow}`}
              style={{ background: action.gradient, minHeight: 140 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
                <Icon size={26} className="text-white" />
              </div>
              <span className="text-center text-xs font-semibold leading-tight text-white">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
