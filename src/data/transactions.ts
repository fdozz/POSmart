export type TransactionStatus = "Sukses" | "Pending" | "Batal";
export type PaymentMethod    = "Tunai" | "Transfer" | "QRIS" | "Kartu";

export type TransactionItem = {
  name: string;
  qty: number;
  price: number;
};

export type Transaction = {
  id: string;
  date: string;
  customer: string;
  cashier: string;
  itemCount: number;
  items: TransactionItem[];
  subtotal: number;
  tax: number;
  total: number;
  method: PaymentMethod;
  status: TransactionStatus;
};

export const mockTransactions: Transaction[] = [
  {
    id: "TRX-0023", date: "13 Jun 2026, 15:42", customer: "Rina Kusuma", cashier: "Yoga",
    itemCount: 3,
    items: [
      { name: "FC Bayern Home 26/27", qty: 1, price: 2999000 },
      { name: "Nike Mercurial Vapor 17", qty: 1, price: 4099000 },
      { name: "Real Madrid Scarf", qty: 1, price: 520000 },
    ],
    subtotal: 7618000, tax: 761800, total: 8379800, method: "QRIS", status: "Sukses",
  },
  {
    id: "TRX-0022", date: "13 Jun 2026, 14:18", customer: "Budi Santoso", cashier: "Yoga",
    itemCount: 2,
    items: [{ name: "Real Madrid Home 26/27", qty: 2, price: 3100000 }],
    subtotal: 6200000, tax: 620000, total: 6820000, method: "Transfer", status: "Sukses",
  },
  {
    id: "TRX-0021", date: "13 Jun 2026, 11:55", customer: "Siti Rahayu", cashier: "Yoga",
    itemCount: 2,
    items: [
      { name: "FC Barcelona UCL 25/26", qty: 1, price: 3100000 },
      { name: "FC Barcelona Scarf", qty: 1, price: 520000 },
    ],
    subtotal: 3620000, tax: 362000, total: 3982000, method: "Tunai", status: "Sukses",
  },
  {
    id: "TRX-0020", date: "13 Jun 2026, 10:30", customer: "Dian Pratama", cashier: "Yoga",
    itemCount: 1,
    items: [{ name: "Adidas Predator", qty: 1, price: 4600000 }],
    subtotal: 4600000, tax: 460000, total: 5060000, method: "Kartu", status: "Pending",
  },
  {
    id: "TRX-0019", date: "12 Jun 2026, 17:05", customer: "Arif Wijaya", cashier: "Yoga",
    itemCount: 4,
    items: [
      { name: "Ferrari Baseball Jersey", qty: 2, price: 1470000 },
      { name: "Scuderia Ferrari Classic Cap", qty: 1, price: 799000 },
      { name: "Scuderia Ferrari Lego", qty: 1, price: 603000 },
    ],
    subtotal: 4342000, tax: 434200, total: 4776200, method: "QRIS", status: "Sukses",
  },
  {
    id: "TRX-0018", date: "12 Jun 2026, 14:22", customer: "Maya Lestari", cashier: "Yoga",
    itemCount: 2,
    items: [
      { name: "Japan Home 26/27", qty: 1, price: 1899000 },
      { name: "Adidas F50 Hyperblast", qty: 1, price: 4100000 },
    ],
    subtotal: 5999000, tax: 599900, total: 6598900, method: "Transfer", status: "Sukses",
  },
  {
    id: "TRX-0017", date: "12 Jun 2026, 09:48", customer: "Hendra Gunawan", cashier: "Yoga",
    itemCount: 1,
    items: [{ name: "Scuderia Ferrari Lego Technic", qty: 1, price: 5100000 }],
    subtotal: 5100000, tax: 510000, total: 5610000, method: "Kartu", status: "Batal",
  },
  {
    id: "TRX-0016", date: "11 Jun 2026, 16:33", customer: "Dewi Anggraeni", cashier: "Yoga",
    itemCount: 3,
    items: [
      { name: "MUFC Home 26/27", qty: 2, price: 1666000 },
      { name: "Real Madrid Scarf", qty: 1, price: 520000 },
    ],
    subtotal: 3852000, tax: 385200, total: 4237200, method: "Tunai", status: "Sukses",
  },
  {
    id: "TRX-0015", date: "11 Jun 2026, 13:10", customer: "Fajar Nugroho", cashier: "Yoga",
    itemCount: 2,
    items: [
      { name: "Germany Home 26/27", qty: 1, price: 1899000 },
      { name: "Nike Mercurial Vapor 17", qty: 1, price: 4099000 },
    ],
    subtotal: 5998000, tax: 599800, total: 6597800, method: "QRIS", status: "Sukses",
  },
  {
    id: "TRX-0014", date: "11 Jun 2026, 09:00", customer: "Nurul Hidayah", cashier: "Yoga",
    itemCount: 1,
    items: [{ name: "Manchester City Home 26/27", qty: 1, price: 1666000 }],
    subtotal: 1666000, tax: 166600, total: 1832600, method: "Tunai", status: "Sukses",
  },
  {
    id: "TRX-0013", date: "10 Jun 2026, 18:45", customer: "Rizky Fauzan", cashier: "Yoga",
    itemCount: 3,
    items: [
      { name: "Internazionale Home 25/26", qty: 1, price: 1555000 },
      { name: "FC Barcelona Scarf", qty: 2, price: 520000 },
    ],
    subtotal: 2595000, tax: 259500, total: 2854500, method: "Transfer", status: "Sukses",
  },
  {
    id: "TRX-0012", date: "10 Jun 2026, 15:20", customer: "Amanda Putri", cashier: "Yoga",
    itemCount: 1,
    items: [{ name: "SF26 Puma Rain Jacket", qty: 1, price: 3099000 }],
    subtotal: 3099000, tax: 309900, total: 3408900, method: "QRIS", status: "Batal",
  },
  {
    id: "TRX-0011", date: "10 Jun 2026, 11:05", customer: "Wahyu Setiawan", cashier: "Yoga",
    itemCount: 3,
    items: [
      { name: "Scuderia Ferrari 26 Polo", qty: 1, price: 1599000 },
      { name: "Scuderia Ferrari Classic Cap", qty: 1, price: 799000 },
      { name: "Scuderia Ferrari Lego", qty: 1, price: 603000 },
    ],
    subtotal: 3001000, tax: 300100, total: 3301100, method: "Kartu", status: "Sukses",
  },
  {
    id: "TRX-0010", date: "09 Jun 2026, 14:30", customer: "Tari Wulandari", cashier: "Yoga",
    itemCount: 2,
    items: [
      { name: "FC Bayern Home 26/27", qty: 1, price: 2999000 },
      { name: "Adidas Predator", qty: 1, price: 4600000 },
    ],
    subtotal: 7599000, tax: 759900, total: 8358900, method: "Transfer", status: "Sukses",
  },
];

export function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}
