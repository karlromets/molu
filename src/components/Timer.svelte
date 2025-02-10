<script>
  import { gameState } from "$lib/stores";
  import { onDestroy } from "svelte";

  let { timesup } = $props();
  let countFrom = $state(0);
  let timerInterval;

  // Reset function
  export function resetTimer() {
    stopTimer(); // Clear any existing interval first
    countFrom = $gameState.settings.time;
    startTimer();
  }

  // Stop function
  export function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    countFrom = 0;
  }

  function startTimer() {
    if (timerInterval) {
      return; // Prevent multiple intervals
    }

    const startTime = Date.now();
    const endTime = startTime + countFrom * 1000;

    timerInterval = setInterval(() => {
      const remaining = Math.max(Math.round((endTime - Date.now()) / 1000), 0);

      if (remaining <= 0) {
        stopTimer();
      }

      countFrom = remaining;
    }, 1000);
  }

  onDestroy(() => {
    stopTimer();
  });

  const mm = $derived(Math.floor(countFrom / 60));
  const ss = $derived(countFrom % 60);

  const formatTime = $derived((value) => value.toString().padStart(2, "0"));
</script>

<input
  type="text"
  value={formatTime(mm) + ":" + formatTime(ss)}
  disabled
  class="text-right font-semibold poppins text-2xl md:text-4xl focus:outline-none border-none w-full p-2 pr-3 bg-yellow-100 text-yellow-800 relative"
/>
