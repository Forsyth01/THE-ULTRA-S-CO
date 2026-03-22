const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Use 2024-04 API version (stable)
const endpoint = `https://${domain}/api/2024-04/graphql.json`;

export async function shopifyFetch({ query, variables = {} }) {
  if (!domain || !storefrontAccessToken) {
    console.error("Missing Shopify configuration:", { domain, hasToken: !!storefrontAccessToken });
    throw new Error(
      "Missing Shopify configuration. Please set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local"
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error("Shopify API Error Details:", JSON.stringify(json.errors, null, 2));
      throw new Error(json.errors[0]?.message || "Shopify API error");
    }

    return json.data;
  } catch (error) {
    console.error("Shopify fetch error:", error.message);
    throw error;
  }
}
