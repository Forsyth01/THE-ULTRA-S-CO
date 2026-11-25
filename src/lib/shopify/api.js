import { shopifyFetch } from "../shopify";
import { transformProduct, transformCollection } from "./transformers";
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_COLLECTIONS,
  GET_COLLECTION_BY_HANDLE,
  SEARCH_PRODUCTS,
} from "./queries";
import {
  products as localProducts,
  collections as localCollections,
} from "@/data/products";

/**
 * Run a Shopify request, falling back to the local catalog if the store can't be reached
 */
async function withLocalFallback(request, fallback) {
  try {
    return await request();
  } catch (error) {
    console.warn("Shopify unavailable, using local catalog:", error.message);
    return fallback();
  }
}

/**
 * Get all products from Shopify
 */
export async function getAllProducts(limit = 50) {
  return withLocalFallback(
    async () => {
      const data = await shopifyFetch({
        query: GET_PRODUCTS,
        variables: { first: limit },
      });

      return data.products.edges.map(({ node }) => transformProduct(node));
    },
    () => localProducts.slice(0, limit)
  );
}

/**
 * Get a single product by handle (slug)
 */
export async function getProductByHandle(handle) {
  return withLocalFallback(
    async () => {
      const data = await shopifyFetch({
        query: GET_PRODUCT,
        variables: { handle },
      });

      if (!data.product) return null;
      return transformProduct(data.product);
    },
    () => localProducts.find((p) => p.slug === handle) ?? null
  );
}

/**
 * Get all collections from Shopify
 */
export async function getAllCollections() {
  return withLocalFallback(
    async () => {
      const data = await shopifyFetch({
        query: GET_COLLECTIONS,
        variables: { first: 20 },
      });

      return data.collections.edges.map(({ node }) => transformCollection(node));
    },
    () => [...localCollections]
  );
}

/**
 * Get a collection by handle with its products
 */
export async function getCollectionByHandle(handle, productLimit = 50) {
  return withLocalFallback(
    async () => {
      const data = await shopifyFetch({
        query: GET_COLLECTION_BY_HANDLE,
        variables: { handle, first: productLimit },
      });

      if (!data.collection) return null;

      return {
        collection: transformCollection(data.collection),
        products: data.collection.products.edges.map(({ node }) =>
          transformProduct(node)
        ),
      };
    },
    () => {
      const collection = localCollections.find((c) => c.id === handle);
      if (!collection) return null;

      return {
        collection,
        products: localProducts
          .filter((p) => p.category === collection.name)
          .slice(0, productLimit),
      };
    }
  );
}

/**
 * Search products by query
 */
export async function searchProducts(query, limit = 20) {
  return withLocalFallback(
    async () => {
      const data = await shopifyFetch({
        query: SEARCH_PRODUCTS,
        variables: { query, first: limit },
      });

      return data.products.edges.map(({ node }) => transformProduct(node));
    },
    () => {
      const term = query.toLowerCase();
      return localProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        )
        .slice(0, limit);
    }
  );
}
