<script>
  import {gamePlayers, gameState} from "$lib/stores";
  import PlayerCard from "../components/PlayerCard.svelte";
  import Timer from "../components/Timer.svelte";
  import {words} from "../assets/words.js";
  import logo from "../assets/logo.svg";
  import {phase} from "$lib/stores";
  import {openModal} from "svelte-modals";
  import CorrectAnswerModal from "../components/CorrectAnswerModal.svelte";
  import FalseAnswerModal from "../components/FalseAnswerModal.svelte";
  import DeathAnswerModal from "../components/DeathAnswerModal.svelte";
  import WinnerModal from "../components/WinnerModal.svelte";

  let timerComponent;
  let timeLeft = 3;

  let word = words[Math.floor(Math.random() * words.length)];

  $: if ($gameState === "countdown") countDown();

  function countDown() {
    const countDownTimer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(countDownTimer);
        $gameState = "guessing";
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
      let currentPlayerLives = removeLife($gamePlayers.playerTurn);
      if (currentPlayerLives === 0) {
        let deadPlayer = $gamePlayers.players[$gamePlayers.playerTurn];
        eliminatePlayer();
        if ($gamePlayers.players.length === 1) {
          openModal(WinnerModal, {});
          return;
        }
        openModal(DeathAnswerModal, {
          player: deadPlayer,
          word: word,
          nextPlayer: $gamePlayers.players[$gamePlayers.playerTurn].name,
        });
        return;
      }
    }

    let lastPlayer = $gamePlayers.playerTurn;
    moveToNextPlayer();
    if (isFalseAnswer) {
      openModal(FalseAnswerModal, {
        player: lastPlayer,
        word: word,
        nextPlayer: $gamePlayers.players[$gamePlayers.playerTurn].name,
      });
    } else {
      openModal(CorrectAnswerModal, {
        player: lastPlayer,
        word: word,
        nextPlayer: $gamePlayers.players[$gamePlayers.playerTurn].name,
      });
    }
  }

  function moveToNextPlayer() {
    $gamePlayers.playerTurn =
      ($gamePlayers.playerTurn + 1) % $gamePlayers.players.length;
  }

  function removeLife(index) {
    $gamePlayers.players[index].lives--;
    return $gamePlayers.players[index].lives;
  }

  function eliminatePlayer() {
    const playerToRemove = $gamePlayers.players.splice(
      $gamePlayers.playerTurn,
      1
    )[0];
    $gamePlayers.deadPlayers.push(playerToRemove);

    if ($gamePlayers.playerTurn === $gamePlayers.players.length) {
      $gamePlayers.playerTurn = 0;
    }
  }

  function restart() {
    location.reload();
    $phase = "settings";
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
      on:click={restart}
      class="flex items-center bg-neutral-300 hover:bg-neutral-200 hover:border-neutral-400 active:bg-neutral-300 active:border-black duration-200 border-2 border-black rounded-full px-2 py-1 poppins font-semibold"
      >RESTART
    </button>
  </div>
  <div
    class="flex flex-col gap-2 mx-3 sm:mx-5 my-5 mt-10 lg:[grid-area:inputs;]"
  >
    <label class="relative w-full lg:w-1/3">
      <div class="overflow-hidden rounded-md border-2 border-yellow-300">
        <p
          class="transition-all duration-200 transform -translate-y-1/2 pointer-events-none text-black rounded-md px-2 top-0 left-4 bg-yellow-300 border-2 border-black z-[9] absolute md:text-xl"
        >
          aeg
        </p>
        <Timer bind:this={timerComponent} />
      </div>
    </label>
    <label class="relative w-full">
      <div class="overflow-hidden rounded-md border-2 border-yellow-300">
        <p
          class="transition-all duration-200 transform -translate-y-1/2 pointer-events-none text-black rounded-md px-2 top-0 left-4 lg:left-1/2 lg:right-1/2 lg:w-fit bg-yellow-300 border-2 border-black z-[9] absolute md:text-xl lg:-translate-x-1/2"
        >
          sõna
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
          mängija
        </p>
        <input
          type="text"
          value={$gamePlayers.players[$gamePlayers.playerTurn].name}
          disabled
          class="text-right lg:text-start font-semibold poppins text-2xl md:text-4xl focus:outline-none border-none w-full p-2 pr-3 bg-yellow-100 text-yellow-800 relative"
        />
      </div>
    </label>
  </div>
  <div
    class="flex md:flex-col lg:flex-row gap-2 justify-between items-center mx-3 sm:mx-5 mb-5 md:mt-10 lg:mt-5 lg:[grid-area:buttons] lg:h-full"
  >
    <button
      on:click={correctAnswer}
      class="bg-green-500 hover:bg-green-400 hover:border-green-700 duration-200 border-2 border-black rounded-lg w-36 md:w-full lg:h-full px-4 py-2 md:px-8 md:py-4 text-2xl md:text-5xl font-semibold poppins"
      >ÕIGE</button
    >
    <button
      on:click={falseAnswer}
      class="bg-red-500 hover:bg-red-400 hover:border-red-700 duration-200 border-2 border-black rounded-lg w-36 md:w-full lg:h-full px-4 py-2 md:px-8 md:py-4 text-2xl md:text-5xl font-semibold poppins"
      >VALE</button
    >
  </div>

  <div
    class="flex flex-wrap justify-between sm:justify-start gap-2 md:h-fit mx-3 sm:mx-5 overflow-scroll sm:overflow-hidden pb-5 md:[grid-area:playerlist] lg:[grid-area:auto] lg:my-5 lg:pb-0 lg:h-full"
  >
    {#each $gamePlayers.players as player}
      <PlayerCard playerName={player.name} lives={player.lives} />
    {/each}
    {#each $gamePlayers.deadPlayers as player}
      <PlayerCard playerName={player.name} lives={player.lives} />
    {/each}
  </div>
</div>

<div
  class={"fixed top-0 left-0 w-full h-full backdrop-blur-md z-[9] flex items-center justify-center " +
    ($gameState === "countdown" ? "" : "hidden")}
>
  <span
    class=" text-[15rem] font-semibold drop-shadow-[7px_10px_0px_rgba(0,0,0,0.8)] text-yellow-300"
    >{timeLeft}</span
  >
</div>
