<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import * as m from "$lib/paraglide/messages.js";

  let props = $props<{
    class?: string;
    text?: string;
    onclick?: () => void;
  }>();

  const defaultButtonClasses = "rounded-md bg-black w-full h-full";
  const defaultSpanClasses =
    "block -translate-x-2 -translate-y-2 rounded-md border-2 border-black bg-yellow-500 p-4 text-2xl hover:-translate-y-3 active:translate-x-0 active:translate-y-0 transition-all h-full flex items-center justify-center";
</script>

<button class={defaultButtonClasses} tabindex="0" onclick={props.onclick}>
  <span class={cn(defaultSpanClasses, props.class)}>
    {props.text ?? m.press_this()}
  </span>
</button>
