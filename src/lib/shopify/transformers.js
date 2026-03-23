/**
 * Transform Shopify product to match current component expectations
 */
export function transformProduct(shopifyProduct) {
  const firstImage = shopifyProduct.images?.edges?.[0]?.node;
  const firstVariant = shopifyProduct.variants?.edges?.[0]?.node;

  // Get all images
  const images = shopifyProduct.images?.edges?.map(({ node }) => ({
    url: node.url,
    alt: node.altText || shopifyProduct.title,
  })) || [];

  // Get category from Shopify's product category (falls back to productType, then "Uncategorized")
  const category = shopifyProduct.category?.name || shopifyProduct.productType || "Uncategorized";

  // Determine badge from tags (set these in Shopify: "new" or "hot")
  let badge = null;
  const tags = shopifyProduct.tags || [];
  if (tags.includes("new")) badge = "new";
  else if (tags.includes("hot")) badge = "hot";

  // Check if product is available (product level or variant level)
  const availableForSale = shopifyProduct.availableForSale ?? firstVariant?.availableForSale ?? true;

  return {
    id: shopifyProduct.id,
    variantId: firstVariant?.id,
    name: shopifyProduct.title,
    category: category,
    price: parseFloat(shopifyProduct.priceRange?.minVariantPrice?.amount || 0),
    badge: badge,
    slug: shopifyProduct.handle,
    image: firstImage?.url || "/placeholder.jpg",
    imageAlt: firstImage?.altText || shopifyProduct.title,
    images: images,
    description: shopifyProduct.description || "",
    descriptionHtml: shopifyProduct.descriptionHtml || "",
    availableForSale: availableForSale,
  };
}

/**
 * Transform Shopify collection to match current category structure
 */
export function transformCollection(shopifyCollection) {
  const productCount = shopifyCollection.products?.edges?.length || 0;

  return {
    id: shopifyCollection.handle,
    name: shopifyCollection.title,
    count: productCount,
    gradient: getGradientForCollection(shopifyCollection.handle),
    image: shopifyCollection.image?.url || "/placeholder.jpg",
    description: shopifyCollection.description || "",
  };
}

/**
 * Get gradient class based on collection handle
 */
function getGradientForCollection(handle) {
  const gradients = {
    snapbacks: "from-mid to-[#0f1f00]",
    beanies: "from-mid to-[#1f1a00]",
    "bucket-hats": "from-mid to-[#001f1a]",
  };
  return gradients[handle] || "from-mid to-[#1a1a1a]";
}

/**
 * Transform cart line item from Shopify cart
 */
export function transformCartLine(line) {
  const variant = line.merchandise;
  const product = variant.product;
  const image = product.images?.edges?.[0]?.node;

  return {
    lineId: line.id,
    variantId: variant.id,
    name: product.title,
    variantTitle: variant.title !== "Default Title" ? variant.title : null,
    price: parseFloat(variant.price.amount),
    quantity: line.quantity,
    image: image?.url || "/placeholder.jpg",
    slug: product.handle,
  };
}

/**
 * Transform full Shopify cart
 */
export function transformCart(shopifyCart) {
  if (!shopifyCart) {
    return {
      id: null,
      checkoutUrl: null,
      items: [],
      subtotal: 0,
      total: 0,
    };
  }

  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    items: shopifyCart.lines.edges.map(({ node }) => transformCartLine(node)),
    subtotal: parseFloat(shopifyCart.cost?.subtotalAmount?.amount || 0),
    total: parseFloat(shopifyCart.cost?.totalAmount?.amount || 0),
  };
}
