import { Footer } from "../../components/Footer.tsx";
import { Header } from "../../components/Header.tsx";
import ProductDetails from "../../islands/ProductDetails.tsx";

export default function ProductPage() {
  return (
    <>
      <Header />
      <div class="w-11/12 mt-16 max-w-5xl mx-auto flex items-center justify-between relative">
        <a
          href="/"
          class="flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.64977 3.35029C4.92235 3.07771 5.36409 3.07709 5.63743 3.34891V3.34891C5.912 3.62195 5.91244 4.06613 5.63841 4.33972L2.68999 7.28342L15.2789 7.28342C15.6746 7.28342 15.9954 7.60424 15.9954 8V8C15.9954 8.39576 15.6746 8.71658 15.2789 8.71658L2.68999 8.71658L5.639 11.6656C5.91254 11.9391 5.9113 12.383 5.63624 12.655V12.655C5.36334 12.9249 4.92371 12.9237 4.65232 12.6523L0.353606 8.35355C0.158344 8.15829 0.158345 7.84171 0.353607 7.64644L4.64977 3.35029Z"
              fill="currentColor"
            />
          </svg>
          Back to shop
        </a>
      </div>
      <ProductDetails
        product={{
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
        }}
      />
      <Footer />
    </>
  );
}