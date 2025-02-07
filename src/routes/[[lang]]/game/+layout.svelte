<script>
    import "../../../app.css";
    import {Modals} from "svelte-modals";
    import {gameState} from "$lib/stores"; 

    const handleKeyDown = (close, event) => {
    if (event.key === 'Escape') {
      close();
    }
  };
  </script>
  
  <Modals>
    {#snippet backdrop({ close })}
    <div
      slot="backdrop"
      role="button"
      tabindex="0"
      aria-label="Close modal"
      onclick={() => close()}
      onkeydown={(e) => handleKeyDown(close, e)}
    ></div>
  {/snippet}
</Modals>
  
  <div class={`fixed inset-0 -z-10 ${$gameState.phase === "game" ? '' : 'hidden'}`}>
      <div class="absolute inset-0 h-full w-full bg-sky-500 opacity-100"></div>
      <div class="absolute inset-0 h-full w-full bg-[radial-gradient(#fde047_1px,transparent_1px)] dark:bg-[radial-gradient(#fde047_3px,transparent_3px)] [background-size:28px_28px] opacity-70"></div>
    </div>
    <slot />