<script>
  import {
    ArrowDown,
    ArrowUp,
    BookOpen,
    Crosshair,
    Lightbulb,
  } from "lucide-svelte";
  import logo from "../../assets/logo.svg";
  import * as m from "$lib/paraglide/messages.js";
  import LanguageSwitcher from "../../components/LanguageSwitcher.svelte";

  let y = $state(0);
  let innerWidth = $state(0);
  let innerHeight = $state(0);

  function goTop() {
    document.body.scrollIntoView();
  }
</script>

<div
  class={"fixed bottom-0 right-0 w-fit duration-200 flex p-10 z-[10] " +
    (y > 0
      ? " opacity-full pointer-events-auto"
      : " pointer-events-none opacity-0")}
>
  <button
    onclick={goTop}
    class="hidden sm:grid ml-auto rounded-full bg-yellow-300 text-black px-3 sm:px-4 hover:bg-yellow-400 outline cursor-pointer aspect-square place-items-center"
    aria-label="Back to Top"
  >
    <ArrowUp strokeWidth={3} />
  </button>
</div>
<main class="bg-blueToBeige">
  <section class="w-full min-h-screen relative grid place-items-center">
    <div class="flex relative w-[300px] h-[149px] lg:w-[500px] lg:h-[250px]">
      <img
        src={logo}
        alt="Logo"
        class=" bg-no-repeat bg-contain h-full w-full hover:rotate-3 duration-1000"
      />
    </div>
    <div class="flex flex-col mx-auto gap-4">
      <a
        href="/game"
        class="border-4 border-solid border-black rounded-full bg-yellow-300 hover:scale-125 active:scale-100 duration-200 font-semibold poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-6 py-3 w-full text-center"
        >{m.play()}</a
      >
      <a
        href="#juhend"
        class="border-4 border-solid border-black rounded-full bg-neutral-300 hover:scale-125 active:rotate-12 duration-200 font-semibold poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-6 py-3 w-full flex items-center gap-1"
        >{m.instructions()}
        <ArrowDown
          class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
          color="#000000"
        />
      </a>
    </div>
  </section>
  <section
    id="juhend"
    class="w-full min-h-screen relative grid place-items-center gap-8 sm:gap-0 p-2 pt-12"
  >
    <div class="mx-auto md:w-2/3 lg:w-1/2 text-[#100e08]">
      <h1 class="text-2xl font-semibold flex items-center gap-1">
        {m.goal()}
        <Crosshair size={24} color="#dc2626" />
      </h1>
      <hr class="border-black border-2" />

      <p class="text-pretty font-medium">
        {m.goal_description()}
      </p>
    </div>
    <div class="mx-auto md:w-2/3 lg:w-1/2 text-[#100e08]">
      <h1 class="text-2xl font-semibold flex items-center gap-1">
        {m.game_flow()}
        <BookOpen />
      </h1>
      <hr class="border-black border-2" />
      <ul
        class="list-decimal list-outside ml-[1.5em] text-pretty space-y-2 font-medium"
      >
        <li>
          {m.game_flow_steps_1()}
        </li>
        <li>{m.game_flow_steps_2()}</li>
        <li>
          {m.game_flow_steps_3()}
        </li>
        <li>
          {m.game_flow_steps_4()}
        </li>
        <li>
          {m.game_flow_steps_5()}
        </li>
        <li>
          {m.game_flow_steps_6()}
        </li>
      </ul>
    </div>
    <div class="mx-auto md:w-2/3 lg:w-1/2 text-[#100e08]">
      <h1 class="text-2xl font-semibold flex items-center gap-1">
        {m.tips()}
        <Lightbulb />
      </h1>
      <hr class="border-black border-2" />

      <ul
        class="list-disc list-outside ml-[1.5em] text-pretty space-y-2 font-medium"
      >
        <li>
          {m.tips_list_1()}
        </li>
        <li>
          {m.tips_list_2()}
        </li>
      </ul>
    </div>
  </section>
</main>
<div class="fixed bottom-0 left-0 p-10">
  <LanguageSwitcher />
</div>
<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />
