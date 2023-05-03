export interface Money {
    amount: number;
    currencyCode: string;
}

export interface Image {
    url: string;
    altText: string;
}

// Different variants of a product have a price range.
export interface ProductPriceRange {
    minVariantPrice: Money;
    maxVariantPrice: Money;
}

export interface ProductVariant {
    id: string;
    price: Money;
    title: string;
    availableForSale: boolean;
}

export interface Product {
    id: string;
    title: string;
    subTitle: string;
    description: string;
    featuredImage: Image | null;
    images?: Image[];
    variants: ProductVariant[];
    priceRange: ProductPriceRange;
}

export interface CartEntry {
    id: string;
    quantity: number;
    product: {
        title: string;
        featuredImage: Image | null;
        variants: {
            title: string;
            orderIdx: number;
        }[];
    };
    variantAt: number;
    totalAmount: Money;
}

export interface CartData {
    id: string;
    entries: CartEntry[];
    totalAmount: Money; // without shipment amount
}
