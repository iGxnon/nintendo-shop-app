import { animation, css } from "twind/css";
import { useRef } from "preact/hooks";
import IconCart from "../components/IconCart.tsx";
import { tw } from "twind";
import { CartData, CartEntry } from "../utils/types.ts";
import { removeFromCart, useCart } from "../data/cart.ts";
import { formatCurrency } from "../utils/utils.ts";

const slideRight = animation("0.4s ease normal", {
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0)" },
});

const slideBottom = animation("0.4s ease normal", {
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" },
});

const backdrop = css({
  "&::backdrop": {
    background: "rgba(0, 0, 0, 0.5)",
  },
});

function CartItem(props: { cartId: string; cart: CartEntry }) {
  const entry = props.cart;
  const remove = (e: Event) => {
    e.preventDefault();
    removeFromCart(props.cartId, entry.id);
  };
  return (
    <li class="flex py-6">
      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={entry.product.featuredImage?.url}
          alt={entry.product.featuredImage?.altText ?? entry.product.title}
          class="h-full w-full object-cover object-center"
        />
      </div>
      <div class="ml-4 flex flex-1 flex-col">
        <div class="flex justify-between text-base font-medium text-gray-900">
          <h3>{entry.product.title}</h3>
          <p class="ml-4">
            {formatCurrency(entry.totalAmount)}
          </p>
        </div>
        <div class="flex flex-1 items-end justify-between text-sm">
          <p class="text-gray-500">
            Quantity <strong>{entry.quantity}</strong>
          </p>

          <div class="flex">
            <button
              type="button"
              class="font-medium"
              onClick={remove}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function CartInner(props: { cart: CartData | undefined }) {
  const corners = "rounded(tl-2xl tr-2xl sm:(tr-none bl-2xl))";
  const card =
    `py-8 px-6 h-full bg-white ${corners} flex flex-col justify-between`;
  if (!props.cart) {
    return <div>Error: No cart</div>;
  }
  const cartId = props.cart.id;
  const checkout = (e: Event) => {
    e.preventDefault();
    window.location.href = `/checkout/${props.cart!.id}`;
  };
  return (
    <div class={card}>
      <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Shopping Cart</h2>
        <button
          class="py-1"
          onClick={(e) => {
            (e.target as HTMLButtonElement).closest("dialog")!.close();
          }}
        >
          <svg
            class="w-6 h-6 fill-current text-gray-600"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
      <div class="flex-grow-1 my-4 overflow-auto">
        {props.cart.entries.length === 0
          ? <p class="text-gray-700">There are no items in the cart.</p>
          : (
            <ul role="list" class="-my-6 divide-y divide-gray-200">
              {props.cart.entries.map((entry) => (
                <CartItem cartId={cartId} cart={entry} />
              ))}
            </ul>
          )}
      </div>
      <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
        <div class="flex justify-between text-lg font-medium">
          <p>Subtotal</p>
          <p>{formatCurrency(props.cart.totalAmount)}</p>
        </div>
        <p class="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div class="mt-6">
          <button
            type="button"
            class="w-full bg-gray-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700"
            disabled={props.cart.entries.length === 0}
            onClick={checkout}
          >
            Checkout
          </button>
        </div>
        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or&nbsp;
            <button
              type="button"
              class="font-medium"
              onClick={(e) => {
                (e.target as HTMLButtonElement).closest("dialog")!.close();
              }}
            >
              Continue Shopping <span aria-hidden="true">&rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export function CartSimple({ cart }: { cart: CartData }) {
  return (
    <div class="h-[70%] overflow-auto bg-white rounded-md">
      <div class="py-8 px-6 h-full flex flex-col justify-between">
        <div class="flex justify-between">
          <h2 class="text-lg font-medium text-gray-900">Shopping Cart</h2>
        </div>
        <div class="flex-grow-1 my-4">
          {cart.entries.length === 0
            ? <p class="text-gray-700">There are no items in the cart.</p>
            : (
              <ul role="list" class="-my-6 divide-y divide-gray-200">
                {cart.entries.map((entry) => (
                  <CartItem cartId={cart.id} cart={entry} />
                ))}
              </ul>
            )}
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const ref = useRef<HTMLDialogElement | null>(null);
  const { data, error } = useCart();
  
  const onDialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName === "DIALOG") {
      ref.current!.close();
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <button
        onClick={() => ref.current!.showModal()}
        class="flex items-center gap-2 items-center border-2 border-gray-800 rounded-full px-5 py-1 font-semibold text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300"
      >
        <IconCart />
        {data?.entries.length ?? "0"}
      </button>
      <dialog
        ref={ref}
        class={tw`bg-transparent p-0 m-0 pt-[50%] sm:pt-0 sm:ml-auto max-w-full sm:max-w-lg w-full max-h-full h-full ${slideBottom} sm:${slideRight} ${backdrop}`}
        onClick={onDialogClick}
      >
        <CartInner cart={data} />
      </dialog>
    </div>
  );
}
