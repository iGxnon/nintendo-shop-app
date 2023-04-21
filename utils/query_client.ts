import { AuthTokenKey, BACKEND_PREFIX_CLIENT } from "../data/consts.ts";

export async function graphql<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const headers: {
    "Content-Type": string;
    "Authorization": string;
  } = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem(AuthTokenKey)}`,
  };
  const res = await fetch(`${BACKEND_PREFIX_CLIENT}/graphql`, {
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