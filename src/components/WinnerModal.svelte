<script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { gameState } from "$lib/stores";
  import { House, Medal } from "lucide-svelte";

  let { isOpen } = $props();
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
        (exit ? "animate-hinge" : "animate-lightSpeedInLeft")}
    >
      <div class=" p-4 relative rounded-t-md">
        <div
          class="bg-yellow-300 w-10 h-10 flex justify-center items-center border-2 border-black rounded-full absolute top-0 -translate-y-1/2 -left-5 text-xl"
        >
          <Medal color="#000000" />
        </div>
        <h2 class="text-center text-2xl font-semibold lg:text-6xl">
          ÕNNITLUSED!
        </h2>
        <h2 class="text-center text-xl lg:text-4xl">
          {$gameState.players.active[0].name} on võitnud!
        </h2>
      </div>
      <div class="mt-3 flex justify-center p-4 rounded-b-md">
        <button
          onclick={() => {
            exit = true;
            setTimeout(() => {
              exit = false;
              close();
              $gameState.phase = "settings";
            }, 2500);
          }}
          aria-label="Back to Start"
          class="bg-yellow-300 font-semibold poppins px-4 py-2 rounded-lg border-2 border-black disabled:opacity-50 hover:bg-yellow-200 lg:text-4xl"
          ><House /></button
        >
      </div>
    </div>
  </div>
{/if}
