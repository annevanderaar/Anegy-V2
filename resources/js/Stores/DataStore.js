import { defineStore } from 'pinia';
import { LanguageStore } from './LanguageStore';
import route from 'ziggy-js';
import axios from 'axios';

export const DataStore = defineStore('data', {
  state: () => ({
    url: '',
    data: [],
    genres: [],
    page: 1,
    totalPages: 500,
    rating: [0, 10],
    languageStore: LanguageStore(),
  }),

  actions: {
    getDiscover () {
      axios({
        method: 'POST',
        url: route('api.discover'),
        data: {
          url: this.url,
          page: String(this.page),
          genres: encodeURI(this.genres.join(',')),
          rating: this.rating,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.currentPage = res.data.page;

        if (res.data.total_pages <= 500) {
          this.totalPages = res.data.total_pages;
        }

        this.data = res.data;
      });
    },
  },
});
