<script>
  import {closeModal} from "svelte-modals";
  import {gameState, gamePlayers} from "$lib/stores";

  export let isOpen;
  export let player, word, nextPlayer;

  let exit = false;
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
          <i class="fa-solid fa-check text-white"></i>
        </div>
        <h2 class="text-center text-2xl lg:text-6xl font-semibold">ÕIGE!</h2>
      </div>
      <div class="p-4">
        <ul class="list-disc list-inside text-sm sm:text-base lg:text-4xl">
          <li>
            {$gamePlayers.players[player].name} arvas sõna <b>{word}</b> õigesti!
          </li>
          <li>Järgmine mängija on <b>{nextPlayer}</b>!</li>
        </ul>
      </div>
      <div
        class="mt-8 flex justify-end bg-neutral-200 p-4 border-t-2 border-black rounded-b-md"
      >
        <button
          on:click={() => {
            exit = true;
            setTimeout(() => {
              exit = false;
              closeModal();
              $gameState = "countdown";
            }, 1200);
          }}
          class="bg-yellow-300 hover:bg-yellow-200 font-semibold poppins px-4 py-2 rounded-lg border-2 border-black lg:text-4xl"
          >MÄNGI <i class="fa-solid fa-play"></i></button
        >
      </div>
    </div>
  </div>
{/if}
