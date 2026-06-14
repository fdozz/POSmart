export type ProductCategory = "Apparel" | "Footwear" | "Headwear" | "Fan Gear";

export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: ProductCategory;
  variants?: string[];
};

export const posProducts: Product[] = [
  // Apparel
  { id: "app-01", name: "Internazionale Home 25/26",   sku: "INT-001", price: 1555000, category: "Apparel",  variants: ["S","M","L","XL"] },
  { id: "app-02", name: "Scuderia Ferrari 26 Polo",    sku: "SF-001",  price: 1599000, category: "Apparel",  variants: ["S","M","L","XL"] },
  { id: "app-03", name: "MUFC Home 26/27",             sku: "MU-001",  price: 1666000, category: "Apparel",  variants: ["S","M","L","XL"] },
  { id: "app-04", name: "Japan Home 26/27",            sku: "JPN-001", price: 1899000, category: "Apparel",  variants: ["S","M","L","XL"] },
  { id: "app-05", name: "Ferrari Baseball Jersey",     sku: "FBJ-001", price: 1470000, category: "Apparel",  variants: ["S","M","L","XL"] },
  { id: "app-06", name: "Real Madrid Home 26/27",      sku: "RM-001",  price: 3100000, category: "Apparel",  variants: ["S","M","L","XL"] },
  { id: "app-07", name: "FC Barcelona UCL 25/26",      sku: "FCB-001", price: 3100000, category: "Apparel",  variants: ["S","M","L","XL"] },
  { id: "app-08", name: "Germany Home 26/27",          sku: "GER-001", price: 1899000, category: "Apparel",  variants: ["S","M","L","XL"] },
  { id: "app-09", name: "FC Bayern Home 26/27",        sku: "FCB-002", price: 2999000, category: "Apparel",  variants: ["S","M","L","XL"] },
  { id: "app-10", name: "Manchester City Home 26/27",  sku: "MCI-001", price: 1666000, category: "Apparel",  variants: ["S","M","L","XL"] },
  { id: "app-11", name: "SF26 Puma Rain Jacket",       sku: "SF-002",  price: 3099000, category: "Apparel",  variants: ["S","M","L","XL"] },
  // Footwear
  { id: "foo-01", name: "Nike Mercurial Vapor 17",     sku: "NMV-001", price: 4099000, category: "Footwear", variants: ["40","41","42","43","44","45","46"] },
  { id: "foo-02", name: "Adidas F50 Hyperblast",       sku: "ADF-001", price: 4100000, category: "Footwear", variants: ["40","41","42","43","44","45","46"] },
  { id: "foo-03", name: "Adidas Predator",             sku: "ADP-001", price: 4600000, category: "Footwear", variants: ["40","41","42","43","44","45"] },
  // Headwear
  { id: "hd-01",  name: "Scuderia Ferrari Classic Cap",sku: "SFC-001", price: 799000,  category: "Headwear", variants: ["Fit"] },
  // Fan Gear
  { id: "fan-01", name: "Real Madrid Scarf",           sku: "RMS-001", price: 520000,  category: "Fan Gear" },
  { id: "fan-02", name: "FC Barcelona Scarf",          sku: "FBS-001", price: 520000,  category: "Fan Gear" },
  { id: "fan-03", name: "Scuderia Ferrari Lego",       sku: "SFL-001", price: 603000,  category: "Fan Gear" },
  { id: "fan-04", name: "Scuderia Ferrari Lego Technic",sku:"SFT-001", price: 5100000, category: "Fan Gear", variants: ["1:12","1:8"] },
];

// Category display config
export const categoryConfig: Record<
  ProductCategory,
  { gradientFrom: string; gradientTo: string; abbr: string }
> = {
  Apparel:   { gradientFrom: "#FFF3E0", gradientTo: "#FFE0B2", abbr: "AP" },
  Footwear:  { gradientFrom: "#E3F2FD", gradientTo: "#BBDEFB", abbr: "FW" },
  Headwear:  { gradientFrom: "#E8F5E9", gradientTo: "#C8E6C9", abbr: "HW" },
  "Fan Gear":{ gradientFrom: "#F3E5F5", gradientTo: "#E1BEE7", abbr: "FG" },
};
