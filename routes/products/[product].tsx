import {Handlers, PageProps} from "$fresh/server.ts";
import {Footer} from "../../components/Footer.tsx";
import {Header} from "../../components/Header.tsx";
import {ProductDetailQuery} from "../../data/consts.ts";
import ProductDetails from "../../islands/ProductDetails.tsx";
import {graphql} from "../../utils/query_server.ts";
import {Product} from "../../utils/types.ts";

export const handler: Handlers<{
    product: Product | null;
}> = {
    async GET(_req, ctx) {
        const data = await graphql<{
            product: Product | null;
        }>(
            `query ($pid: ID!) { product(id: $pid) ${ProductDetailQuery} }`,
            {
                pid: ctx.params.product,
            },
        );
        if (!data.product) {
            return new Response("Product not found", {status: 404});
        }
        return ctx.render(data);
    },
};

export default function ProductPage(
    ctx: PageProps<{
        product: Product | null;
    }>,
) {
    const {data} = ctx;
    if (!data.product) {
        return <div>Product not found</div>;
    }
    return (
        <>
            <Header/>
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
                product={data.product!}
            />
            <Footer/>
        </>
    );
}
