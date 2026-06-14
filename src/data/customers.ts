export type CustomerTier   = "Gold" | "Silver" | "Bronze" | "Member";
export type CustomerStatus = "Aktif" | "Tidak Aktif";

export type RecentTx = { name: string; date: string; amount: number };

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalTransactions: number;
  totalSpent: number;
  lastTransaction: string;
  joinDate: string;
  visits: number;
  status: CustomerStatus;
  tier: CustomerTier;
  recentItems: string[];
  recentTx: RecentTx[];
};

// Thresholds: Gold ≥ 20 jt or ≥ 8 orders | Silver ≥ 10 jt or ≥ 5 | Bronze ≥ 5 jt or ≥ 3 | Member otherwise
export function calcTier(spent: number, txCount: number): CustomerTier {
  if (spent >= 20_000_000 || txCount >= 8)  return "Gold";
  if (spent >= 10_000_000 || txCount >= 5)  return "Silver";
  if (spent >= 5_000_000  || txCount >= 3)  return "Bronze";
  return "Member";
}

const raw: {
  id: string; name: string; phone: string; email: string;
  tx: number; spent: number; last: string; join: string; visits: number;
  items: string[]; recentTx: RecentTx[];
}[] = [
  {
    id: "C-001", name: "Rina Kusuma",    phone: "+62 812 3456 7890", email: "rina@gmail.com",
    tx: 12, spent: 45200000, last: "13 Jun 2026", join: "03 Jan 2025", visits: 36,
    items: ["FC Bayern Home 26/27", "Nike Mercurial Vapor 17", "Real Madrid Scarf"],
    recentTx: [
      { name: "FC Bayern Home 26/27",    date: "13 Jun 2026", amount: 2999000 },
      { name: "Nike Mercurial Vapor 17", date: "05 Jun 2026", amount: 4099000 },
      { name: "Real Madrid Scarf",       date: "28 May 2026", amount: 520000  },
    ],
  },
  {
    id: "C-002", name: "Budi Santoso",   phone: "+62 813 2233 4411", email: "budi.s@gmail.com",
    tx: 9,  spent: 32100000, last: "13 Jun 2026", join: "15 Feb 2025", visits: 28,
    items: ["Real Madrid Home 26/27", "Adidas Predator"],
    recentTx: [
      { name: "Real Madrid Home 26/27", date: "13 Jun 2026", amount: 6200000 },
      { name: "Adidas Predator",        date: "01 Jun 2026", amount: 4600000 },
      { name: "FC Bayern Home 26/27",   date: "20 May 2026", amount: 2999000 },
    ],
  },
  {
    id: "C-003", name: "Siti Rahayu",    phone: "+62 857 9988 7766", email: "siti.r@yahoo.com",
    tx: 7,  spent: 21500000, last: "13 Jun 2026", join: "22 Mar 2025", visits: 21,
    items: ["FC Barcelona UCL 25/26", "FC Barcelona Scarf"],
    recentTx: [
      { name: "FC Barcelona UCL 25/26", date: "13 Jun 2026", amount: 3100000 },
      { name: "FC Barcelona Scarf",     date: "02 Jun 2026", amount: 520000  },
      { name: "FC Barcelona UCL 25/26", date: "15 May 2026", amount: 3100000 },
    ],
  },
  {
    id: "C-004", name: "Tari Wulandari", phone: "+62 896 2231 1100", email: "tari.w@gmail.com",
    tx: 4,  spent: 22400000, last: "09 Jun 2026", join: "19 Feb 2025", visits: 13,
    items: ["FC Bayern Home 26/27", "Adidas Predator"],
    recentTx: [
      { name: "FC Bayern Home 26/27",   date: "09 Jun 2026", amount: 2999000 },
      { name: "Adidas Predator",        date: "09 Jun 2026", amount: 4600000 },
      { name: "Real Madrid Home 26/27", date: "10 May 2026", amount: 3100000 },
    ],
  },
  {
    id: "C-005", name: "Arif Wijaya",    phone: "+62 821 5566 7788", email: "arif.w@gmail.com",
    tx: 6,  spent: 19200000, last: "12 Jun 2026", join: "05 Jan 2025", visits: 19,
    items: ["Ferrari Baseball Jersey", "Scuderia Ferrari Classic Cap"],
    recentTx: [
      { name: "Ferrari Baseball Jersey",      date: "12 Jun 2026", amount: 2940000 },
      { name: "Scuderia Ferrari Classic Cap", date: "05 Jun 2026", amount: 799000  },
      { name: "Scuderia Ferrari Lego",        date: "20 Apr 2026", amount: 603000  },
    ],
  },
  {
    id: "C-006", name: "Maya Lestari",   phone: "+62 819 4433 2211", email: "maya.l@outlook.com",
    tx: 5,  spent: 16800000, last: "12 Jun 2026", join: "18 Feb 2025", visits: 16,
    items: ["Japan Home 26/27", "Adidas F50 Hyperblast"],
    recentTx: [
      { name: "Japan Home 26/27",      date: "12 Jun 2026", amount: 1899000 },
      { name: "Adidas F50 Hyperblast", date: "04 Jun 2026", amount: 4100000 },
      { name: "Germany Home 26/27",    date: "10 Mar 2026", amount: 1899000 },
    ],
  },
  {
    id: "C-007", name: "Fajar Nugroho",  phone: "+62 817 7789 9900", email: "fajar.n@gmail.com",
    tx: 4,  spent: 17600000, last: "11 Jun 2026", join: "14 Jan 2025", visits: 12,
    items: ["Germany Home 26/27", "Nike Mercurial Vapor 17"],
    recentTx: [
      { name: "Germany Home 26/27",      date: "11 Jun 2026", amount: 1899000 },
      { name: "Nike Mercurial Vapor 17", date: "11 Jun 2026", amount: 4099000 },
      { name: "FC Bayern Home 26/27",    date: "25 Apr 2026", amount: 2999000 },
    ],
  },
  {
    id: "C-008", name: "Dewi Anggraeni", phone: "+62 812 0011 2233", email: "dewi.a@gmail.com",
    tx: 5,  spent: 13900000, last: "11 Jun 2026", join: "20 Mar 2025", visits: 15,
    items: ["MUFC Home 26/27", "Real Madrid Scarf"],
    recentTx: [
      { name: "MUFC Home 26/27",    date: "11 Jun 2026", amount: 3332000 },
      { name: "Real Madrid Scarf",  date: "03 Jun 2026", amount: 520000  },
      { name: "Japan Home 26/27",   date: "22 Apr 2026", amount: 1899000 },
    ],
  },
  {
    id: "C-009", name: "Hendra Gunawan", phone: "+62 856 8877 6655", email: "hendra.g@gmail.com",
    tx: 3,  spent: 11400000, last: "12 Jun 2026", join: "02 May 2025", visits: 9,
    items: ["Scuderia Ferrari Lego Technic"],
    recentTx: [
      { name: "Scuderia Ferrari Lego Technic", date: "12 Jun 2026", amount: 5100000 },
      { name: "Scuderia Ferrari 26 Polo",      date: "15 May 2026", amount: 1599000 },
      { name: "Scuderia Ferrari Classic Cap",  date: "02 May 2026", amount: 799000  },
    ],
  },
  {
    id: "C-010", name: "Dian Pratama",   phone: "+62 878 1122 3344", email: "dian.p@gmail.com",
    tx: 4,  spent: 14600000, last: "13 Jun 2026", join: "10 Apr 2025", visits: 11,
    items: ["Adidas Predator"],
    recentTx: [
      { name: "Adidas Predator",         date: "13 Jun 2026", amount: 4600000 },
      { name: "Adidas F50 Hyperblast",   date: "10 May 2026", amount: 4100000 },
      { name: "Nike Mercurial Vapor 17", date: "01 Mar 2026", amount: 4099000 },
    ],
  },
  {
    id: "C-011", name: "Nurul Hidayah",  phone: "+62 895 3344 5566", email: "nurul.h@yahoo.com",
    tx: 3,  spent: 6300000,  last: "11 Jun 2026", join: "30 Apr 2025", visits: 8,
    items: ["Manchester City Home 26/27"],
    recentTx: [
      { name: "Manchester City Home 26/27", date: "11 Jun 2026", amount: 1666000 },
      { name: "FC Barcelona Scarf",         date: "10 May 2026", amount: 520000  },
      { name: "Real Madrid Scarf",          date: "30 Apr 2026", amount: 520000  },
    ],
  },
  {
    id: "C-012", name: "Wahyu Setiawan", phone: "+62 814 6677 8899", email: "wahyu.s@gmail.com",
    tx: 3,  spent: 8700000,  last: "10 Jun 2026", join: "12 Apr 2025", visits: 9,
    items: ["Scuderia Ferrari 26 Polo", "Scuderia Ferrari Classic Cap"],
    recentTx: [
      { name: "Scuderia Ferrari 26 Polo",     date: "10 Jun 2026", amount: 1599000 },
      { name: "Scuderia Ferrari Classic Cap", date: "10 Jun 2026", amount: 799000  },
      { name: "Scuderia Ferrari Lego",        date: "15 May 2026", amount: 603000  },
    ],
  },
  {
    id: "C-013", name: "Amanda Putri",   phone: "+62 838 4455 6677", email: "amanda.p@gmail.com",
    tx: 2,  spent: 5900000,  last: "10 Jun 2026", join: "01 Jun 2026", visits: 4,
    items: ["SF26 Puma Rain Jacket"],
    recentTx: [
      { name: "SF26 Puma Rain Jacket",   date: "10 Jun 2026", amount: 3099000 },
      { name: "Ferrari Baseball Jersey", date: "01 Jun 2026", amount: 1470000 },
    ],
  },
  {
    id: "C-014", name: "Rizky Fauzan",   phone: "+62 822 1199 0088", email: "rizky.f@gmail.com",
    tx: 2,  spent: 4200000,  last: "10 Jun 2026", join: "08 Jun 2026", visits: 3,
    items: ["Internazionale Home 25/26", "FC Barcelona Scarf"],
    recentTx: [
      { name: "Internazionale Home 25/26", date: "10 Jun 2026", amount: 1555000 },
      { name: "FC Barcelona Scarf",        date: "10 Jun 2026", amount: 1040000 },
    ],
  },
];

export const mockCustomers: Customer[] = raw.map(r => ({
  id:                r.id,
  name:              r.name,
  phone:             r.phone,
  email:             r.email,
  totalTransactions: r.tx,
  totalSpent:        r.spent,
  lastTransaction:   r.last,
  joinDate:          r.join,
  visits:            r.visits,
  status:            (r.tx > 1 ? "Aktif" : "Tidak Aktif") as CustomerStatus,
  tier:              calcTier(r.spent, r.tx),
  recentItems:       r.items,
  recentTx:          r.recentTx,
}));

export function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export function formatRpShort(n: number): string {
  if (n >= 1_000_000_000) return "Rp " + (n / 1_000_000_000).toFixed(1) + " M";
  if (n >= 1_000_000)     return "Rp " + (n / 1_000_000).toFixed(2).replace(/\.?0+$/, "") + " Jt";
  if (n >= 1_000)         return "Rp " + (n / 1_000).toFixed(0) + " Rb";
  return "Rp " + n;
}

const AVATAR_COLORS: [string, string][] = [
  ["#FFF3E0", "#E65100"],
  ["#E3F2FD", "#1565C0"],
  ["#E8F5E9", "#2E7D32"],
  ["#F3E5F5", "#6A1B9A"],
  ["#FFF8E1", "#F57F17"],
  ["#E0F7FA", "#00695C"],
  ["#FCE4EC", "#880E4F"],
  ["#EDE7F6", "#4527A0"],
];

export function avatarColor(idx: number): [string, string] {
  return AVATAR_COLORS[idx % AVATAR_COLORS.length];
}
