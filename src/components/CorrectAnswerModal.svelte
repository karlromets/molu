<script>
  import {gameState} from "$lib/stores";
  import { Check, Play } from "lucide-svelte";
  import * as m from "$lib/paraglide/messages.js";

  let {isOpen, player, word, nextPlayer, close} = $props();
  let exit = $state(false);
</script>

{#if isOpen}
  <div
    role="dialog"
    class="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-10 pointer-events-none backdrop-blur-md n"
  >
    <div
      class={"min-w-[240px] sm:w-[380px] lg:w-fit rounded-md bg-white flex flex-col justify-between pointer-events-auto border-2 border-black " + (exit ? 'animate-lightSpeedOutRight' : 'animate-lightSpeedInLeft')}
    >
      <div
        class="bg-neutral-200 p-4 lg:py-6 border-b-2 border-black relative rounded-t-md"
      >
        <div
          class="bg-green-500 w-10 h-10 flex justify-center items-center border-2 border-black rounded-full absolute top-0 -translate-y-1/2 -left-5 text-xl"
        >
        <Check color="#ffffff" />
        </div>
        <h2 class="text-center text-2xl lg:text-6xl font-semibold">{m.correct()}</h2>
      </div>
      <div class="p-4">
        <ul class="list-disc list-inside text-sm sm:text-base lg:text-4xl">
          <li>
            {$gameState.players.active[player].name} {m.player_eliminated({ name: $gameState.players.active[player].name, word })}
          </li>
          <li>{m.next_player({ player: nextPlayer })}</li>
        </ul>
      </div>
      <div
        class="mt-8 flex justify-end bg-neutral-200 p-4 border-t-2 border-black rounded-b-md"
      >
        <button
          onclick={() => {
            exit = true;
            setTimeout(() => {
              exit = false;
              close();
              $gameState.state = "countdown";
            }, 1200);
          }}
          class="bg-yellow-300 hover:bg-yellow-200 font-semibold poppins px-4 py-2 rounded-lg border-2 border-black lg:text-4xl flex items-center gap-1"
          >{m.play()} <Play /></button
        >
      </div>
    </div>

  </div>
{/if}
