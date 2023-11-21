import { defineStore } from 'pinia';
import { LanguageStore } from './LanguageStore';
import axios from 'axios';

export const DetailsStore = defineStore('detail', {
  state: () => ({
    data: {},
    links: {},
    providers: {},
    credits: {},
    collection: {},
    seasons: [],
    episodes: [],
    videos: [],
    reviews: [],
    similar: [],
    personMovies: {},
    personSeries: {},
    images: {},
    languageStore: LanguageStore(),
  }),

  actions: {
    getDetails (url: string) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.data = res.data;

        if (this.data?.seasons?.length > 0) {
          this.seasons = this.data.seasons;
        }

        if (this.data?.belongs_to_collection) {
          this.getCollection(`/collection/${this.data.belongs_to_collection.id}`);
        }
      });
    },

    getLinks (url: string) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.links = res.data;
      });
    },

    getProviders (url: string) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.providers = res.data.results.NL;
      });
    },

    getCredits (url: string) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.credits = res.data;
      });
    },

    getCollection (url: string) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.collection = res.data;
      });
    },

    getSeasonDetails (url: string) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.episodes = res.data.episodes;
      });
    },

    getVideos (url: string) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.videos = res.data.results;
      });
    },

    getReviews (url: string) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.reviews = res.data.results;
      });
    },

    getSimilar (url: string) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.similar = res.data.results;
      });
    },

    getPersonMovies (id: number) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url: `/person/${id}/movie_credits`,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.personMovies = res.data;
      });
    },

    getPersonSeries (id: number) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url: `/person/${id}/tv_credits`,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.personSeries = res.data;
      });
    },

    getImages (id: number) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url: `/person/${id}/images`,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.images = res.data;
      });
    },
  },
});
