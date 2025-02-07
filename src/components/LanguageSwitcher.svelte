<script>
  import {
    availableLanguageTags,
    languageTag,
  } from "$lib/paraglide/runtime.js";
  import { i18n } from "$lib/i18n.js";
  import { page } from "$app/state";

  const flagEmoji = (lang) => {
    switch (lang) {
      case 'en':
        return '🇬🇧';
      case 'et':
        return '🇪🇪';
      default:
        return lang;
    }
  };
</script>

<div class="flex gap-4">
  {#each availableLanguageTags as lang}
    <a
      href={i18n.route(page.url.pathname)}
      hreflang={lang}
      aria-current={lang === languageTag() ? "page" : undefined}
      class:text-gray-400={lang !== languageTag()}
      class="hover:scale-110 duration-200 font-semibold poppins text-2xl {lang === languageTag()
        ? 'text-black'
        : 'text-gray-400'}"
    >
      {flagEmoji(lang)}
    </a>
  {/each}
</div>
