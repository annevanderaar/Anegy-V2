import { defineStore } from 'pinia';
import { LanguageStore } from '@/Stores/LanguageStore';

export const GeneralStore = defineStore('general', {
  state: () => ({
    languageStore: LanguageStore(),
  }),
  actions: {
    getDate (date) {
      return new Date(date).toLocaleDateString(this.languageStore.tmdb, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
});
