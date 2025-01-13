<script>
  import {readable} from "svelte/store";
  import {settings, gameState} from "$lib/stores";
  import {createEventDispatcher} from "svelte";
  // Props
  $: if ($gameState === "guessing") resetTimer();

  export let countFrom = 0;
  const dispatch = createEventDispatcher();
  // Reset function
  export function resetTimer() {
    countFrom = 0;
    countFrom = $settings.time;
  }
  // Stop function
  export function stopTimer() {
    countFrom = 0;
  }

  // Reactive to account for changes in countFrom:
  $: endDate = (function (secs) {
    const e = Date.now() + secs * 1000;
    return new Date(e);
  })(countFrom);

  $: remaining = readable(countFrom, function start(set) {
    const interval = setInterval(() => {
      let r = Math.round((endDate - new Date()) / 1000);
      r = Math.max(r, 0);
      set(r);
      if (r <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return function stop() {
      clearInterval(interval);
    };
  });

  $: hh = Math.floor($remaining / 3600);
  $: mm = Math.floor(($remaining - hh * 3600) / 60);
  $: ss = $remaining - hh * 3600 - mm * 60;

  $: if ($remaining === 0) {
    dispatch("timesup");
  }

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
