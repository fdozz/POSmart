"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";

const STORE_CODE = "POSMART-B12";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEmpPassword, setShowEmpPassword] = useState(false);
  const [showEmpConfirm, setShowEmpConfirm] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(STORE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: Regis image */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">
        <Image
          src="/login-register/regis.svg"
          alt="POSmart Register"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Logo badge */}
        <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF6B00] shadow-lg">
          <Image
            src="/icons/sidebar/logo.svg"
            alt="P"
            width={26}
            height={26}
            className="brightness-0 invert"
            style={{ objectFit: "none", objectPosition: "0 center" }}
          />
        </div>
      </div>

      {/* Right: Form Panel */}
      <div className="flex w-full items-start justify-center overflow-y-auto bg-[#F5F6FA] p-8 lg:w-1/2 lg:items-center">
        <div className="w-full max-w-[420px] py-8 lg:py-0">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/icons/sidebar/logo.svg"
              alt="POSmart"
              width={130}
              height={36}
              priority
            />
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Buat akun baru</h1>
            <p className="mt-1 text-sm text-gray-500">
              Daftarkan toko anda di POSmart
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Nama lengkap Anda"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Nama Bisnis
              </label>
              <input
                type="text"
                placeholder="Nama toko atau bisnis"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan email anda"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Ulangi password"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Accordion: Buat Password Karyawan */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <button
                type="button"
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-700">
                  Buat Password Karyawan
                </span>
                {accordionOpen ? (
                  <ChevronUp size={16} className="flex-shrink-0 text-gray-400" />
                ) : (
                  <ChevronDown size={16} className="flex-shrink-0 text-gray-400" />
                )}
              </button>

              {accordionOpen && (
                <div className="space-y-4 border-t border-gray-100 px-4 pb-4 pt-3">
                  <div className="rounded-lg bg-orange-50 px-3.5 py-3">
                    <p className="text-xs leading-relaxed text-orange-700">
                      Karyawan akan login menggunakan{" "}
                      <span className="font-semibold">kode toko</span> dan{" "}
                      <span className="font-semibold">password karyawan</span> ini.
                      Mereka hanya bisa mengakses POS, transaksi, dan data pelanggan.
                    </p>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Kode Toko
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={STORE_CODE}
                        readOnly
                        className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleCopy}
                        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-200
                          ${copied
                            ? "border-green-200 bg-green-50 text-green-600"
                            : "border-gray-200 bg-white text-gray-500 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                          }`}
                      >
                        {copied ? <Check size={15} /> : <Copy size={15} />}
                      </button>
                    </div>
                    <p className="mt-1.5 text-xs text-gray-400">
                      Bagikan kode ini kepada karyawan Anda
                    </p>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Password Karyawan
                    </label>
                    <div className="relative">
                      <input
                        type={showEmpPassword ? "text" : "password"}
                        placeholder="Minimal 6 karakter"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowEmpPassword(!showEmpPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showEmpPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Konfirmasi Password Karyawan
                    </label>
                    <div className="relative">
                      <input
                        type={showEmpConfirm ? "text" : "password"}
                        placeholder="Ulangi password karyawan"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowEmpConfirm(!showEmpConfirm)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showEmpConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-gray-300 accent-orange-500"
              />
              <span className="text-sm leading-relaxed text-gray-600">
                Saya setuju dengan{" "}
                <Link href="/terms" className="font-medium text-orange-500 hover:underline">
                  syarat &amp; ketentuan
                </Link>{" "}
                dan{" "}
                <Link href="/privacy" className="font-medium text-orange-500 hover:underline">
                  kebijakan privasi
                </Link>
              </span>
            </label>

            <button
              disabled={!agreed}
              onClick={() => agreed && router.push("/verify")}
              className="w-full rounded-xl bg-[#FF6B00] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#e85f00] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#FF6B00]"
            >
              Daftar Sekarang
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-orange-500 hover:underline"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
