import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import htmlMinifierAdaptor from 'sveltekit-html-minifier';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: htmlMinifierAdaptor(
			adapter({
				// default options are shown. On some platforms
				// these options are set automatically — see below
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: true,
				trailingSlash: 'always'
			}),
			{
				pages: 'build',
				minifierOptions: {
					caseSensitive: true,
					collapseBooleanAttributes: true,
					collapseInlineTagWhitespace: true,
					collapseWhitespace: true,
					decodeEntities: true,
					minifyCSS: true,
					minifyJS: true,
					preventAttributesEscaping: true,
					processConditionalComments: true,
					removeAttributeQuotes: true,
					removeComments: true,
					removeEmptyAttributes: true,
					// removeEmptyElements: true, <= Break background
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					trimCustomFragments: true,
					useShortDoctype: true
				}
			}
		)
	}
};

export default config;
