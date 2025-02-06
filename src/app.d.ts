/// <reference types="@sveltejs/kit" />
import type { AvailableLanguageTag } from "$lib/paraglide/runtime";

declare global {
  namespace App {
    // interface Platform {}
    // interface Session {}
    // interface Stuff {}
    interface Locals {
      lang: AvailableLanguageTag;
    }
  }
}

export {};
