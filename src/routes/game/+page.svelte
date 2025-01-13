<script>
  import Settings from "../../components/Settings.svelte";
  import Game from "../../components/Game.svelte";
  import {phase} from "$lib/stores";
</script>


<main class="bg-sky-400 relative w-full min-h-screen -z-0">
  {#if $phase == "settings"}
    <Settings />
  {:else if $phase == "game"}
    <Game />
  {:else}
    <h1>error</h1>
  {/if}
</main>
