export type Role =
  | "Super Admin"
  | "Owner"
  | "Kasir"
  | "Logistik"
  | "Pramuniaga";

export type Permission =
  | "Dashboard"
  | "POS / Kasir"
  | "Produk & Inventori"
  | "Transaksi"
  | "Pelanggan"
  | "Supplier"
  | "Team & Roles"
  | "Laporan & Analisis"
  | "Pengaturan";

export const rolePermissions: Record<Role, Permission[]> = {
  "Super Admin": [
    "Dashboard", "POS / Kasir", "Produk & Inventori", "Transaksi",
    "Pelanggan", "Supplier", "Team & Roles", "Laporan & Analisis", "Pengaturan",
  ],
  "Owner": [
    "Dashboard", "POS / Kasir", "Produk & Inventori", "Transaksi",
    "Pelanggan", "Supplier", "Team & Roles", "Laporan & Analisis", "Pengaturan",
  ],
  "Kasir": ["POS / Kasir", "Transaksi"],
  "Logistik": ["Produk & Inventori", "Supplier"],
  "Pramuniaga": ["POS / Kasir", "Produk & Inventori", "Pelanggan"],
};

export const roleBadge: Record<Role, { bg: string; text: string }> = {
  "Super Admin": { bg: "bg-red-100",    text: "text-red-600"    },
  "Owner":       { bg: "bg-orange-100", text: "text-orange-600" },
  "Kasir":       { bg: "bg-blue-100",   text: "text-blue-600"   },
  "Logistik":    { bg: "bg-green-100",  text: "text-green-700"  },
  "Pramuniaga":  { bg: "bg-purple-100", text: "text-purple-600" },
};

export type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  joinDate: string;
  avatarColor: [string, string];
  initials: string;
};

export const mockMembers: Member[] = [
  {
    id: "M-001", name: "Chris Friedkly", email: "chris@tokoh.com",
    role: "Logistik", joinDate: "10 Jan 2025",
    avatarColor: ["#4B5563", "#FFFFFF"], initials: "CF",
  },
  {
    id: "M-002", name: "Maggie Johnson", email: "maggie@tokoh.com",
    role: "Kasir", joinDate: "15 Feb 2025",
    avatarColor: ["#7C3AED", "#FFFFFF"], initials: "MJ",
  },
  {
    id: "M-003", name: "Gael Harry", email: "gael@tokoh.com",
    role: "Logistik", joinDate: "22 Mar 2025",
    avatarColor: ["#1D4ED8", "#FFFFFF"], initials: "GH",
  },
  {
    id: "M-004", name: "Jenna Sullivan", email: "jenna@tokoh.com",
    role: "Pramuniaga", joinDate: "05 Apr 2025",
    avatarColor: ["#065F46", "#FFFFFF"], initials: "JS",
  },
];
