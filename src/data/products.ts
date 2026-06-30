// ============================================================
// PRODUCT CATALOG — add new items here
// Each item needs: id, title, description, handle (url slug),
// price, image url (or null), and available (true = for sale)
// ============================================================

export interface LocalProduct {
  node: {
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
  };
}

function makeProduct(
  id: string,
  title: string,
  description: string,
  handle: string,
  price: string,
  imageUrl: string | null,
  available: boolean
): LocalProduct {
  return {
    node: {
      id,
      title,
      description,
      handle,
      priceRange: { minVariantPrice: { amount: price, currencyCode: "USD" } },
      images: imageUrl
        ? { edges: [{ node: { url: imageUrl, altText: title } }] }
        : { edges: [] },
      variants: {
        edges: [
          {
            node: {
              id: `variant-${id}`,
              title: "Default Title",
              price: { amount: price, currencyCode: "USD" },
              availableForSale: available,
              selectedOptions: [{ name: "Title", value: "Default Title" }],
            },
          },
        ],
      },
      options: [{ name: "Title", values: ["Default Title"] }],
    },
  };
}

export const LOCAL_PRODUCTS: LocalProduct[] = [

  makeProduct(
    "frankenstein-lantern-1",
    "Vintage Frankenstein Figure with Lantern — 1970s/80s Halloween",
    `Large vintage Frankenstein figure from the late 1970s–80s Halloween novelty era. Hard vinyl sculpted head with bolt details and classic stitching. Full cloth/stuffed body in a black suit with original amber lantern prop. Approximately 18–20" tall. Tag confirms all-new polyester fill construction — commercially made, not a craft piece. In excellent vintage condition. A serious piece for Universal Monsters and vintage Halloween collectors.

One of a kind. Make an offer.`,
    "frankenstein-lantern",
    "125.00",
    null, // swap null with image URL once Rocky uploads the photo
    true
  ),

  makeProduct(
    "astronaut-robot-1",
    "Vintage Red Tin Wind-Up Astronaut Robot — Osaka Tin Toy Institute",
    "Vintage red tin wind-up astronaut robot from the Osaka Tin Toy Institute. A classic piece of mid-century Japanese tin toy craftsmanship.",
    "astronaut-robot",
    "125.00",
    null,
    false // marked SOLD
  ),

];
