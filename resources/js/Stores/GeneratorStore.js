import { defineStore } from 'pinia';
import { LanguageStore } from '@/Stores/LanguageStore';

export const GeneratorStore = defineStore('generator', {
  state: () => ({
    choice: 0,
    genre: '',
    decade: '',
    rating: [0, 10],
    runtime: 250,
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
      console.log('test');
    },
  },
});
