<script>
  import { gameState } from "$lib/stores";
  import { onDestroy } from "svelte";

  let { timesup } = $props();
  let countFrom = $state(0);
  let timerInterval;

  // Reset function
  export function resetTimer() {
    console.debug("resetTimer called. Resetting timer.");
    stopTimer(); // Clear any existing interval first
    countFrom = $gameState.settings.time;
    console.debug(`Timer reset to ${countFrom} seconds.`);
    startTimer();
  }

  // Stop function
  export function stopTimer() {
    console.debug("stopTimer called. Stopping timer.");
    if (timerInterval) {
      clearInterval(timerInterval);
      console.debug("Existing timer interval cleared.");
      timerInterval = null;
    }
    countFrom = 0;
    console.debug("countFrom set to 0.");
  }

  function startTimer() {
    console.debug("startTimer called. Starting timer.");
    if (timerInterval) {
      console.debug("Timer already running. Exiting startTimer.");
      return; // Prevent multiple intervals
    }

    const startTime = Date.now();
    const endTime = startTime + countFrom * 1000;
    console.debug(
      `Timer started. Start Time: ${startTime}, End Time: ${endTime}`
    );

    timerInterval = setInterval(() => {
      const remaining = Math.max(Math.round((endTime - Date.now()) / 1000), 0);
      console.debug(`Timer tick. Remaining time: ${remaining} seconds.`);

      if (remaining <= 0) {
        console.debug("Time is up. Stopping timer and triggering timesup.");
        stopTimer();
        timesup();
      }

      countFrom = remaining;
      console.debug(`countFrom updated to ${countFrom} seconds.`);
    }, 1000);
  }

  onDestroy(() => {
    console.debug("Component is being destroyed. Cleaning up timer.");
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
