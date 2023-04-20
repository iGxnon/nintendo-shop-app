import BrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx";

export function Footer() {
  return (
    <footer class="w-11/12 max-w-5xl mx-auto mt-24 sm:!mt-28 mb-8 flex items-center justify-between">
      <span class="flex items-center gap-4">
        <a
          class="flex items-center gap-2 text-gray-700"
          href="https://fresh.deno.dev"
        >
          <a href="https://fresh.deno.dev">
            <img
              width="197"
              height="37"
              src="/fresh-badge.svg"
            />
          </a>
        </a>
        <a
          class="hover:underline flex gap-2 items-center"
          href="https://github.com/denoland/merch"
        >
          <BrandGithub />
          Source
        </a>
      </span>
      <a
        class="text-sm text-gray-400 hidden items-center gap-2 sm:!flex"
        href="https://merch.deno.com/"
      >
        Inspired by
        <span class="text-gray-600 hover:underline">
          Deno Merch
        </span>
      </a>
    </footer>
  );
}
