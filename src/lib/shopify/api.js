import { shopifyFetch } from "../shopify";
import { transformProduct, transformCollection } from "./transformers";
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_COLLECTIONS,
  GET_COLLECTION_BY_HANDLE,
  SEARCH_PRODUCTS,
} from "./queries";

/**
 * Get all products from Shopify
 */
export async function getAllProducts(limit = 50) {
  const data = await shopifyFetch({
    query: GET_PRODUCTS,
    variables: { first: limit },
  });

  return data.products.edges.map(({ node }) => transformProduct(node));
}

/**
 * Get a single product by handle (slug)
 */
export async function getProductByHandle(handle) {
  const data = await shopifyFetch({
    query: GET_PRODUCT,
    variables: { handle },
  });

  if (!data.product) return null;
  return transformProduct(data.product);
}

/**
 * Get all collections from Shopify
 */
export async function getAllCollections() {
  const data = await shopifyFetch({
    query: GET_COLLECTIONS,
    variables: { first: 20 },
  });

  return data.collections.edges.map(({ node }) => transformCollection(node));
}

/**
 * Get a collection by handle with its products
 */
export async function getCollectionByHandle(handle, productLimit = 50) {
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
}

/**
 * Search products by query
 */
export async function searchProducts(query, limit = 20) {
  const data = await shopifyFetch({
    query: SEARCH_PRODUCTS,
    variables: { query, first: limit },
  });

  return data.products.edges.map(({ node }) => transformProduct(node));
}
