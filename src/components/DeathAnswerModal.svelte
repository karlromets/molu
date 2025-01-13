<script>
  import {slide} from "svelte/transition";
  import {quintOut} from "svelte/easing";
  import {gameState} from "$lib/stores";

  let {isOpen, player, word, nextPlayer, close} = $props();
  let exit = $state(false);
</script>

{#if isOpen}
  <div
    transition:slide={{
      delay: 250,
      duration: 300,
      easing: quintOut,
      axis: "x",
    }}
    role="dialog"
    class="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-10 pointer-events-none backdrop-blur-md"
  >
    <div
      class={"min-w-[240px] lg:w-fit rounded-md bg-white flex flex-col justify-between pointer-events-auto border-2 border-black " +
        (exit ? "animate-lightSpeedOutRight" : "animate-lightSpeedInLeft")}
    >
      <div
        class="bg-neutral-200 p-4 border-b-2 border-black relative rounded-t-md"
      >
        <div
          class="bg-red-500 w-10 h-10 flex justify-center items-center border-2 border-black rounded-full absolute top-0 -translate-y-1/2 -left-5 text-xl"
        >
          <i class="fa-solid fa-xmark text-white"></i>
        </div>
        <h2 class="text-center text-2xl font-semibold lg:text-6xl">VALE!</h2>
      </div>
      <div class="p-4">
        <ul class="list-disc list-inside text-sm sm:text-base lg:text-4xl">
          <li class="mb-2">
            {player.name} arvas sõna <b>{word}</b>
            valesti ja langes mängust välja!
          </li>
          <li class="mb-2">
            Järgmine mängija on <b>{nextPlayer}</b>!
          </li>
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
              $gameState = "countdown";
            }, 1200);
          }}
          class="bg-yellow-300 font-semibold poppins px-4 py-2 rounded-lg border-2 border-black disabled:opacity-50 lg:text-4xl"
          >MÄNGI <i class="fa-solid fa-play"></i></button
        >
      </div>
    </div>
  </div>
{/if}
