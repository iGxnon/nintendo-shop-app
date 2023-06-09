import {Money} from "./types.ts";

export function formatCurrency(amount: Money) {
    const intl = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: amount.currencyCode,
    });
    return intl.format(amount.amount);
}
