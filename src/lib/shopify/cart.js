import { shopifyFetch } from "../shopify";

// Cart fragment for consistent response structure
const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
  }
`;

// Create a new cart
const CREATE_CART = `
  mutation createCart($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`;

// Add lines to existing cart
const ADD_TO_CART = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`;

// Update line quantities
const UPDATE_CART = `
  mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`;

// Remove lines from cart
const REMOVE_FROM_CART = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`;

// Get existing cart
const GET_CART = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;

/**
 * Create a new cart with initial items
 */
export async function createCart(lines) {
  const data = await shopifyFetch({
    query: CREATE_CART,
    variables: { lines },
  });
  return data.cartCreate.cart;
}

/**
 * Add items to existing cart
 */
export async function addToCart(cartId, lines) {
  const data = await shopifyFetch({
    query: ADD_TO_CART,
    variables: { cartId, lines },
  });
  return data.cartLinesAdd.cart;
}

/**
 * Update line quantities
 */
export async function updateCart(cartId, lines) {
  const data = await shopifyFetch({
    query: UPDATE_CART,
    variables: { cartId, lines },
  });
  return data.cartLinesUpdate.cart;
}

/**
 * Remove items from cart
 */
export async function removeFromCart(cartId, lineIds) {
  const data = await shopifyFetch({
    query: REMOVE_FROM_CART,
    variables: { cartId, lineIds },
  });
  return data.cartLinesRemove.cart;
}

/**
 * Get cart by ID
 */
export async function getCart(cartId) {
  const data = await shopifyFetch({
    query: GET_CART,
    variables: { cartId },
  });
  return data.cart;
}
