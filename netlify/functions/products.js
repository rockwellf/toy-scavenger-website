// Netlify serverless function — fetches products from Airtable
// Env vars needed in Netlify dashboard:
//   AIRTABLE_TOKEN  — your personal access token
//   AIRTABLE_BASE   — appOBHRtE0ctu9ATy
//   AIRTABLE_TABLE  — tblkG1c7Oz9SxXEsC

const BASE_ID   = process.env.AIRTABLE_BASE  || "appOBHRtE0ctu9ATy";
const TABLE_ID  = process.env.AIRTABLE_TABLE || "tblkG1c7Oz9SxXEsC";
const TOKEN     = process.env.AIRTABLE_TOKEN;

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

exports.handler = async () => {
  if (!TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AIRTABLE_TOKEN not set" }),
    };
  }

  try {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?sort[0][field]=Title&sort[0][direction]=asc`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!res.ok) {
      const text = await res.text();
      return { statusCode: res.status, body: text };
    }

    const data = await res.json();

    const products = (data.records || []).map((rec) => {
      const f = rec.fields;
      const photos = (f.Photos || []).map((a) => ({
        url: a.url,
        altText: f.Title || null,
      }));
      const price   = String(f.Price || 0);
      const sold    = (f.Status || "") === "Sold";
      const handle  = slugify(f.Title || rec.id);

      return {
        node: {
          id: rec.id,
          title: f.Title || "",
          description: f.Description || "",
          handle,
          priceRange: {
            minVariantPrice: { amount: price, currencyCode: "USD" },
          },
          images: { edges: photos.map((p) => ({ node: p })) },
          variants: {
            edges: [{
              node: {
                id: `var-${rec.id}`,
                title: "Default Title",
                price: { amount: price, currencyCode: "USD" },
                availableForSale: !sold,
                selectedOptions: [{ name: "Title", value: "Default Title" }],
              },
            }],
          },
          options: [{ name: "Title", values: ["Default Title"] }],
        },
      };
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=60",
      },
      body: JSON.stringify(products),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
