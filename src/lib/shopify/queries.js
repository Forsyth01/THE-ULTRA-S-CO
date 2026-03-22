// Get all products
export const GET_PRODUCTS = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          productType
          tags
          category {
            name
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Get single product by handle
export const GET_PRODUCT = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      productType
      tags
      category {
        name
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

// Get all collections
export const GET_COLLECTIONS = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
            width
            height
          }
          products(first: 100) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

// Get collection by handle with products
export const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            productType
            tags
            category {
              name
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
