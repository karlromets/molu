<script>
  import Settings from "../../components/Settings.svelte";
  import Game from "../../components/Game.svelte";
  import {gameState} from "$lib/stores";

  $effect(() => {
    console.log($gameState);
  })
</script>


<main class="bg-sky-400 relative w-full min-h-screen -z-0">
  {#if $gameState.phase == "settings"}
    <Settings />
  {:else if $gameState.phase == "game"}
    <Game />
  {:else}
    <h1>error</h1>
  {/if}
</main>
