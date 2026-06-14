"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const MASKED_EMAIL = "***@gmail.com";

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  return (
    <div
      className="relative flex min-h-screen items-center justify-center p-4"
      style={{ backgroundImage: "url('/login-register/verif.svg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >

      {/* Modal Card */}
      <div className="relative w-full max-w-[400px] rounded-3xl bg-white p-8 shadow-2xl">
        {/* Close button */}
        <button
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label="Tutup"
        >
          <X size={17} />
        </button>

        {/* Logo icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
            <Image
              src="/icons/sidebar/logo.svg"
              alt="POSmart"
              width={40}
              height={40}
              style={{ width: "40px", height: "40px", maxWidth: "none", objectFit: "none", objectPosition: "left center" }}
            />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-gray-900">Verifikasi</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Masukkan kode verifikasi yang telah kami kirimkan ke email
          </p>
          <p className="mt-1.5 text-sm font-semibold text-gray-700">
            {MASKED_EMAIL}
          </p>
        </div>

        {/* OTP Input */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Kode Verifikasi
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="Masukkan kode 6 digit"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-center text-lg font-bold tracking-[0.5em] text-gray-900 placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 outline-none transition-all focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* CTA */}
        <button
          disabled={code.length < 6}
          onClick={() => code.length >= 6 && router.push("/dashboard")}
          className="w-full rounded-xl bg-[#FF6B00] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#e85f00] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#FF6B00]"
        >
          Verifikasi
        </button>

        {/* Resend */}
        <p className="mt-5 text-center text-sm text-gray-500">
          Tidak menerima kode?{" "}
          <Link
            href="#"
            className="font-semibold text-orange-500 hover:underline"
          >
            Kirim Ulang
          </Link>
        </p>
      </div>
    </div>
  );
}
