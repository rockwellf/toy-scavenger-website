import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCAL_PRODUCTS } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { MakeOfferDialog } from "@/components/MakeOfferDialog";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle} — Toy Scavenger` },
      { name: "description", content: "Vintage find from Toy Scavenger." },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="text-cherry mb-4">{error.message}</p>
      <Link to="/" className="font-display underline">Back to shop</Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="font-display text-3xl mb-2">Treasure not found</h1>
      <Link to="/" className="text-cherry underline">Back to shop</Link>
    </div>
  ),
});

interface ProductDetail {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
        selectedOptions: Array<{ name: string; value: string }>;
      };
    }>;
  };
  options: Array<{ name: string; values: string[] }>;
}

function ProductPage() {
  const { handle } = Route.useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    const found = LOCAL_PRODUCTS.find((p) => p.node.handle === handle);
    setProduct(found ? (found.node as unknown as ProductDetail) : null);
    setLoading(false);
  }, [handle]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-teal-deep" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl mb-2">Treasure not found</h1>
        <Link to="/" className="text-cherry underline">Back to shop</Link>
      </div>
    );
  }

  const variant = product.variants.edges[0]?.node;
  const images = product.images.edges;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: { ...product } } as never,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to your haul!", { position: "top-center" });
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 font-mono-retro text-sm text-cherry mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> BACK TO SHOP
      </Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square bg-card border-2 border-foreground rounded-md overflow-hidden mb-3">
            {images[selectedImage] ? (
              <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 border-2 rounded-md overflow-hidden ${i === selectedImage ? "border-cherry" : "border-foreground"}`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-teal-deep leading-tight">{product.title}</h1>
          <div className="mt-4 text-3xl font-bold text-cherry">
            ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
          </div>
          {!variant?.availableForSale && (
            <div className="mt-3 inline-block bg-foreground text-cream px-3 py-1 font-display text-sm">SOLD</div>
          )}
          <div className="mt-6 prose prose-sm max-w-none whitespace-pre-wrap text-foreground">
            {product.description || "A vintage find from the Toy Scavenger collection."}
          </div>
          <Button
            onClick={handleAdd}
            disabled={isLoading || !variant?.availableForSale}
            size="lg"
            className="mt-8 w-full md:w-auto bg-cherry hover:bg-cherry/90 text-cream border-2 border-foreground font-display shadow-[4px_4px_0_0_oklch(0.22_0.04_30)]"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4 mr-2" />ADD TO HAUL</>}
          </Button>
          <MakeOfferDialog
            productTitle={product.title}
            productHandle={product.handle}
            listPrice={parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
          />
        </div>
      </div>
    </main>
  );
}
