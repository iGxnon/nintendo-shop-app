import {tw} from "twind";
import {formatCurrency} from "../utils/utils.ts";
import {css} from "twind/css";
import {aspectRatio} from "@twind/aspect-ratio";
import {Product} from "../utils/types.ts";
import {useState} from "preact/hooks";
import {addToCart, useCart} from "../data/cart.ts";

function AddToCart(props: { id: string }) {
    const {data} = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const add = (e: MouseEvent) => {
        e.preventDefault();
        setIsAdding(true);
        addToCart(data!.id, props.id).finally(() => {
            setIsAdding(false);
        });
    };

    return (
        <button
            onClick={add}
            disabled={!data && !isAdding}
            class={`w-full ${
                isAdding ? "!bg-gray-400" : "bg-gray-700"
            } border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900`}
        >
            {isAdding ? "Adding..." : "Add to Cart"}
        </button>
    );
}

export default function ProductDetails({product}: { product: Product }) {
    const descriptionStyles = css({
        "a": {
            color: "#056CF0",
        },
        "a:hover": {
            textDecoration: "underline",
        },
    });

    const [variant, setVariant] = useState(product.variants[0]);
    let index = 0;

    function changeImage(delta: number) {
        if (!product.images) return;

        index += delta;
        if (index < 0) {
            index = product.images.length - 1;
        } else if (index >= product.images.length) {
            index = 0;
        }

        const newImage = product.images[index];
        const imageElement = document.querySelector(
            "#productImage",
        ) as HTMLImageElement;

        imageElement.src = newImage.url;

        if (newImage.altText) {
            imageElement.alt = newImage.altText;
        }
    }

    return (
        <div class="w-11/12 max-w-5xl mx-auto mt-8 lg:grid lg:grid-cols-2 lg:gap-x-16">
            {/* Product details */}
            <div>
                <div class="flex flex-col gap-4">
                    <div class="w-full flex items-center justify-between gap-4">
                        <hgroup>
                            <h2 class="text-xl lg:!text-2xl font-semibold text-gray-800">
                                {product.title}
                            </h2>
                            <h3 class="text-gray-500 text-base leading-tight">
                                {product.subTitle}
                            </h3>
                        </hgroup>
                        <div class="bg-[#E8E7E5] rounded-full px-6 py-2 text-lg text-gray-900 font-bold">
                            {formatCurrency(variant.price)}
                        </div>
                    </div>
                </div>

                <section
                    aria-labelledby="information-heading"
                    class="mt-12 pt-6 border-t-1 border-gray-200"
                >
                    <h2 id="information-heading" class="sr-only">
                        Product information
                    </h2>

                    {!variant.availableForSale && (
                        <div class="flex items-center">
                            <p class="text-base text-gray-500">
                                Out of stock
                            </p>
                        </div>
                    )}

                    <div class="mt-4 space-y-6">
                        <p
                            class={tw`text-base text-gray-600 ${descriptionStyles}`}
                            dangerouslySetInnerHTML={{__html: product.description}}
                        >
                        </p>
                    </div>
                </section>
            </div>

            {/* Product image */}
            <div
                class={tw`${
                    aspectRatio(1, 1)
                } w-full bg-white rounded-xl border-2 border-gray-200 mt-12 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-start`}
            >
                <div class="rounded-lg overflow-hidden">
                    {product.featuredImage && (
                        <img
                            id="productImage"
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText}
                            width="400"
                            height="400"
                            class="w-full h-full object-center object-contain"
                        />
                    )}

                    {(product?.images?.length ?? 0) > 1 && (
                        <div>
                            <button
                                class="absolute w-16 opacity-50 hover:opacity-100 top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                                type="button"
                                onClick={() => {
                                    changeImage(-1);
                                }}
                            >
                <span
                    class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                      aria-hidden="true"
                      class="w-6 h-6 text-gray-800 dark:text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                    >
                    </path>
                  </svg>
                  <span class="sr-only">Previous</span>
                </span>
                            </button>
                            <button
                                class="absolute w-16 opacity-50 hover:opacity-100 top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                                type="button"
                                onClick={() => {
                                    changeImage(1);
                                }}
                            >
                <span
                    class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                      aria-hidden="true"
                      class="w-6 h-6 text-gray-800 dark:text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    >
                    </path>
                  </svg>
                  <span class="sr-only">Next</span>
                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Product form */}
            <div class="mt-12 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
                <section aria-labelledby="options-heading">
                    {product.variants.length > 1 && (
                        <div class="group">
                            <div
                                class="relative p-4 flex items-center justify-between rounded-lg border-2 border-gray-300 group-hover:border-gray-400 transition-colors">
                                <span>{/* space holderplace, don't remove */}</span>
                                <span class="text-gray-400 group-hover:text-gray-600 transition-colors">
                  <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M5 5.85716L8 3.00002L11 5.85716"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M11 10.1429L8 13L5 10.1429"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>
                </span>
                                <select
                                    onChange={(e) =>
                                        setVariant(
                                            JSON.parse((e.target as HTMLSelectElement).value),
                                        )}
                                    class="absolute pl-4 top-0 left-0 block w-full h-full rounded-lg appearance-none bg-transparent cursor-pointer"
                                >
                                    {product.variants.map((variant) => {
                                        return (
                                            <option value={JSON.stringify(variant)}>
                                                {variant.title}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    )}
                    {variant.availableForSale && (
                        <div class="mt-4">
                            <AddToCart id={variant.id}/>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
