/**
 * Local product catalog, used when the Shopify store can't be reached.
 * Shapes match transformProduct / transformCollection in lib/shopify/transformers.js
 */

function product({ id, name, category, price, badge = null, slug, image, description }) {
  return {
    id: `demo-product-${id}`,
    variantId: `demo-variant-${id}`,
    name,
    category,
    price,
    badge,
    slug,
    image,
    imageAlt: name,
    images: [{ url: image, alt: name }],
    description,
    descriptionHtml: `<p>${description}</p>`,
    availableForSale: true,
  };
}

export const products = [
  product({
    id: 1,
    name: "España Cuffed Beanie — Rojo",
    category: "Beanies",
    price: 32,
    badge: "hot",
    slug: "espana-cuffed-beanie-rojo",
    image: "/products/espana-cuffed-beanie-red.jpg",
    description:
      "Fine-rib acrylic knit in a bold matchday red with an embroidered crest on a deep turn-up cuff. Soft, warm and made for long nights on the terrace. One size fits most.",
  }),
  product({
    id: 2,
    name: "Argentina '26 Bucket Hat — Black",
    category: "Bucket Hats",
    price: 38,
    badge: "new",
    slug: "argentina-26-bucket-hat-black",
    image: "/products/argentina-26-bucket-hat-black.jpg",
    description:
      "Heavyweight cotton twill bucket with a raised-embroidery crest and stitched '26 numerals on the brim. Stitched brim, breathable eyelets and a structured crown that holds its shape.",
  }),
  product({
    id: 3,
    name: "Portugal '26 Snapback — Cream / Brown",
    category: "Snapbacks",
    price: 40,
    badge: "new",
    slug: "portugal-26-snapback-cream-brown",
    image: "/products/portugal-26-snapback-cream.jpg",
    description:
      "Five-panel structured snapback in cream canvas with a contrast brown pre-curved peak. Front crest embroidery, '26 side hit and an adjustable snap closure.",
  }),
  product({
    id: 4,
    name: "England Three Lions Beanie — Black",
    category: "Beanies",
    price: 32,
    badge: "hot",
    slug: "england-three-lions-beanie-black",
    image: "/products/england-three-lions-beanie-black.jpg",
    description:
      "Classic black cuffed beanie with a woven three lions crest and white wordmark. Double-layer knit for extra warmth on cold away days. One size fits most.",
  }),
  product({
    id: 5,
    name: "Terrace Rib Beanie — Slate",
    category: "Beanies",
    price: 26,
    slug: "terrace-rib-beanie-slate",
    image: "/products/terrace-rib-beanie-slate.jpg",
    description:
      "Our everyday essential. A clean, unbranded rib-knit beanie in muted slate blue with a fold-over cuff. Pairs with everything from match kit to workwear.",
  }),
  product({
    id: 6,
    name: "Curva Two-Tone Snapback — White / Black",
    category: "Snapbacks",
    price: 34,
    slug: "curva-two-tone-snapback-white-black",
    image: "/products/curva-two-tone-snapback.jpg",
    description:
      "High-crown six-panel snapback with a crisp white front and black flat peak. Stitched eyelets, a firm buckram front and an adjustable snap back for the perfect fit.",
  }),
  product({
    id: 7,
    name: "Away Day Bucket Hat — Black",
    category: "Bucket Hats",
    price: 30,
    slug: "away-day-bucket-hat-black",
    image: "/products/away-day-bucket-hat-black.jpg",
    description:
      "Washed cotton bucket in tonal black with a multi-stitched brim. Lightweight, packable and built for the trip from the train station to the away end.",
  }),
];

const collectionDetails = [
  {
    id: "snapbacks",
    name: "Snapbacks",
    gradient: "from-mid to-[#0f1f00]",
    image: "/products/portugal-26-snapback-cream.jpg",
    description: "Structured caps with adjustable snap closures.",
  },
  {
    id: "beanies",
    name: "Beanies",
    gradient: "from-mid to-[#1f1a00]",
    image: "/products/espana-cuffed-beanie-red.jpg",
    description: "Cuffed knits for cold nights on the terrace.",
  },
  {
    id: "bucket-hats",
    name: "Bucket Hats",
    gradient: "from-mid to-[#001f1a]",
    image: "/products/argentina-26-bucket-hat-black.jpg",
    description: "Durable cotton buckets for match days and away days.",
  },
];

export const collections = collectionDetails.map((collection) => ({
  ...collection,
  count: products.filter((p) => p.category === collection.name).length,
}));
