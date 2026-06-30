import { LOCAL_PRODUCTS, type LocalProduct } from "@/data/products";
import { ProductCard } from "./ProductCard";
import type { ShopifyProduct } from "@/lib/shopify";

export function ProductGrid() {
  const products = LOCAL_PRODUCTS as unknown as ShopifyProduct[];

  if (products.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-foreground rounded-md bg-card">
        <h3 className="font-display text-2xl mb-2">No treasures yet</h3>
        <p className="text-muted-foreground">
          Drop a pic in chat to list a new item.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
    </div>
  );
}
