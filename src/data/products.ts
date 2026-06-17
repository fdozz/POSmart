import { getProductStock, mockCategories, mockInventory, mockProducts } from "@/data/mockData";
import type { Category, Inventory, Product as DomainProduct } from "@/types/posmart";

export type ProductCategory = "Minuman" | "Makanan" | "Snack" | "Retail";
export type ProductStatus = "Aktif" | "Menipis" | "Habis";
export const PRODUCT_CATEGORIES: ProductCategory[] = ["Minuman", "Makanan", "Snack", "Retail"];

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

const categoryNameById = new Map(mockCategories.map((category) => [category.categoryId, category.nama as ProductCategory]));

function normalizeCategory(value: string | undefined): ProductCategory {
  return PRODUCT_CATEGORIES.includes(value as ProductCategory) ? value as ProductCategory : "Retail";
}

export function getStatus(stock: number, minStock: number): ProductStatus {
  if (stock === 0) return "Habis";
  if (stock <= minStock) return "Menipis";
  return "Aktif";
}

export function toProductView(product: DomainProduct, inventorySource: Inventory[] = mockInventory, categorySource: Category[] = mockCategories): Product {
  const categories = new Map(categorySource.map((category) => [category.categoryId, category.nama as ProductCategory]));
  const inventoryRows = inventorySource.filter((item) => item.productId === product.productId);
  const category = normalizeCategory(categories.get(product.categoryId ?? "") ?? categoryNameById.get(product.categoryId ?? ""));
  return {
    id: product.productId,
    name: product.nama,
    sku: product.sku ?? product.productId,
    category,
    stock: inventoryRows.reduce((sum, item) => sum + item.stok, 0),
    minStock: inventoryRows.length > 0 ? Math.min(...inventoryRows.map((item) => item.minStock)) : 5,
    price: product.harga,
    sold: 0,
  };
}

export const mockProductsLegacy: Product[] = mockProducts.map((product) => {
  const view = toProductView(product, mockInventory, mockCategories);
  return {
    ...view,
    stock: getProductStock(product.productId),
  };
});

export { mockProductsLegacy as mockProducts };
