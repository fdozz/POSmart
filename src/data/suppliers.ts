export type SupplierStatus = "Lunas" | "Hutang";

export type SupplierTx = { name: string; date: string; amount: number };

export type Supplier = {
  id: string;
  name: string;
  abbr: string;
  logoColor: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  totalPurchases: number;
  productCount: number;
  debt: number;
  lastOrder: string;
  joinDate: string;
  status: SupplierStatus;
  recentTx: SupplierTx[];
};

export const mockSuppliers: Supplier[] = [
  {
    id: "S-001", name: "Scuderia Ferrari F1", abbr: "SF", logoColor: "#DC2626",
    contactPerson: "Marco Rossi", email: "sf@ferrari.com", phone: "+39-0536-949111",
    city: "Maranello", country: "Italy",
    totalPurchases: 33000000, productCount: 12, debt: 0,
    lastOrder: "28 Feb 2026", joinDate: "10 Jan 2025", status: "Lunas",
    recentTx: [
      { name: "SF Classic Cap",          date: "28 Feb 2026", amount: 7990000  },
      { name: "Scuderia Ferrari 26 Polo", date: "15 Feb 2026", amount: 9594000 },
      { name: "SF26 Puma Rain Jacket",   date: "05 Feb 2026", amount: 6198000  },
    ],
  },
  {
    id: "S-002", name: "Adidas Group", abbr: "AD", logoColor: "#111827",
    contactPerson: "Klaus Müller", email: "supply@adidas.com", phone: "+49-9132-840",
    city: "Herzogenaurach", country: "Germany",
    totalPurchases: 58000000, productCount: 18, debt: 0,
    lastOrder: "10 Mar 2026", joinDate: "05 Nov 2024", status: "Lunas",
    recentTx: [
      { name: "Adidas Predator",      date: "10 Mar 2026", amount: 23000000 },
      { name: "Adidas F50 Hyperblast",date: "20 Feb 2026", amount: 20500000 },
      { name: "Adidas Training Kit",  date: "01 Feb 2026", amount: 14500000 },
    ],
  },
  {
    id: "S-003", name: "Nike Inc.", abbr: "NK", logoColor: "#374151",
    contactPerson: "Sarah Johnson", email: "b2b@nike.com", phone: "+1-503-671-6453",
    city: "Beaverton", country: "USA",
    totalPurchases: 49000000, productCount: 15, debt: 0,
    lastOrder: "05 Mar 2026", joinDate: "20 Oct 2024", status: "Lunas",
    recentTx: [
      { name: "Nike Mercurial Vapor 17",   date: "05 Mar 2026", amount: 20495000 },
      { name: "Nike Dri-FIT Training Set", date: "15 Feb 2026", amount: 15300000 },
      { name: "Nike Air Max",              date: "28 Jan 2026", amount: 13200000 },
    ],
  },
  {
    id: "S-004", name: "Puma SE", abbr: "PU", logoColor: "#D97706",
    contactPerson: "Anna Fischer", email: "supply@puma.com", phone: "+49-9132-81-0",
    city: "Herzogenaurach", country: "Germany",
    totalPurchases: 28500000, productCount: 9, debt: 0,
    lastOrder: "18 Feb 2026", joinDate: "15 Jan 2025", status: "Lunas",
    recentTx: [
      { name: "SF26 Puma Rain Jacket",  date: "18 Feb 2026", amount: 12396000 },
      { name: "Puma Future Training",   date: "05 Feb 2026", amount: 9200000  },
      { name: "Puma Ferrari Cap",       date: "20 Jan 2026", amount: 6904000  },
    ],
  },
  {
    id: "S-005", name: "FC Bayern München", abbr: "FCB", logoColor: "#DC2626",
    contactPerson: "Thomas Weber", email: "merch@fcbayern.com", phone: "+49-89-69931222",
    city: "Munich", country: "Germany",
    totalPurchases: 35900000, productCount: 8, debt: 0,
    lastOrder: "22 Mar 2026", joinDate: "08 Dec 2024", status: "Lunas",
    recentTx: [
      { name: "FC Bayern Home 26/27", date: "22 Mar 2026", amount: 17994000 },
      { name: "FC Bayern Away Kit",   date: "10 Mar 2026", amount: 11950000 },
      { name: "FC Bayern Scarf",      date: "01 Feb 2026", amount: 5956000  },
    ],
  },
  {
    id: "S-006", name: "Real Madrid CF", abbr: "RM", logoColor: "#1D4ED8",
    contactPerson: "Carlos López", email: "retail@realmadrid.com", phone: "+34-91-398-4300",
    city: "Madrid", country: "Spain",
    totalPurchases: 41200000, productCount: 10, debt: 0,
    lastOrder: "14 Mar 2026", joinDate: "02 Sep 2024", status: "Lunas",
    recentTx: [
      { name: "Real Madrid Home 26/27",  date: "14 Mar 2026", amount: 18600000 },
      { name: "Real Madrid Scarf",       date: "28 Feb 2026", amount: 5200000  },
      { name: "Real Madrid Away 26/27",  date: "10 Feb 2026", amount: 17400000 },
    ],
  },
  {
    id: "S-007", name: "FC Barcelona", abbr: "FCB", logoColor: "#1E40AF",
    contactPerson: "Jordi Serra", email: "b2b@fcbarcelona.com", phone: "+34-93-496-3600",
    city: "Barcelona", country: "Spain",
    totalPurchases: 37800000, productCount: 11, debt: 3100000,
    lastOrder: "08 Mar 2026", joinDate: "12 Nov 2024", status: "Hutang",
    recentTx: [
      { name: "FC Barcelona UCL 25/26", date: "08 Mar 2026", amount: 18600000 },
      { name: "FC Barcelona Scarf",     date: "20 Feb 2026", amount: 5200000  },
      { name: "FC Barcelona Home 25/26",date: "05 Feb 2026", amount: 14000000 },
    ],
  },
  {
    id: "S-008", name: "Japan FA", abbr: "JPN", logoColor: "#DC2626",
    contactPerson: "Kenji Tanaka", email: "supply@jfa.jp", phone: "+81-3-3830-2004",
    city: "Tokyo", country: "Japan",
    totalPurchases: 22800000, productCount: 6, debt: 0,
    lastOrder: "01 Mar 2026", joinDate: "25 Feb 2025", status: "Lunas",
    recentTx: [
      { name: "Japan Home 26/27",  date: "01 Mar 2026", amount: 11394000 },
      { name: "Japan Away 26/27",  date: "15 Feb 2026", amount: 11394000 },
    ],
  },
  {
    id: "S-009", name: "DFB (Germany FA)", abbr: "GER", logoColor: "#F59E0B",
    contactPerson: "Hans Bauer", email: "merch@dfb.de", phone: "+49-69-6788-0",
    city: "Frankfurt", country: "Germany",
    totalPurchases: 19000000, productCount: 5, debt: 1899000,
    lastOrder: "05 Feb 2026", joinDate: "10 Apr 2025", status: "Hutang",
    recentTx: [
      { name: "Germany Home 26/27",  date: "05 Feb 2026", amount: 9495000 },
      { name: "Germany Away 26/27",  date: "20 Jan 2026", amount: 9495000 },
    ],
  },
  {
    id: "S-010", name: "Lego Group", abbr: "LG", logoColor: "#DC2626",
    contactPerson: "Mads Larsen", email: "b2b@lego.com", phone: "+45-79-50-6070",
    city: "Billund", country: "Denmark",
    totalPurchases: 15300000, productCount: 4, debt: 0,
    lastOrder: "12 Feb 2026", joinDate: "30 Jun 2025", status: "Lunas",
    recentTx: [
      { name: "Scuderia Ferrari Lego Technic", date: "12 Feb 2026", amount: 10200000 },
      { name: "Scuderia Ferrari Lego",         date: "28 Jan 2026", amount: 5100000  },
    ],
  },
  {
    id: "S-011", name: "MUFC Retail", abbr: "MU", logoColor: "#DC2626",
    contactPerson: "James Wilson", email: "retail@manutd.com", phone: "+44-161-868-8000",
    city: "Manchester", country: "UK",
    totalPurchases: 24960000, productCount: 7, debt: 0,
    lastOrder: "25 Feb 2026", joinDate: "15 Aug 2025", status: "Lunas",
    recentTx: [
      { name: "MUFC Home 26/27",  date: "25 Feb 2026", amount: 14994000 },
      { name: "MUFC Away 26/27",  date: "10 Feb 2026", amount: 9966000  },
    ],
  },
  {
    id: "S-012", name: "Inter Milan", abbr: "INT", logoColor: "#1E3A8A",
    contactPerson: "Gianluca Ricci", email: "b2b@inter.it", phone: "+39-02-77151",
    city: "Milan", country: "Italy",
    totalPurchases: 18660000, productCount: 6, debt: 0,
    lastOrder: "20 Feb 2026", joinDate: "05 Oct 2025", status: "Lunas",
    recentTx: [
      { name: "Internazionale Home 25/26", date: "20 Feb 2026", amount: 9330000 },
      { name: "Internazionale Away",       date: "05 Feb 2026", amount: 9330000 },
    ],
  },
];

export function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export function formatRpShort(n: number): string {
  if (n >= 1_000_000_000) return "Rp " + (n / 1_000_000_000).toFixed(1) + " M";
  if (n >= 1_000_000)     return "Rp " + (n / 1_000_000).toFixed(0) + " Jt";
  if (n >= 1_000)         return "Rp " + (n / 1_000).toFixed(0) + " Rb";
  return "Rp " + n;
}
