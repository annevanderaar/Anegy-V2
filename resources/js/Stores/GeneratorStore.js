import { defineStore } from 'pinia';
import { LanguageStore } from '@/Stores/LanguageStore';
import axios from 'axios';
import route from 'ziggy-js';

export const GeneratorStore = defineStore('generator', {
  state: () => ({
    choice: 0,
    genre: '',
    decade: '',
    rating: [0, 10],
    runtime: 250,
    result: {},
    languageStore: LanguageStore(),
    decades: [
      {
        label: '1900-1979',
        gte: '1900-01-01',
        lte: '1979-12-31',
      },
      {
        label: '1980-1989',
        gte: '1980-01-01',
        lte: '1989-12-31',
      },
      {
        label: '1990-1999',
        gte: '1990-01-01',
        lte: '1999-12-31',
      },
      {
        label: '2000-2009',
        gte: '2000-01-01',
        lte: '2009-12-31',
      },
      {
        label: '2010-2019',
        gte: '2010-01-01',
        lte: '2019-12-31',
      },
      {
        label: '2020-2029',
        gte: '2020-01-01',
        lte: '2029-12-31',
      },
    ],
  }),

  actions: {
    generate () {
      let url;
      if (this.choice === 0) {
        url = '/discover/movie?';
      } else if (this.choice === 1) {
        url = '/discover/tv?';
      }

      axios({
        method: 'POST',
        url: route('api.generator'),
        data: {
          url,
          page: Math.floor(Math.random() * 101).toString(),
          genre: this.genre.id,
          decade: this.decade,
          runtime: this.runtime,
          rating: this.rating,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        if (res.data?.results?.length > 0) {
          this.result = res.data.results[Math.floor(Math.random() * 20)];
        }
      });
    },
  },
});
