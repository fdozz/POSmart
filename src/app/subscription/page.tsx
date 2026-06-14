"use client";

import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Check, CreditCard, Zap, Phone, Star, X } from "lucide-react";

const FEATURES = [
  "5 Kasir",
  "Unlimited Produk",
  "Advanced Analytics",
  "Priority Support",
  "Integrasi Payment",
  "WhatsApp Notifications",
];

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    priceLabel: "Gratis",
    unit: "/bulan",
    desc: "Untuk bisnis kecil yang baru mulai",
    features: ["1 Kasir", "50 Produk", "Email Support"],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "business",
    name: "Business",
    priceLabel: "Rp 299K",
    unit: "/bulan",
    desc: "Untuk bisnis yang sedang berkembang",
    features: ["5 Kasir", "Unlimited Produk", "Advanced Analytics", "Priority Support", "Integrasi Payment", "WhatsApp Notifications"],
    cta: "Get Started",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceLabel: "Rp 599K",
    unit: "/bulan",
    desc: "Untuk jaringan toko skala besar",
    features: ["Semua fitur Business", "Unlimited Kasir", "Multi-Outlet Support", "24/7 Support", "API Access", "Custom Role"],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function SubscriptionPage() {
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Subscription &amp; Billing</h1>
        <p className="mt-0.5 text-sm text-gray-500">Manage your subscription plan and billing details</p>
      </div>

      {/* Current Plan card */}
      <div className="rounded-[20px] bg-white p-7 shadow-sm">
        {/* Top row: plan name + price */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Current Plan: Business</h2>
            <p className="mt-1 text-sm text-gray-400">Your subscription renews on July 1, 2026</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold text-[#FF6B00]">Rp 299K</p>
            <p className="text-xs text-gray-400 mt-0.5">per bulan</p>
          </div>
        </div>

        {/* Features + payment side by side */}
        <div className="flex gap-8">
          {/* Included Features */}
          <div className="flex-1">
            <p className="mb-4 text-sm font-semibold text-gray-700">Included Features</p>
            <div className="space-y-2.5">
              {FEATURES.map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <Check size={15} strokeWidth={2.5} className="flex-shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="w-[340px] flex-shrink-0">
            <p className="mb-4 text-sm font-semibold text-gray-700">Payment Method</p>
            <div className="rounded-2xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-12 items-center justify-center rounded-xl bg-blue-500">
                  <CreditCard size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 tracking-widest">•••••••••• 4242</p>
                  <p className="text-xs text-gray-400 mt-0.5">Expires 12/27</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-7 flex items-center gap-3">
          <button
            onClick={() => setShowUpgrade(true)}
            className="flex items-center gap-2 rounded-full bg-[#FF6B00] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E05E00]"
          >
            Upgrade Plan
          </button>
          <button className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50">
            Update Payment Method
          </button>
        </div>
      </div>

      {/* Upgrade Plan modal */}
      {showUpgrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={() => setShowUpgrade(false)} />
          <div className="relative w-full max-w-[800px] rounded-[24px] bg-white p-8 shadow-2xl">
            {/* Modal header */}
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">Pilih Paket yang Tepat</h3>
                <p className="mt-1 text-sm text-gray-400">Mulai dari gratis, scale sesuai kebutuhan bisnis Anda</p>
              </div>
              <button onClick={() => setShowUpgrade(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100">
                <X size={16} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-5">
              {PLANS.map(plan => {
                const isCurrent = plan.id === "business";
                return (
                  <div key={plan.id}
                    className={`relative flex flex-col rounded-[20px] border-2 p-6 ${
                      plan.popular ? "border-[#FF6B00] shadow-md shadow-orange-100" : "border-gray-200"
                    }`}>
                    {plan.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="rounded-full bg-[#FF6B00] px-4 py-1 text-[11px] font-bold text-white shadow-sm whitespace-nowrap">
                          Most Populer
                        </span>
                      </div>
                    )}

                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{plan.name}</p>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-gray-900">{plan.priceLabel}</span>
                      <span className="text-sm text-gray-400">{plan.unit}</span>
                    </div>
                    <p className="mt-1 mb-5 text-xs text-gray-400">{plan.desc}</p>

                    <div className="flex-1 space-y-2.5 mb-6">
                      {plan.features.map(f => (
                        <div key={f} className="flex items-start gap-2">
                          <Check size={13} strokeWidth={3}
                            className={`mt-0.5 flex-shrink-0 ${plan.popular ? "text-[#FF6B00]" : "text-green-500"}`} />
                          <span className="text-sm text-gray-600">{f}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowUpgrade(false)}
                      className={`w-full rounded-xl py-3 text-sm font-bold transition-colors ${
                        isCurrent
                          ? "bg-orange-100 text-orange-500 cursor-default"
                          : plan.popular
                            ? "bg-[#FF6B00] text-white hover:bg-[#E05E00]"
                            : plan.cta === "Contact Sales"
                              ? "border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                              : "border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {isCurrent ? (
                        <span className="flex items-center justify-center gap-1.5"><Star size={13} /> Paket Aktif</span>
                      ) : plan.cta === "Contact Sales" ? (
                        <span className="flex items-center justify-center gap-1.5"><Phone size={13} /> Contact Sales</span>
                      ) : (
                        <span className="flex items-center justify-center gap-1.5"><Zap size={13} /> Get Started</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
