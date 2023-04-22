import useSWR, { mutate } from "swr";
import { CartData } from "../utils/types.ts";
import { CartIdKey, CartQuery } from "./consts.ts";
import { graphql } from "../utils/query_client.ts";

async function fetcher(): Promise<CartData> {
  const id = localStorage.getItem(CartIdKey);
  if (id == null) {
    const { createCart } = await graphql<
      { createCart: { cart: CartData } }
    >(
      `mutation { createCart { cart ${CartQuery}} }`,
    );
    localStorage.setItem(CartIdKey, createCart.cart.id);
    return createCart.cart;
  }
  const { cart } = await graphql<
    { cart: CartData | null }
  >(
    `query($id: ID!) { cart(id: $id) ${CartQuery} }`,
    { id },
  );
  if (cart === null) {
    // remove and get a new one
    localStorage.removeItem(CartIdKey);
    return fetcher();
  }
  return cart;
}

export function useCart() {
  return useSWR<CartData, Error>("cart", fetcher, { keepPreviousData: true });
}

export async function addToCart(cartId: string, variantId: string) {
  const mutation = graphql<{ cart: CartData }>(
    `mutation add($cartId: ID!, $variantId: ID!) { addToCart(cartId: $cartId, variantId: $variantId) { cart ${CartQuery} } }`,
    {
      cartId,
      variantId,
    },
  ).then(({ cart }) => cart);
  await mutate("cart", mutation);
}

export async function removeFromCart(cartId: string, entryId: string) {
  const mutation = graphql<{ cart: CartData }>(
    `mutation remove($cartId: ID!, $entryId: ID!) { removeCartEntryWithId(cartId: $cartId, entryId: $entryId) { cart ${CartQuery} } }`,
    {
      cartId,
      entryId,
    },
  ).then(({ cart }) => cart);
  await mutate("cart", mutation);
}
