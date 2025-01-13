<script>
  import "../app.css";
  import {Modals, closeModal} from "svelte-modals";
  import {SvelteToast} from "@zerodevx/svelte-toast";
</script>

<SvelteToast />
<!-- svelte-ignore a11y-no-static-element-interactions -->
<Modals>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div slot="backdrop" on:click={closeModal} ></div>
</Modals>
<slot />