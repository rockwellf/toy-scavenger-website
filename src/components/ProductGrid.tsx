import { useEffect, useState } from "react";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

export function ProductGrid() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storefrontApiRequest(STOREFRONT_QUERY, { first: 24 })
      .then((data) => setProducts(data?.data?.products?.edges || []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-teal-deep" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-foreground rounded-md bg-card">
        <h3 className="font-display text-2xl mb-2">No treasures yet</h3>
        <p className="text-muted-foreground">
          Tell the chat what vintage gem you've scavenged and its price — we'll list it.
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
