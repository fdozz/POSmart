export type ProductCategory = "Apparel" | "Footwear" | "Headwear" | "Fan Gear";
export type ProductStatus  = "Aktif" | "Menipis" | "Habis";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  stock: number;
  minStock: number;
  price: number;
  sold: number;
};

export function getStatus(stock: number, minStock: number): ProductStatus {
  if (stock === 0) return "Habis";
  if (stock <= minStock) return "Menipis";
  return "Aktif";
}

export const mockProducts: Product[] = [
  { id: "p-01", name: "FC Bayern Home 26/27",          sku: "BM-001",  category: "Apparel",  stock: 15, minStock: 5, price: 2999000, sold: 234 },
  { id: "p-02", name: "Ferrari Baseball Jersey",       sku: "FBJ-001", category: "Apparel",  stock: 5,  minStock: 5, price: 1470000, sold: 156 },
  { id: "p-03", name: "Real Madrid Home 26/27",        sku: "RM-001",  category: "Apparel",  stock: 3,  minStock: 5, price: 3100000, sold: 89  },
  { id: "p-04", name: "Scuderia Ferrari Classic Cap",  sku: "SFC-001", category: "Headwear", stock: 0,  minStock: 5, price: 799000,  sold: 67  },
  { id: "p-05", name: "Nike Mercurial Vapor 17",       sku: "NMV-001", category: "Footwear", stock: 20, minStock: 5, price: 4099000, sold: 45  },
  { id: "p-06", name: "Adidas Predator",               sku: "ADP-001", category: "Footwear", stock: 8,  minStock: 5, price: 4600000, sold: 38  },
  { id: "p-07", name: "FC Barcelona UCL 25/26",        sku: "FCB-001", category: "Apparel",  stock: 12, minStock: 5, price: 3100000, sold: 112 },
  { id: "p-08", name: "Japan Home 26/27",              sku: "JPN-001", category: "Apparel",  stock: 4,  minStock: 5, price: 1899000, sold: 78  },
  { id: "p-09", name: "Scuderia Ferrari Lego Technic", sku: "SFT-001", category: "Fan Gear", stock: 6,  minStock: 7, price: 5100000, sold: 23  },
  { id: "p-10", name: "Real Madrid Scarf",             sku: "RMS-001", category: "Fan Gear", stock: 25, minStock: 5, price: 520000,  sold: 167 },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = ["Apparel", "Footwear", "Headwear", "Fan Gear"];
