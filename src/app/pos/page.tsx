"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { Search, X, Plus, Minus, Bell, FileText, QrCode, Banknote, Building2, CreditCard, CheckCircle2, ChevronLeft } from "lucide-react";
import { posProducts, categoryConfig, type Product, type ProductCategory } from "@/data/pos";

type CartItem = {
  cartId: string;
  product: Product;
  variant?: string;
  qty: number;
};

type ActiveCategory = "Semua" | ProductCategory;

const CATEGORIES: ActiveCategory[] = ["Semua", "Apparel", "Footwear", "Headwear", "Fan Gear"];
const TAX_RATE = 0.1;
const ORDER_ID = "#0000000011";

function formatRp(v: number) {
  return "Rp. " + v.toLocaleString("id-ID");
}

function todayLabel() {
  return new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("Semua");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [variantProduct, setVariantProduct] = useState<Product | null>(null);
  const [pickedVariant, setPickedVariant] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [cashInput, setCashInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return posProducts.filter((p) => {
      const matchCat = activeCategory === "Semua" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  function handleClickProduct(product: Product) {
    if (product.variants && product.variants.length > 0) {
      setVariantProduct(product);
      setPickedVariant("");
    } else {
      addToCart(product, undefined);
    }
  }

  function addToCart(product: Product, variant: string | undefined) {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.variant === variant
      );
      if (existing) {
        return prev.map((i) =>
          i.cartId === existing.cartId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        { cartId: `${product.id}-${variant ?? "nv"}-${Date.now()}`, product, variant, qty: 1 },
      ];
    });
    setVariantProduct(null);
    setPickedVariant("");
  }

  function updateQty(cartId: string, delta: number) {
    setCart((prev) =>
      prev
        .map((i) => (i.cartId === cartId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeItem(cartId: string) {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  }

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const tax      = Math.round(subtotal * TAX_RATE);
  const total    = subtotal + tax;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F6FA]">
      <Sidebar />

      <div className="ml-[72px] flex flex-1 overflow-hidden">
        {/* ── Left: Product catalog ── */}
        <div className="flex flex-1 flex-col overflow-hidden bg-white">

          {/* Top bar: store name LEFT | search CENTER | bell RIGHT */}
          <div className="flex flex-shrink-0 items-center gap-4 border-b border-gray-200 px-6 py-3.5">
            <div className="min-w-[160px]">
              <p className="text-[15px] font-bold text-gray-900">Toko Halimawan</p>
              <p className="text-[11px] text-gray-400">{todayLabel()}</p>
            </div>

            <div className="relative flex-1">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm placeholder:text-gray-400 outline-none focus:border-orange-300 focus:bg-white"
              />
            </div>

            <button className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500" />
            </button>
          </div>

          {/* Category tabs — underline style */}
          <div className="flex flex-shrink-0 items-center gap-0 border-b border-gray-200 px-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-3 text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "text-[#FF6B00]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#FF6B00]" />
                )}
              </button>
            ))}
          </div>

          {/* Product grid — 3 col of horizontal cards */}
          <div className="flex-1 overflow-y-auto p-5">
            {filtered.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-gray-400">
                <Search size={36} strokeWidth={1.5} className="mb-3 opacity-30" />
                <p className="text-sm font-medium">Produk tidak ditemukan</p>
                <p className="mt-1 text-xs">Coba kata kunci lain</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} onAdd={handleClickProduct} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Order panel ── */}
        <div className="flex w-[290px] flex-shrink-0 flex-col border-l border-gray-200 bg-white">

          {/* Header */}
          <div className="flex-shrink-0 border-b border-gray-100 px-5 py-4">
            <p className="text-base font-bold text-gray-900">Daftar Pesanan</p>
            <p className="mt-0.5 text-xs text-gray-400">{ORDER_ID}</p>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50">
                  <FileText size={28} strokeWidth={1.2} className="text-gray-300" />
                </div>
                <p className="text-sm font-semibold text-gray-500">Belum ada item</p>
                <p className="mt-1 text-xs text-gray-400">Pilih menu untuk memulai.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {cart.map((item) => (
                  <CartItemRow
                    key={item.cartId}
                    item={item}
                    onUpdateQty={(d) => updateQty(item.cartId, d)}
                    onRemove={() => removeItem(item.cartId)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-gray-100 p-5 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-700">{formatRp(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Pajak (10%)</span>
                <span className="text-gray-700">{formatRp(tax)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-2.5">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">{formatRp(total)}</span>
              </div>
            </div>

            <button
              disabled={cart.length === 0}
              onClick={() => cart.length > 0 && setShowPayment(true)}
              className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-colors ${
                cart.length === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#FF6B00] text-white hover:bg-[#E05E00]"
              }`}
            >
              Proses Pembayaran
            </button>

            <button
              onClick={() => setCart([])}
              className="w-full text-sm font-semibold text-[#FF6B00] transition-colors hover:text-[#E05E00]"
            >
              Batal
            </button>
          </div>
        </div>
      </div>

      {/* ── Payment modal ── */}
      {showPayment && !showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setShowPayment(false)} />
          <div className="relative w-full max-w-[420px] rounded-3xl bg-white shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
              <button onClick={() => setShowPayment(false)} className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100">
                <ChevronLeft size={18} />
              </button>
              <div className="flex-1">
                <p className="font-bold text-gray-900">Pembayaran</p>
                <p className="text-xs text-gray-400">{ORDER_ID}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Total</p>
                <p className="text-lg font-extrabold text-[#FF6B00]">{formatRp(total)}</p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Method selector */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">Metode Pembayaran</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "QRIS",     label: "QRIS",     Icon: QrCode,     bg: "bg-blue-50",   text: "text-blue-600",   border: "border-blue-300"   },
                    { id: "Tunai",    label: "Tunai",    Icon: Banknote,   bg: "bg-green-50",  text: "text-green-600",  border: "border-green-300"  },
                    { id: "Transfer", label: "Transfer", Icon: Building2,  bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-300" },
                    { id: "Kartu",    label: "Kartu",    Icon: CreditCard, bg: "bg-orange-50", text: "text-orange-500", border: "border-orange-300" },
                  ].map(m => (
                    <button key={m.id} onClick={() => { setPaymentMethod(m.id); setCashInput(""); }}
                      className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 py-3 transition-all ${
                        paymentMethod === m.id ? `${m.bg} ${m.border} ${m.text}` : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
                      }`}>
                      <m.Icon size={18} />
                      <span className="text-[10px] font-bold">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Method-specific content */}
              {paymentMethod === "QRIS" && (
                <div className="flex flex-col items-center">
                  <p className="mb-3 text-center text-xs text-gray-500">Scan kode QR ini dengan e-wallet atau mobile banking Anda</p>
                  <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 p-4">
                    <DummyQR size={180} />
                  </div>
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-600">
                    <QrCode size={15} />
                    {formatRp(total)}
                  </div>
                  <p className="mt-2 text-[11px] text-gray-400">GoPay · OVO · Dana · ShopeePay · BCA mobile · dan lainnya</p>
                </div>
              )}

              {paymentMethod === "Tunai" && (
                <div className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-600">Uang yang Diterima</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={cashInput}
                      onChange={e => setCashInput(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-lg font-bold text-gray-900 placeholder:text-gray-300 outline-none focus:border-orange-300"
                    />
                  </div>
                  {cashInput && parseInt(cashInput) >= total && (
                    <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">
                      <span className="text-sm font-semibold text-green-700">Kembalian</span>
                      <span className="text-lg font-extrabold text-green-600">{formatRp(parseInt(cashInput) - total)}</span>
                    </div>
                  )}
                  {cashInput && parseInt(cashInput) < total && (
                    <div className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3">
                      <span className="text-sm font-semibold text-red-600">Kurang</span>
                      <span className="text-lg font-extrabold text-red-500">{formatRp(total - parseInt(cashInput))}</span>
                    </div>
                  )}
                </div>
              )}

              {paymentMethod === "Transfer" && (
                <div className="rounded-2xl bg-purple-50 p-4 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-400">Rekening Tujuan</p>
                  <p className="text-base font-extrabold text-purple-700">BCA · 1234-5678-90</p>
                  <p className="text-sm font-semibold text-purple-600">a/n Toko Halimawan</p>
                  <div className="mt-2 rounded-xl bg-white px-3 py-2.5 text-center">
                    <p className="text-xs text-gray-500">Nominal Transfer</p>
                    <p className="text-lg font-extrabold text-gray-900">{formatRp(total)}</p>
                  </div>
                </div>
              )}

              {paymentMethod === "Kartu" && (
                <div className="flex flex-col items-center rounded-2xl bg-orange-50 p-6 text-center">
                  <CreditCard size={36} className="mb-3 text-orange-400" />
                  <p className="font-bold text-gray-800">Tempel atau Gesek Kartu</p>
                  <p className="mt-1 text-sm text-gray-500">Pada mesin EDC yang tersedia</p>
                  <p className="mt-3 text-xl font-extrabold text-orange-500">{formatRp(total)}</p>
                </div>
              )}

              {/* Confirm button */}
              <button
                onClick={() => setShowSuccess(true)}
                disabled={paymentMethod === "Tunai" && (!cashInput || parseInt(cashInput) < total)}
                className="w-full rounded-xl bg-[#FF6B00] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#E05E00] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Konfirmasi Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Success screen ── */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="relative w-full max-w-[360px] rounded-3xl bg-white p-8 shadow-2xl text-center">
            <div className="mb-5 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 size={40} className="text-green-500" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">Pembayaran Berhasil!</h2>
            <p className="mt-1 text-sm text-gray-500">Transaksi telah berhasil diproses</p>

            <div className="my-6 space-y-2 rounded-2xl bg-gray-50 p-4 text-sm text-left">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID</span>
                <span className="font-semibold text-gray-800">{ORDER_ID}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Metode</span>
                <span className="font-semibold text-gray-800">{paymentMethod}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2">
                <span className="font-bold text-gray-700">Total Dibayar</span>
                <span className="font-extrabold text-[#FF6B00]">{formatRp(total)}</span>
              </div>
            </div>

            <button
              onClick={() => { setCart([]); setShowPayment(false); setShowSuccess(false); setPaymentMethod("QRIS"); setCashInput(""); }}
              className="w-full rounded-xl bg-[#FF6B00] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#E05E00]"
            >
              Transaksi Baru
            </button>
            <button
              onClick={() => { setCart([]); setShowPayment(false); setShowSuccess(false); setPaymentMethod("QRIS"); setCashInput(""); }}
              className="mt-2.5 w-full text-sm font-semibold text-gray-400 hover:text-gray-600"
            >
              Kembali ke Kasir
            </button>
          </div>
        </div>
      )}

      {/* Variant picker modal */}
      {variantProduct && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setVariantProduct(null)}
          />
          <div className="relative w-full max-w-sm rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  {variantProduct.category}
                </p>
                <h3 className="mt-0.5 text-base font-bold text-gray-900">{variantProduct.name}</h3>
                <p className="mt-1 text-sm font-bold text-orange-500">{formatRp(variantProduct.price)}</p>
              </div>
              <button
                onClick={() => setVariantProduct(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>

            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              Pilih Ukuran
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
              {variantProduct.variants!.map((v) => (
                <button
                  key={v}
                  onClick={() => setPickedVariant(v)}
                  className={`min-w-[48px] rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
                    pickedVariant === v
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <button
              disabled={!pickedVariant}
              onClick={() => addToCart(variantProduct, pickedVariant)}
              className="w-full rounded-xl bg-[#FF6B00] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#E05E00] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Dummy QR Code ───────────────────────────────────────────────────────────

function DummyQR({ size = 160 }: { size?: number }) {
  const cells = 21;
  const cell = size / cells;

  function finderBlock(r: number, c: number, or_: number, oc: number) {
    const dr = r - or_, dc = c - oc;
    if (dr < 0 || dr > 6 || dc < 0 || dc > 6) return -1;
    if (dr === 0 || dr === 6 || dc === 0 || dc === 6) return 1;
    if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) return 1;
    return 0;
  }

  function getCell(r: number, c: number): number {
    const tl = finderBlock(r, c, 0, 0);
    if (tl !== -1) return tl;
    const tr = finderBlock(r, c, 0, 14);
    if (tr !== -1) return tr;
    const bl = finderBlock(r, c, 14, 0);
    if (bl !== -1) return bl;
    if (r === 6 || c === 6) return (r + c) % 2;
    return ((r * 3 + c * 7 + r * c * 2) % 5 < 2) ? 1 : 0;
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} fill="white" />
      {Array.from({ length: cells }, (_, r) =>
        Array.from({ length: cells }, (_, c) =>
          getCell(r, c) === 1 ? (
            <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#111827" />
          ) : null
        )
      )}
    </svg>
  );
}

// ─── Product Card (horizontal) ────────────────────────────────────────────────

function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  const cfg = categoryConfig[product.category];

  return (
    <div className="flex cursor-pointer items-center gap-3 overflow-hidden rounded-2xl bg-white p-3 shadow-sm transition-all hover:shadow-md"
      style={{ border: "1px solid #F3F4F6" }}>
      {/* Thumbnail */}
      <div
        className="flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center rounded-xl text-lg font-black"
        style={{
          background: `linear-gradient(135deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`,
          color: cfg.gradientFrom === "#FFF3E0" ? "#FB923C" : cfg.gradientFrom === "#E3F2FD" ? "#60A5FA" : cfg.gradientFrom === "#E8F5E9" ? "#4ADE80" : "#C084FC",
        }}
      >
        {cfg.abbr}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold leading-tight text-gray-900 line-clamp-2">{product.name}</p>
        <p className="mt-1 text-sm font-semibold text-gray-600">
          {"Rp. " + product.price.toLocaleString("id-ID")}
        </p>
        <button
          onClick={() => onAdd(product)}
          className="mt-2 w-full rounded-lg border border-orange-300 py-1 text-xs font-semibold text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
        >
          Tambah ke keranjang
        </button>
      </div>
    </div>
  );
}

// ─── Cart Item Row ────────────────────────────────────────────────────────────

function CartItemRow({
  item, onUpdateQty, onRemove,
}: {
  item: CartItem;
  onUpdateQty: (delta: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="px-5 py-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-800">{item.product.name}</p>
          {item.variant && (
            <span className="mt-0.5 inline-block rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
              {item.variant}
            </span>
          )}
        </div>
        <button onClick={onRemove} className="flex-shrink-0 text-gray-300 hover:text-red-400">
          <X size={14} />
        </button>
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQty(-1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500"
          >
            <Minus size={11} />
          </button>
          <span className="w-5 text-center text-sm font-bold text-gray-800">{item.qty}</span>
          <button
            onClick={() => onUpdateQty(1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500"
          >
            <Plus size={11} />
          </button>
        </div>
        <span className="text-sm font-bold text-gray-800">
          {"Rp. " + (item.product.price * item.qty).toLocaleString("id-ID")}
        </span>
      </div>
    </div>
  );
}
