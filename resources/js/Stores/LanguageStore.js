import { defineStore } from 'pinia';

export const LanguageStore = defineStore('language', {
  state: () => ({
    i18n: 'nl',
    tmdb: 'nl-NL',
    translate: false,
  }),
});
