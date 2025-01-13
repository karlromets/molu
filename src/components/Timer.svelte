<script>
  import {gameState} from "$lib/stores";
  // Props

  $effect(() => {
    if ($gameState === "guessing") {
      resetTimer();
    }
  });

  let {timesup} = $props();
  let countFrom = $state(0);
  // Reset function
  export function resetTimer() {
    countFrom = 0;
    countFrom = $gameState.settings.time;
  }
  // Stop function
  export function stopTimer() {
    countFrom = 0;
  }

  // Reactive to account for changes in countFrom:
  const endDate = $derived((function (secs) {
  const e = Date.now() + secs * 1000;
  return new Date(e);
  })(countFrom));

  // Convert remaining to $derived instead of readable store
  const remaining = $derived(Math.max(Math.round((endDate - new Date()) / 1000), 0));

  // Update timer using $effect
  $effect(() => {
    const interval = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(interval);
        timesup();
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  let hh = $derived(Math.floor(remaining / 3600));
  let mm = $derived(Math.floor((remaining - hh * 3600) / 60));
  let ss = $derived(remaining - hh * 3600 - mm * 60);

  $effect(() => {
    if (remaining === 0) {
    timesup()
    }
  })

  function f(value) {
    if (value < 10) {
      return `0${value}`;
    }
    return value.toString();
  }
</script>

<input
  type="text"
  value={f(mm) + ":" + f(ss)}
  disabled
  class="text-right font-semibold poppins text-2xl md:text-4xl  focus:outline-none border-none w-full p-2 pr-3 bg-yellow-100 text-yellow-800 relative"
/>
