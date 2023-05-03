import {PageProps} from "$fresh/server.ts";

import {Head} from "$fresh/runtime.ts";
import {Header} from "../../components/Header.tsx";
import {Footer} from "../../components/Footer.tsx";
import Checkout from "../../islands/Checkout.tsx";

export default function Checkouts(props: PageProps) {
    const cartId = props.params.id;

    return (
        <>
            <Head>
                <title>Checkout</title>
            </Head>
            <Header showCart={false}/>
            <Checkout/>
            <Footer/>
        </>
    );
}
