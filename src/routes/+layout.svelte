<script>
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { i18n } from '$lib/i18n'

  import "../app.css";
  import { SvelteToast } from "@zerodevx/svelte-toast";


</script>
<ParaglideJS {i18n}>


<SvelteToast />
<slot />

</ParaglideJS>