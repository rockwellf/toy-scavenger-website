import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import type { ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to your haul!", { position: "top-center" });
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.node.handle }}
      className="group block bg-card border-2 border-foreground rounded-md overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_oklch(0.22_0.04_30)]"
    >
      <div className="aspect-square bg-muted overflow-hidden border-b-2 border-foreground relative">
        {image ? (
          <img src={image.url} alt={image.altText || product.node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
        )}
        {!variant?.availableForSale && (
          <div className="absolute top-2 left-2 bg-foreground text-cream px-2 py-1 text-xs font-display">SOLD</div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-display text-base leading-tight line-clamp-2">{product.node.title}</h3>
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-lg text-cherry">
            ${parseFloat(price.amount).toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={isLoading || !variant?.availableForSale}
            className="bg-teal-deep hover:bg-teal-deep/90 text-cream border-2 border-foreground font-semibold"
          >
            {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Plus className="w-3 h-3 mr-1" />ADD</>}
          </Button>
        </div>
      </div>
    </Link>
  );
}
