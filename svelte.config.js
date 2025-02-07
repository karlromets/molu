import adapter from "@sveltejs/adapter-vercel";
import {vitePreprocess} from "@sveltejs/vite-plugin-svelte";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
			$paraglide: './src/paraglide',
      $components: './src/components',
      $src: './src/',
		}
  },
  preprocess: vitePreprocess(),
};
export default config;
