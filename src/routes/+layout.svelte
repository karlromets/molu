<script>
  import "../app.css";
  import {Modals} from "svelte-modals";
  import {SvelteToast} from "@zerodevx/svelte-toast";
</script>

<SvelteToast />
<!-- svelte-ignore a11y_no_static_element_interactions -->
<Modals>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  {#snippet backdrop({ close })}
  <div slot="backdrop" on:click={() => close()}></div>
  {/snippet}
</Modals>
<slot />