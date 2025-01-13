<script>
  import heart from "../assets/heart.png";

  let { playerName, lives } = $props(); 

  let dead = $derived(() => lives <= 0);
</script>

<div
  class={`relative rounded-lg border-black border-2 w-36 h-fit drop-shadow-xl overflow-hidden ${
    dead ? 'opacity-50' : ''
  }`}
>
  <div
    class="bg-yellow-300 w-full overflow-hidden font-medium border-b-2 border-black py-2 text-center lg:text-2xl"
  >
    <span>
      {playerName}
    </span>
  </div>
  <div class="flex items-center justify-center py-2 lg:py-3 bg-yellow-100 h-10">
      {#if lives}
        {#each Array.from({length: lives})}
          <img src={heart} class="h-4 w-4 lg:h-5 lg:w-5" alt="Heart" />
        {/each}
      {:else if lives < 1}
        <i class="fa-solid fa-skull-crossbones text-black"></i>
      {:else}
        Error
      {/if}
  </div>
</div>
