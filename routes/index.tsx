import { Head } from "$fresh/runtime.ts";
import { aspectRatio } from "@twind/aspect-ratio";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
import { tw } from "twind";
import IconCart from "../components/IconCart.tsx";
import { Product } from "../utils/types.ts";
import { formatCurrency } from "../utils/utils.ts";

function ProductCard({ product }: { product: Product }) {
  return (
    <a key={product.id} href={`/products/${product.id}`} class="group">
      <div
        class={tw`${
          aspectRatio(1, 1)
        } w-full bg-white rounded-xl overflow-hidden border-2 border-gray-200 transition-all duration-500 relative`}
      >
        {product.featuredImage && (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            width="400"
            height="400"
            class="w-full h-full object-center object-contain absolute block"
          />
        )}
        <div class="w-full h-full flex items-center justify-center bg-[rgba(255,255,255,0.6)] opacity-0 group-hover:opacity-100 transition-all duration-500">
          <IconCart size={30} />
        </div>
      </div>
      <div class="flex items-center justify-between mt-3">
        <h3 class="text-lg text-gray-800 font-medium relative">
          {product.title}
          <span class="bg-gray-800 h-[3px] w-0 group-hover:!w-full absolute bottom-[-2px] left-0 transition-all duration-400" />
        </h3>
        <strong class="text-lg font-bold text-gray-800">
          {formatCurrency(product.priceRange.minVariantPrice)}
        </strong>
      </div>
    </a>
  );
}

export default function Home() {
  const products = [{
    id: "uuid",
    title: "一眼丁真",
    subTitle: "鉴定为",
    description: "纯纯的商品",
    featuredImage: {
      url: "",
      altText: "1",
    },
    images: [{
      url: "",
      altText: "1",
    }, {
      url: "",
      altText: "2",
    }, {
      url: "",
      altText: "3",
    }],
    variants: [{
      id: "114514",
      title: "xl",
      price: {
        amount: 10.2,
        currencyCode: "USD",
      },
      availableForSale: true,
    }, {
      id: "114515",
      title: "xxl",
      price: {
        amount: 12.2,
        currencyCode: "USD",
      },
      availableForSale: true,
    }],
    priceRange: {
      minVariantPrice: {
        amount: 10.2,
        currencyCode: "USD",
      },
      maxVariantPrice: {
        amount: 10.2,
        currencyCode: "USD",
      },
    },
  }, {
    id: "uuid",
    title: "一眼丁真",
    subTitle: "鉴定为",
    description: "纯纯的商品",
    featuredImage: {
      url: "",
      altText: "1",
    },
    images: [{
      url: "",
      altText: "1",
    }, {
      url: "",
      altText: "2",
    }, {
      url: "",
      altText: "3",
    }],
    variants: [{
      id: "114514",
      title: "xl",
      price: {
        amount: 10.2,
        currencyCode: "USD",
      },
      availableForSale: true,
    }, {
      id: "114515",
      title: "xxl",
      price: {
        amount: 12.2,
        currencyCode: "USD",
      },
      availableForSale: true,
    }],
    priceRange: {
      minVariantPrice: {
        amount: 10.2,
        currencyCode: "USD",
      },
      maxVariantPrice: {
        amount: 10.2,
        currencyCode: "USD",
      },
    },
  }, {
    id: "uuid",
    title: "一眼丁真",
    subTitle: "鉴定为",
    description: "纯纯的商品",
    featuredImage: {
      url: "",
      altText: "1",
    },
    images: [{
      url: "",
      altText: "1",
    }, {
      url: "",
      altText: "2",
    }, {
      url: "",
      altText: "3",
    }],
    variants: [{
      id: "114514",
      title: "xl",
      price: {
        amount: 10.2,
        currencyCode: "USD",
      },
      availableForSale: true,
    }, {
      id: "114515",
      title: "xxl",
      price: {
        amount: 12.2,
        currencyCode: "USD",
      },
      availableForSale: true,
    }],
    priceRange: {
      minVariantPrice: {
        amount: 10.2,
        currencyCode: "USD",
      },
      maxVariantPrice: {
        amount: 10.2,
        currencyCode: "USD",
      },
    },
  }];
  return (
    <>
      <Head>
        <title>Nintendo Shop</title>
      </Head>
      <Header />
      <div
        class="w-11/12 max-w-5xl mx-auto mt-28"
        aria-labelledby="information-heading"
      >
        <h2 id="information-heading" class="sr-only">
          Product List
        </h2>
        <div class="grid grid-cols-1 gap-8 sm:!gap-x-10 sm:!grid-cols-2 lg:!grid-cols-3 lg:!gap-x-12 lg:!gap-y-10">
          {products.map((product) => <ProductCard product={product} />)}
        </div>
      </div>
      <Footer />
    </>
  );
}
