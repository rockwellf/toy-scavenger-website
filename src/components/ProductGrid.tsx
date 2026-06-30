import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { ShopifyProduct } from "@/lib/shopify";

export function ProductGrid() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-teal-deep border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-foreground rounded-md bg-card">
        <h3 className="font-display text-2xl mb-2">No treasures yet</h3>
        <p className="text-muted-foreground">Drop a pic in chat to list a new item.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
    </div>
  );
}
