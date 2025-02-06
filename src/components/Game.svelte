<script>
  import { gameState, updateGameState } from "$lib/stores";
  import PlayerCard from "../components/PlayerCard.svelte";
  import Timer from "../components/Timer.svelte";
  import { languageTag } from "$lib/paraglide/runtime.js";
  import logo from "../assets/logo.svg";
  import { modals } from "svelte-modals";
  import CorrectAnswerModal from "../components/CorrectAnswerModal.svelte";
  import FalseAnswerModal from "../components/FalseAnswerModal.svelte";
  import DeathAnswerModal from "../components/DeathAnswerModal.svelte";
  import WinnerModal from "../components/WinnerModal.svelte";
  import Button from "./Button.svelte";
  import * as m from "$lib/paraglide/messages.js";

  let timerComponent;
  let timeLeft = $state(3);
  let previousState = "";

  let words = $state([]);
  let word = $state("");

  async function loadWords() {
    const wordsModule = await import(`../assets/words.${languageTag()}.js`);
    words = wordsModule.words;
    word = words[Math.floor(Math.random() * words.length)];
  }

  loadWords();

  $effect(() => {
    loadWords();
  });

  $effect(() => {
    console.debug($gameState.state);
    if ($gameState.state === previousState) {
      return;
    } else {
      switch ($gameState.state) {
        case "countdown":
          countDown();
          break;
        case "guessing":
          timerComponent.resetTimer();
          break;
      }
    }
    previousState = $gameState.state;
  });

  function countDown() {
    const countDownTimer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(countDownTimer);
        updateGameState("guessing");
        word = words[Math.floor(Math.random() * words.length)];
        timeLeft = 3;
      }
    }, 1000);
  }

  function correctAnswer() {
    handleAnswer(false);
  }

  function falseAnswer() {
    handleAnswer(true);
  }

  function handleAnswer(isFalseAnswer) {
    if (isFalseAnswer) {
      timerComponent.stopTimer();
      console.debug(
        `Current turn player index: ${$gameState.players.currentTurn}`
      );
      let currentPlayerLives = removeLife($gameState.players.currentTurn);
      if (currentPlayerLives === 0) {
        let deadPlayer =
          $gameState.players.active[$gameState.players.currentTurn];
        eliminatePlayer();
        if ($gameState.players.active.length === 1) {
          modals.open(WinnerModal, {});
          return;
        }
        modals.open(DeathAnswerModal, {
          player: deadPlayer,
          word: word,
          nextPlayer:
            $gameState.players.active[$gameState.players.currentTurn].name,
        });
        return;
      }
    }

    let lastPlayer = $gameState.players.currentTurn;
    moveToNextPlayer();
    if (isFalseAnswer) {
      modals.open(FalseAnswerModal, {
        player: lastPlayer,
        word: word,
        nextPlayer:
          $gameState.players.active[$gameState.players.currentTurn].name,
      });
    } else {
      modals.open(CorrectAnswerModal, {
        player: lastPlayer,
        word: word,
        nextPlayer:
          $gameState.players.active[$gameState.players.currentTurn].name,
      });
    }
  }

  function moveToNextPlayer() {
    $gameState.players.currentTurn =
      ($gameState.players.currentTurn + 1) % $gameState.players.active.length;
  }

  function removeLife(index) {
    console.debug(`Removing life for player at index: ${index}`);
    $gameState.players.active[index].lives--;
    const remainingLives = $gameState.players.active[index].lives;
    console.debug(
      `Player at index ${index} now has ${remainingLives} lives remaining.`
    );
    return remainingLives;
  }

  function eliminatePlayer() {
    const playerToRemove = $gameState.players.active.splice(
      $gameState.players.currentTurn,
      1
    )[0];
    $gameState.players.dead.push(playerToRemove);

    if ($gameState.players.currentTurn === $gameState.players.active.length) {
      $gameState.players.currentTurn = 0;
    }
  }

  function restart() {
    location.reload();
    $gameState.phase = "settings";
  }
</script>

<div
  class="md:grid md:grid-rows-[min-content_1fr_1fr] md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[min-content_1fr_1fr_min-content] md:[grid-template-areas:'header_header'_'._.'_'playerlist_playerlist'] lg:[grid-template-areas:_'.'_'.'_'inputs'_'buttons';]"
>
  <div
    class="bg-yellow-300 flex items-center p-2 justify-between h-[50px] border-b-2 border-black drop-shadow-lg md:[grid-area:header] lg:[grid-area:auto]"
  >
    <img src={logo} alt="logo" class="bg-no-repeat bg-contain h-full w-fit" />
    <button
      onclick={restart}
      class="flex items-center bg-neutral-300 hover:bg-neutral-200 hover:border-neutral-400 active:bg-neutral-300 active:border-black duration-200 border-2 border-black rounded-full px-2 py-1 poppins font-semibold"
      >{m.restart()}</button
    >
  </div>
  <div
    class="flex flex-col gap-2 mx-3 sm:mx-5 my-5 mt-10 lg:[grid-area:inputs;]"
  >
    <label class="relative w-full lg:w-1/3">
      <div class="overflow-hidden rounded-md border-2 border-yellow-300">
        <p
          class="transition-all duration-200 transform -translate-y-1/2 pointer-events-none text-black rounded-md px-2 top-0 left-4 bg-yellow-300 border-2 border-black z-[9] absolute md:text-xl"
        >
          {m.time()}
        </p>
        <Timer
          bind:this={timerComponent}
          timesup={() => {
            falseAnswer();
          }}
        />
      </div>
    </label>
    <label class="relative w-full">
      <div class="overflow-hidden rounded-md border-2 border-yellow-300">
        <p
          class="transition-all duration-200 transform -translate-y-1/2 pointer-events-none text-black rounded-md px-2 top-0 left-4 lg:left-1/2 lg:right-1/2 lg:w-fit bg-yellow-300 border-2 border-black z-[9] absolute md:text-xl lg:-translate-x-1/2"
        >
          {m.word()}
        </p>
        <input
          type="text"
          value={word}
          disabled
          class="text-right lg:text-center font-semibold poppins text-2xl md:text-4xl lg:text-6xl focus:outline-none border-none w-full p-2 pr-3 bg-yellow-100 text-yellow-800 relative"
        />
      </div>
    </label>
    <label class="relative w-full lg:w-1/3 lg:self-end">
      <div class="overflow-hidden rounded-md border-2 border-yellow-300">
        <p
          class="transition-all duration-200 transform -translate-y-1/2 pointer-events-none text-black rounded-md px-2 top-0 left-4 lg:left-auto lg:right-4 bg-yellow-300 border-2 border-black z-[9] absolute md:text-xl"
        >
          {m.player()}
        </p>
        <input
          type="text"
          value={$gameState.players.active[$gameState.players.currentTurn].name}
          disabled
          class="text-right lg:text-start font-semibold poppins text-2xl md:text-4xl focus:outline-none border-none w-full p-2 pr-3 bg-yellow-100 text-yellow-800 relative"
        />
      </div>
    </label>
  </div>
  <div
    class="flex md:flex-col lg:flex-row gap-8 justify-between items-center mx-3 sm:mx-5 mb-5 md:mt-10 lg:mt-5 lg:[grid-area:buttons] lg:h-full"
  >
    <div class="w-36 md:w-full lg:h-full">
      <Button
        onclick={correctAnswer}
        text={m.correct()}
        class="bg-green-500 font-semibold poppins px-4 py-2 md:px-8 md:py-4 text-2xl md:text-5xl"
      />
    </div>
    <div class="w-36 md:w-full lg:h-full">
      <Button
        onclick={falseAnswer}
        text={m.wrong()}
        class="bg-red-500 font-semibold poppins px-4 py-2 md:px-8 md:py-4 text-2xl md:text-5xl"
      />
    </div>
  </div>

  <div
    class="flex flex-wrap justify-between sm:justify-start gap-2 md:h-fit mx-3 sm:mx-5 overflow-scroll sm:overflow-hidden pb-5 md:[grid-area:playerlist] lg:[grid-area:auto] lg:my-5 lg:pb-0 lg:h-full"
  >
    {#each $gameState.players.active as player}
      <PlayerCard playerName={player.name} lives={player.lives} />
    {/each}
    {#each $gameState.players.dead as player}
      <PlayerCard playerName={player.name} lives={player.lives} />
    {/each}
  </div>
</div>

<div
  class={"fixed top-0 left-0 w-full h-full backdrop-blur-md z-[9] flex items-center justify-center " +
    ($gameState.state === "countdown" ? "" : "hidden")}
>
  <span
    class=" text-[15rem] font-semibold drop-shadow-[7px_10px_0px_rgba(0,0,0,0.8)] text-yellow-300"
    >{timeLeft}</span
  >
</div>
