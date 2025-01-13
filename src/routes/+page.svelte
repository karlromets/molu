<script>
  import logo from "../assets/logo.svg";

  let y;
  let innerWidth = 0;
  let innerHeight = 0;

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
    on:click={goTop}
    class="hidden sm:grid ml-auto rounded-full bg-yellow-300 text-black px-3 sm:px-4 hover:bg-yellow-400 outline cursor-pointer aspect-square place-items-center"
    aria-label="Back to Top"
  >
    <i class="fa-solid fa-arrow-up"></i>
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
        >MÄNGI</a
      >
      <a
        href="#juhend"
        class="border-4 border-solid border-black rounded-full bg-neutral-300 hover:scale-125 active:rotate-12 duration-200 font-semibold poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-6 py-3 w-full"
        >JUHEND <i class="fa-solid fa-arrow-down" style="color: #000000;"
        ></i></a
      >
    </div>
  </section>
  <section
    id="juhend"
    class="w-full min-h-screen relative grid place-items-center gap-8 sm:gap-0 p-2 pt-12"
  >
    <div class="mx-auto md:w-2/3 lg:w-1/2 text-[#100e08]">
      <h1 class="text-2xl font-semibold">
        EESMÄRK <i class="fa-solid fa-crosshairs text-red-600"></i>
      </h1>
      <hr class="border-black border-2" />

      <p class="text-pretty font-medium">
        Mängijad arvavad kordamööda sõnu või väljendeid pealtvaatajate antud
        vihjete põhjal, ilma et nad kasutaksid tegelikku sõna või väljendit.
      </p>
    </div>
    <div class="mx-auto md:w-2/3 lg:w-1/2 text-[#100e08]">
      <h1 class="text-2xl font-semibold">
        MÄNGU KÄIK <i class="fa-solid fa-book"></i>
      </h1>
      <hr class="border-black border-2" />
      <ul
        class="list-decimal list-outside ml-[1.5em] text-pretty space-y-2 font-medium"
      >
        <li>
          Mängu alustamiseks valige mängija. Nad seisavad ekraani ees, seljaga
          ekraani poole.
        </li>
        <li>Ekraanile ilmub sõna või väljend, mida vaatajad näevad.</li>
        <li>
          Pealtvaatajad annavad mängijale kordamööda vihjeid ekraanil oleva sõna
          või väljendi kohta, ilma et nad kasutaksid tegelikku sõna või
          väljendit.
        </li>
        <li>
          Mängija peab sõna või väljendi ära arvama ekraanil näidatud aja
          jooksul.
        </li>
        <li>
          Kui mängija arvab õigesti, vajutab moderaator nuppu "õige". Kui
          mängija arvab valesti, vajutab moderaator nuppu "vale".
        </li>
        <li>
          Seejärel liigub mäng edasi järgmisele mängijale, kes hakkab arvama.
        </li>
      </ul>
    </div>
    <div class="mx-auto md:w-2/3 lg:w-1/2 text-[#100e08]">
      <h1 class="text-2xl font-semibold">
        NÄPUNÄITED <i class="fa-regular fa-lightbulb"></i>
      </h1>
      <hr class="border-black border-2" />

      <ul
        class="list-disc list-outside ml-[1.5em] text-pretty space-y-2 font-medium"
      >
        <li>
          Pealtvaatajad peaksid püüdma anda selgeid ja täpseid vihjeid, et
          aidata mängijal sõna või väljendit õigesti ära arvata.
        </li>
        <li>
          Mängijad peaksid püüdma tähelepanelikult kuulata antud vihjeid ja
          kasutama head mõtlemist, et oma arvamisi teha.
        </li>
      </ul>
    </div>
  </section>
</main>
<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />
