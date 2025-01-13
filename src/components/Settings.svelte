<script>
  import {gameState, updateSettingsPlayers} from "$lib/stores";
  import {onMount} from "svelte";
  import logopadding from "../assets/logopadding.png";
  import {toast} from "@zerodevx/svelte-toast";
  import { Clock, Heart, Play, Settings, X } from "lucide-svelte";

  onMount(() => {
    const settingsString = localStorage.getItem("settings");
    if (settingsString) {
      $gameState.settings = JSON.parse(settingsString);
    }
  });

  function saveLS() {
    localStorage.setItem("settings", JSON.stringify($gameState.settings));
  }

  function validateSettings(settings) {
    const hasEnoughPlayers = $gameState.settings.players.length >= 2;
    const hasPunishmentsChosen = $gameState.settings.punishmentsChoice;

    if (!hasEnoughPlayers) {
      toast.push("Vähemalt kaks mängijat peab olema, et alustada");
      return;
    }

    if (hasPunishmentsChosen) {
      // Check if probability sum = 100
      const totalProbability = $gameState.settings.punishments.reduce(
        (total, punishment) => total + punishment.probability,
        0
      );
      if (totalProbability !== 100) {
        toast.push("Karistuste tõenäosused peavad kokku liitma 100%");
        return;
      }
    }

    // Create a new object and assing the set initial lives to each player
    $gameState.gamePlayers.players = $gameState.settings.players.map((player) => ({
      name: player,
      lives: $gameState.settings.lives,
    }));
    // Pick a random starting player
    $gameState.gamePlayers.playerTurn = Math.floor(
      Math.random() * $gameState.settings.players.length
    );
    exit = true;
    setTimeout(() => {
      exit = false;
      $gameState.gamePlayers.deadPlayers = [];
      $gameState.phase = "game";
      $gameState = "countdown";
    }, 1000);
  }

  let newPlayerName = $state("");
  let punishmentName = $state("");
  let punishmentProbability = $state(0);
  let exit = $state("");
</script>

<div
  class={"w-full h-full relative grid grid-rows-[min-content_min-content_min-content_min-content_1fr] grid-cols-1 md:grid-cols-2 md:[grid-template-areas:'title_title'_'._punishments'_'._punishments'_'start_start'] max-w-[1400px] mx-auto  " +
    (exit ? "animate-slideOutUp" : "animate-slideInDown")}
>
  <section class="mt-2 mx-auto md:[grid-area:title]">
    <div
      class="bg-yellow-300 border-2 border-black rounded-full px-6 py-3 mx-2 w-fit"
    >
      <h1 class="text-2xl sm:text-3xl font-semibold text-black flex items-center gap-1">
        MÄNGU SÄTTED <Settings class="w-6 h-6 sm:w-7 sm:h-7"/>
      </h1>
    </div>
  </section>

  <section class="w-full mt-2">
    <div class="bg-yellow-300 border-2 border-black rounded-lg mx-2">
      <div class="border-black border-b-2">
        <div class="flex justify-between items-center p-2 overflow-auto">
          <h1 class="font-semibold mr-2">Mängijate nimekiri</h1>
          <div class="flex">
            <input
              bind:value={newPlayerName}
              type="text"
              placeholder="Nimi"
              class="border-2 border-r-0 rounded-tr-none rounded-br-none border-black rounded-lg pl-2 focus:outline-none w-full"
            />
            <button
              onclick={() => {
                if (newPlayerName.trim() !== "") {
                  let duplicate = $gameState.settings.players.some(
                    (p) => p === newPlayerName.trim()
                  );
                  if (!duplicate) {
                    updateSettingsPlayers([
                      ...$gameState.settings.players,
                      newPlayerName.trim()
                    ]);
                    newPlayerName = ""; // Clear input after adding player
                    saveLS();
                  } else {
                    toast.push("Sellise nimega mängija on juba olemas!");
                  }
                } else {
                  newPlayerName = "";
                }
              }}
              class="bg-yellow-300 border-2 rounded-tl-none rounded-bl-none border-black rounded-lg poppins font-semibold text-xl px-2 sm:px-4 py-2 hover:bg-yellow-100 duration-200 active:bg-yellow-300"
              >LISA</button
            >
          </div>
        </div>
      </div>
      <ul
        class="text-xl poppins p-2 h-32 sm:h-32 overflow-y-auto overflow-x-hidden"
      >
        {#each $gameState.settings.players as playerName}
          <li class="flex justify-between">
            <span>{playerName}</span>
            <button
              onclick={() => {
                $gameState.settings.players = $gameState.settings.players.filter(
                  (player) => player !== playerName
                );
                saveLS();
              }}
              aria-label="Save Settings"
              class="hover:cursor-pointer hover:rotate-90 active:scale-50 duration-200"
              ><!-- <i class="fa-solid fa-xmark text-2xl mb-[0.125rem]"></i> --><X /></button
            >
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="w-full mt-2">
    <div class="bg-yellow-300 border-2 border-black rounded-lg mx-2 p-2">
      <div class="flex justify-between items-center">
        <h1 class="font-semibold text-xl flex items-center gap-1">
          Arvamise aeg <Clock />
        </h1>
        <span class="poppins font-semibold text-xl">{$gameState.settings.time}s</span>
      </div>
      <div class="">
        <input
          type="range"
          id="timeSetting"
          step="5"
          min="5"
          max="120"
          bind:value={$gameState.settings.time}
          onchange={() => {
            saveLS();
          }}
          class="slider"
        />
      </div>
    </div>
    <div class="bg-yellow-300 border-2 border-black rounded-lg mx-2 mt-2 p-2">
      <div class="flex justify-between items-center">
        <h1 class="font-semibold text-xl  flex items-center gap-1">
          Elud <Heart color="#dc2626" class="fill-[#dc2626]"/>
        </h1>
        <span class="poppins font-semibold text-xl">{$gameState.settings.lives}</span>
      </div>
      <div class="">
        <input
          type="range"
          id="livesSetting"
          step="1"
          min="1"
          max="5"
          class="slider"
          bind:value={$gameState.settings.lives}
          onchange={() => {
            saveLS();
          }}
        />
      </div>
    </div>
  </section>

  <section class="w-full mt-2 md:[grid-area:punishments]">
    <div
      class={"bg-yellow-300 max-h-64 border-2 border-black rounded-lg mx-2 duration-200 flex flex-col gap-2 overflow-hidden " +
        ($gameState.settings.punishmentsChoice ? "h-64" : "h-[53px]")}
    >
      <label class="inline-flex items-center cursor-pointer p-2 pb-0">
        <input
          type="checkbox"
          bind:checked={$gameState.settings.punishmentsChoice}
          onchange={() => {
            saveLS();
          }}
          class="sr-only peer"
        />
        <div
          class={"duration-200 relative w-11 h-6  rounded-full peer bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute border-black border-2 after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all " +
            ($gameState.settings.punishmentsChoice
              ? "after:bg-white   peer-checked:bg-black"
              : "after:bg-black peer-checked:bg-yellow-300")}
        ></div>
        <span
          class={"ms-3 text-xl font-semibold duration-200 " +
            ($gameState.settings.punishmentsChoice ? "" : "opacity-50")}>Karistused</span
        >
      </label>
      <div class="flex flex-col gap-2">
        {#if $gameState.settings.punishmentsChoice}
          <form
            type="submit"
            class="flex flex-col gap-2 border-b-2 border-black p-2 pt-0 pb-2"
          >
            <input
              bind:value={punishmentName}
              type="text"
              placeholder="Karistus"
              maxlength="20"
              required
              class="border-2 border-black rounded-lg pl-2 focus:outline-none w-full h-10"
            />
            <div class="flex">
              <input
                bind:value={punishmentProbability}
                type="number"
                min="1"
                max="100"
                required
                placeholder="Tõenäosus"
                class="border-2 border-r-0 rounded-tr-none rounded-br-none border-black rounded-lg pl-2 focus:outline-none w-full"
              />
              <button
                onclick={(event) => {
                  event.preventDefault();

                  if (!punishmentProbability) {
                    toast.push("Lisa tõenäosus ka ikka!");
                    return;
                  } else if (!punishmentName) {
                    toast.push("Lisa karistus ka ikka!");
                    return;
                  }

                  // Check if the punishment already exists before adding it
                  let duplicate = $gameState.settings.punishments.some(
                    (p) => p.punishment === punishmentName
                  );

                  // Add the new punishment to the punishments array
                  if (!duplicate) {
                    $gameState.settings.punishments = [
                      ...$gameState.settings.punishments,
                      {
                        punishment: punishmentName,
                        probability: punishmentProbability,
                      },
                    ];
                    saveLS();
                    punishmentName = "";
                    punishmentProbability = "";
                  } else {
                    toast.push("Selline karistus on juba olemas!");
                    return;
                  }
                }}
                type="submit"
                class="bg-yellow-300 border-2 rounded-tl-none rounded-bl-none border-black rounded-lg poppins font-semibold text-xl px-4 py-2 hover:bg-yellow-100 duration-200 active:bg-yellow-300 h-10 flex items-center justify-center"
                >LISA</button
              >
            </div>
          </form>

          <ul
            class="text-xl poppins p-2 pt-0 h-28 overflow-y-auto overflow-x-hidden"
          >
            {#each $gameState.settings.punishments as punishment}
              <li class="flex justify-between items-center mb-2">
                <div class="overflow-x-auto max-w-[280px]">
                  <span class=" text-nowrap">{punishment.punishment}</span>
                </div>
                <div class="flex">
                  <input
                    bind:value={punishment.probability}
                    onchange={saveLS}
                    type="number"
                    placeholder="%"
                    class="border-2 border-black border-r-0 rounded-tr-none rounded-br-none rounded-lg focus:outline-none text-center w-12"
                  />
                  <button
                    onclick={() => {
                      $gameState.settings.punishments = $gameState.settings.punishments.filter(
                        (p) => p.punishment !== punishment.punishment
                      );
                      saveLS();
                    }}
                    aria-label="Save Settings"
                    class="bg-yellow-300 border-2 rounded-tl-none rounded-bl-none border-black rounded-lg poppins font-semibold hover:bg-yellow-100 duration-200 active:bg-yellow-300 w-12"
                    ><X/></button
                  >
                </div>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </section>

  <section class=" h-fit mx-auto my-2 md:[grid-area:start]">
    <button
      onclick={() => {
        validateSettings($gameState.settings);
      }}
      class="text-2xl sm:text-3xl font-semibold text-black text-center cursor-pointer bg-yellow-300 border-black border-2 rounded-full px-6 py-3 hover:bg-yellow-200 active:translate-y-1 duration-200 flex items-center gap-1"
    >
      START <Play class="w-6 h-6 sm:w-7 sm:h-7"/>
    </button>
  </section>
</div>

<div class="w-full h-full overflow-hidden relative">
  <div
    class={`bg-repeat-space w-full h-full -z-10 top-0 left-0 fixed [background-size:128px_64px] opacity-30`}
    style={`background-image: url(${logopadding})`}
  ></div>
</div>
