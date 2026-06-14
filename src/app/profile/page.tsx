"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  RefreshCw, Calendar, Users, ChevronRight,
  LogOut, Pencil, Mail, Phone, Lock, Globe,
  Shield, ShieldCheck, Monitor, Smartphone,
  AlertTriangle, Bell, FileText,
} from "lucide-react";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 ${on ? "bg-[#FF6B00]" : "bg-gray-200"}`}>
      <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${on ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

export default function ProfilePage() {
  const [name, setName]           = useState("Luthfi Halimawan");
  const [email, setEmail]         = useState("chiefv@gmail.com");
  const [phone, setPhone]         = useState("+62 812 3456 7890");
  const [birthdate, setBirthdate] = useState("");
  const [bio, setBio]             = useState("");
  const [lang, setLang]           = useState("");
  const [tz, setTz]               = useState("");

  const [notifTx, setNotifTx]         = useState(true);
  const [notifStock, setNotifStock]   = useState(true);
  const [notifReport, setNotifReport] = useState(false);

  const [twoFA, setTwoFA] = useState(false);
  const securityScore = twoFA ? 88 : 72;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Profil Saya</h1>
        <p className="mt-0.5 text-sm text-gray-500">Kelola informasi pribadi dan preferensi akun Anda</p>
      </div>

      <div className="flex items-start gap-5">

        {/* ── Left panel ── */}
        <div className="w-[188px] flex-shrink-0 rounded-[20px] bg-white p-5 shadow-sm">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative h-[72px] w-[72px] rounded-full bg-gray-800 flex items-center justify-center shadow-md">
              <span className="text-xl font-bold text-white select-none">LH</span>
              <button className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6B00] border-2 border-white">
                <Pencil size={9} className="text-white" />
              </button>
            </div>
            <p className="mt-2 text-sm font-bold text-gray-900 text-center">{name}</p>
            <p className="text-xs text-gray-500">Pemilik Toko</p>
            <span className="mt-1 flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-bold text-orange-600">
              🏆 Owner
            </span>
          </div>

          {/* Stats */}
          <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2.5">
              <RefreshCw size={13} className="flex-shrink-0 text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400">Transaksi</p>
                <p className="text-sm font-bold text-gray-900">1.284</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar size={13} className="flex-shrink-0 text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400">Bergabung</p>
                <p className="text-sm font-bold text-gray-900">26 Mar 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Users size={13} className="flex-shrink-0 text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400">Tim</p>
                <p className="text-sm font-bold text-gray-900">7</p>
              </div>
            </div>
          </div>

          {/* Pintasan */}
          <div className="mt-4 border-t border-gray-100 pt-4">
            <p className="mb-2 text-xs font-semibold text-gray-700">Pintasan</p>
            <div className="space-y-0.5">
              {[
                { label: "Buka POS Kasir",  href: "/pos" },
                { label: "Lihat Transaksi", href: "/transactions" },
                { label: "Pengaturan Toko", href: "/settings" },
                { label: "Kelola Tim",      href: "/team" },
              ].map(s => (
                <Link key={s.href + s.label} href={s.href}
                  className="flex items-center justify-between rounded-xl px-2 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#FF6B00]">
                  {s.label}
                  <ChevronRight size={13} className="text-gray-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Keluar Akun */}
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50">
            <LogOut size={13} />
            Keluar Akun
          </button>
        </div>

        {/* ── Center content ── */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* Informasi Umum */}
          <div className="rounded-[20px] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-sm font-bold text-gray-900">Informasi Umum</p>
                <p className="text-xs text-gray-400 mt-0.5">Perbarui detail profil Anda</p>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#FF6B00] transition-colors">
                <Pencil size={11} />
                Edit
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">Nama Lengkap</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-orange-300 transition-colors" />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">Jabatan</label>
                <input defaultValue="Pemilik Toko" readOnly
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-500 outline-none cursor-not-allowed" />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</label>
                <div className="relative">
                  <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3.5 text-sm text-gray-900 outline-none focus:border-orange-300 transition-colors" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">No. HP</label>
                <div className="relative">
                  <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3.5 text-sm text-gray-900 outline-none focus:border-orange-300 transition-colors" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">Tanggal Lahir</label>
                <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-orange-300 transition-colors" />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">Kata Sandi</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="password" defaultValue="•••••••••" readOnly
                      className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3.5 text-sm text-gray-900 outline-none tracking-widest" />
                  </div>
                  <button className="flex-shrink-0 rounded-xl bg-[#FF6B00] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#E05E00] transition-colors">
                    Ubah
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">Bio</label>
              <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)}
                placeholder=""
                className="w-full resize-none rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-orange-300 transition-colors" />
            </div>

            <div className="mt-4 flex justify-end">
              <button className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#E05E00]">
                Simpan Perubahan
              </button>
            </div>
          </div>

          {/* Preferensi + Notifikasi — same card */}
          <div className="rounded-[20px] bg-white p-6 shadow-sm">
            {/* Preferensi */}
            <p className="mb-4 text-sm font-bold text-gray-900">Preferensi</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">Bahasa</label>
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-2.5">
                  <Globe size={13} className="flex-shrink-0 text-gray-400" />
                  <select value={lang} onChange={e => setLang(e.target.value)}
                    className="flex-1 text-sm text-gray-900 outline-none bg-transparent">
                    <option value="">Pilih bahasa...</option>
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">Zona Waktu</label>
                <select value={tz} onChange={e => setTz(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-orange-300 bg-white">
                  <option value="">Pilih zona waktu...</option>
                  <option>WIB (UTC+7)</option>
                  <option>WITA (UTC+8)</option>
                  <option>WIT (UTC+9)</option>
                </select>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <p className="mb-4 text-sm font-bold text-gray-900">Notifikasi</p>
              <div className="space-y-3">
                {([
                  {
                    Icon: Bell,
                    label: "Notifikasi Transaksi Baru",
                    desc: "Terima pemberitahuan setiap ada transaksi",
                    on: notifTx, set: setNotifTx,
                  },
                  {
                    Icon: AlertTriangle,
                    label: "Peringatan Stok Rendah",
                    desc: "Notifikasi saat stok produk di bawah batas",
                    on: notifStock, set: setNotifStock,
                  },
                  {
                    Icon: FileText,
                    label: "Laporan Harian Otomatis",
                    desc: "Kirim ringkasan penjualan setiap hari",
                    on: notifReport, set: setNotifReport,
                  },
                ] as { Icon: React.ElementType; label: string; desc: string; on: boolean; set: (v: boolean) => void }[]).map(n => (
                  <div key={n.label} className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <n.Icon size={15} className="flex-shrink-0 text-gray-400" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{n.label}</p>
                        <p className="text-xs text-gray-400">{n.desc}</p>
                      </div>
                    </div>
                    <Toggle on={n.on} onToggle={() => n.set(!n.on)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="w-[220px] flex-shrink-0 space-y-4">

          {/* Keamanan Akun */}
          <div className="rounded-[20px] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-100">
                <ShieldCheck size={14} className="text-[#FF6B00]" />
              </div>
              <p className="text-sm font-bold text-gray-900">Keamanan Akun</p>
            </div>
            <p className="mb-4 text-xs text-gray-400">Kelola keamanan akun Anda</p>

            {/* Score */}
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-700">Skor Keamanan</p>
              <span className="text-xs font-bold text-orange-500">{securityScore}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 mb-1.5">
              <div className="h-2 rounded-full bg-[#FF6B00] transition-all duration-500" style={{ width: `${securityScore}%` }} />
            </div>
            <p className="mb-5 text-[11px] text-gray-400">Aktifkan 2FA untuk meningkatkan keamanan</p>

            {/* Security rows */}
            <div className="space-y-3">
              {/* Kata Sandi */}
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <Lock size={11} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-800">Kata Sandi</p>
                    <button className="flex items-center gap-0.5 text-[11px] font-bold text-[#FF6B00] hover:underline">
                      Ubah <ChevronRight size={10} />
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400">Terakhir diubah 30 hari lalu</p>
                </div>
              </div>

              {/* 2FA */}
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <Shield size={11} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-800">Verifikasi 2 Langkah</p>
                    <Toggle on={twoFA} onToggle={() => setTwoFA(p => !p)} />
                  </div>
                  <p className="text-[11px] text-gray-400">{twoFA ? "Aktif" : "Nonaktif"}</p>
                </div>
              </div>

              {/* Sesi Aktif */}
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <Monitor size={11} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-800">Sesi Aktif</p>
                    <button className="flex items-center gap-0.5 text-[11px] font-bold text-[#FF6B00] hover:underline">
                      Kelola <ChevronRight size={10} />
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400">2 perangkat aktif</p>
                </div>
              </div>

              {/* Riwayat Aktivitas */}
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <ShieldCheck size={11} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-800">Riwayat Aktivitas</p>
                    <button className="flex items-center gap-0.5 text-[11px] font-bold text-[#FF6B00] hover:underline">
                      Lihat <ChevronRight size={10} />
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400">Login terakhir hari ini 08:32</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sesi Aktif */}
          <div className="rounded-[20px] bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-gray-900">Sesi Aktif</p>
            <p className="mt-0.5 mb-4 text-xs text-gray-400">2 perangkat login</p>

            <div className="space-y-3">
              {/* Chrome */}
              <div className="flex items-start gap-2.5 rounded-xl bg-gray-50 p-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  <Monitor size={13} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Chrome / Windows 11</p>
                  <p className="text-[11px] text-gray-400">Jakarta, Indonesia</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-green-500">● Aktif sekarang</p>
                </div>
              </div>

              {/* Safari */}
              <div className="flex items-start gap-2.5 rounded-xl bg-gray-50 p-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-gray-200">
                  <Smartphone size={13} className="text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <p className="text-xs font-bold text-gray-900">Safari / iPhone 14</p>
                    <button className="flex-shrink-0 rounded-lg bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-500 hover:bg-red-100 transition-colors">
                      Cabut
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400">Bandung, Indonesia</p>
                  <p className="text-[11px] text-gray-400">2 jam lalu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
