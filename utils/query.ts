import { IS_BROWSER } from "$fresh/src/runtime/utils.ts";
import { AuthTokenKey, BACKEND_PREFIX } from "../data/consts.ts";

// This query is executed both on server and client
export async function graphql<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  let headers: {
    "Content-Type": string;
    "Authorization"?: string;
  } = {
    "Content-Type": "application/json",
  };
  if (IS_BROWSER) {
    headers = {
      ...headers,
      "Authorization": `Bearer ${localStorage.getItem(AuthTokenKey)}`,
    };
  }
  const res = await fetch(`${BACKEND_PREFIX}/graphql`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${body}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: Error) => e.message).join("\n"));
  }
  return json.data as T;
}
