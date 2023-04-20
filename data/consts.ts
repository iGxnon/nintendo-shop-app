export const CartIdKey = "cartId";
export const AuthTokenKey = "authToken";
export const BACKEND_PREFIX = "https://shop.skygard.cn/api/v1";
export const CartQuery = `{
  id
  entries {
    id
    quantity
    product {
      title
      featuredImage {
        url
        altText
      }
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  totalAmount {
    amount
    currencyCode
  }
}`;
export const ProductDetailQuery = `{
  id
  title
  subTitle
  description
  featuredImage {
    url
    altText
  }
  images {
    url
    altText
  }
  variants {
    id
    price {
      amount
      currencyCode
    }
    title
    availableForSale
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
    maxVariantPrice {
      amount
      currencyCode
    }
  }
}`;
