<script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { gameState } from "$lib/stores";
  import heart from "../assets/heart.png";
  import { tods } from "../assets/tods.js";
  import WinnerModal from "../components/WinnerModal.svelte";
  import { modals } from "svelte-modals";
  import { Check, Play, Shell } from "lucide-svelte";
  import * as m from "$lib/paraglide/messages.js";
  import { languageTag } from "$lib/paraglide/runtime.js";

  let { isOpen, player, word, nextPlayer, close } = $props();


  let tod = $state("");
  let todType = $state("");
  let selectedOption = $state("");
  let loading = $state(false);
  let exit = $state(false);
  let lastPlayer = $gameState.players.active[player].name;
  let punishment = $derived(
    $gameState.settings.punishmentsChoice ? generatePunishment() : ""
  );

  function generateTOD() {
    loading = true;
    setTimeout(() => {
      // Retrieve previously generated indexes from localStorage
      let generatedTODs =
        JSON.parse(localStorage.getItem("generatedTODs")) || [];

      // Check if all TODs have been generated
      if (generatedTODs.length >= tods.length) {
        localStorage.removeItem("generatedTODs");
        // Reset the list of generated indexes
        generatedTODs = [];
      }

      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * tods.length);
      } while (
        generatedTODs.includes(newIndex) &&
        generatedTODs.length < tods.length
      );

      // Add the new index to the list of generated indexes
      generatedTODs.push(newIndex);
      // Save the updated list back to localStorage
      localStorage.setItem("generatedTODs", JSON.stringify(generatedTODs));

      tod = tods[newIndex];
      if (tod.type === "T") {
        todType = `${m.truth()}: `;
      } else {
        todType = `${m.dare()}: `;
      }


      loading = false;
    }, 1000);
  }

  function generatePunishment() {
    let cumulativeProbability = 0;
    const randomValue = Math.random() * 100;

    for (let i = 0; i < $gameState.settings.punishments.length; i++) {
      cumulativeProbability += $gameState.settings.punishments[i].probability;
      if (randomValue < cumulativeProbability) {
        return $gameState.settings.punishments[i].punishment;
      }
    }
  }

  function removeLife(index) {
    $gameState.players.active[index].lives--;
    return $gameState.players.active[index].lives;
  }

  function eliminatePlayer(index) {
    const playerToRemove = $gameState.players.active.splice(index, 1)[0];
    $gameState.players.dead.push(playerToRemove);

    if ($gameState.players.currentTurn === $gameState.players.active.length) {
      $gameState.players.currentTurn = 0;
    }
  }
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
      class={"min-w-[240px] sm:w-[380px] lg:w-fit rounded-md bg-white flex flex-col justify-between pointer-events-auto border-2 border-black " +
        (exit ? "animate-lightSpeedOutRight" : "animate-lightSpeedInLeft")}
    >
      <div
        class="bg-neutral-200 p-4 border-b-2 border-black relative rounded-t-md"
      >
        <div
          class="bg-red-500 w-10 h-10 flex justify-center items-center border-2 border-black rounded-full absolute top-0 -translate-y-1/2 -left-5 text-xl"
        >
          <Check color="#ffffff" />
        </div>
        <h2 class="text-center text-2xl font-semibold lg:text-6xl">
          {m.wrong()}
        </h2>
      </div>
      <div class="p-4">
        <ul class="list-disc list-inside text-sm sm:text-base">
          <li class="mb-2 lg:text-4xl">
            {m.player_eliminated({ name: lastPlayer, word })}
            <span class="inline-flex justify-center items-center"
              >(-1
              <img
                src={heart}
                class="h-3 w-3 sm:w-4 sm:h-4 lg:w-8 lg:h-8"
                alt="Heart"
              />)</span
            >
          </li>
          {#if $gameState.settings.punishmentsChoice}
            <hr class="my-2 mt-4 border-black" />
            <span class="lg:text-4xl"
              ><b>{m.punishment()}:</b> {punishment}</span
            >
            <fieldset class="flex gap-6 lg:text-4xl">
              <div>
                <input
                  class="scale-[2]"
                  bind:group={selectedOption}
                  type="radio"
                  value="declineToDo"
                  name="DidHeToIt"
                />
                <label for="declineToDo"
                  >{m.not_done()}
                  <span class="inline-flex justify-center items-center"
                    >(-1
                    <img
                      src={heart}
                      class="h-3 w-3 sm:w-4 sm:h-4"
                      alt="Heart"
                    />)</span
                  ></label
                >
              </div>
              <div>
                <input
                  class="scale-[2]"
                  bind:group={selectedOption}
                  type="radio"
                  name="DidHeToIt"
                  value="agreeToDo"
                />
                <label for="declineToDo">{m.done()}</label>
              </div>
            </fieldset>
          {:else}
            <li class="mb-2 lg:text-4xl">
              {m.next_player_truth_or_dare({ nextPlayer, lastPlayer })}
            </li>
            <li class="lg:text-4xl">
              {m.generate_hint_prefix({ nextPlayer })}
              <button
                onclick={generateTOD}
                class="bg-amber-500 hover:bg-amber-300 active:bg-amber-500 border-2 border-black rounded-md font-medium px-2 inline-flex items-center gap-2"
                >{m.generate()}
                <div
                  class={"flex items-center justify-center " +
                    (loading ? "animate-twSpin" : "hidden")}
                >
                  <Shell />
                </div>
              </button>
            </li>
            <hr class="my-2 mt-4 border-black" />
            {#if tod}
              <span class="lg:text-4xl"><b>{todType}</b>{tod[languageTag()]}</span>
            {/if}
            <fieldset class="flex gap-6 lg:text-4xl">
              <div>

                <input
                  class="scale-[2]"
                  bind:group={selectedOption}
                  type="radio"
                  value="declineToDo"
                  name="DidHeToIt"
                />
                <label for="declineToDo"
                  >{m.not_done()}
                  <span class="inline-flex justify-center items-center"
                    >(-1
                    <img
                      src={heart}
                      class="h-3 w-3 sm:w-4 sm:h-4"
                      alt="Heart"
                    />)</span
                  ></label
                >
              </div>
              <div>
                <input
                  class="scale-[2]"
                  bind:group={selectedOption}
                  type="radio"
                  name="DidHeToIt"
                  value="agreeToDo"
                />
                <label for="declineToDo">{m.done()}</label>
              </div>
            </fieldset>
          {/if}
        </ul>

        <span class="mt-4"></span>
      </div>
      <div
        class="mt-8 flex justify-end bg-neutral-200 p-4 border-t-2 border-black rounded-b-md"
      >
        <button
          disabled={selectedOption === ""}
          onclick={() => {
            if (selectedOption === "declineToDo") {
              let currentPlayerLives = removeLife(player);
              if (currentPlayerLives === 0) {
                eliminatePlayer(player);
              }
            }
            exit = true;
            setTimeout(() => {
              exit = false;
              close();
              tod = "";
              todType = "";
              selectedOption = "";
              if ($gameState.players.active.length === 1) {
                modals.open(WinnerModal, {});
                return;
              } else {
                $gameState.state = "countdown";
              }
            }, 1200);
          }}
          class="bg-yellow-300 hover:bg-yellow-200 font-semibold poppins px-4 py-2 rounded-lg border-2 border-black disabled:opacity-50 lg:text-4xl flex items-center gap-1"
          >{m.play()} <Play /></button
        >
      </div>
    </div>
  </div>
{/if}
