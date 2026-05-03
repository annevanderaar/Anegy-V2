import { defineStore } from 'pinia';
import { LanguageStore } from '@/Stores/LanguageStore';
import axios from 'axios';

export const WatchedStore = defineStore('watched', {
  state: () => ({
    data: [],
    watched: [],
    languageStore: LanguageStore(),
    refresh: false,
  }),

  actions: {
    getWatched (id) {
      this.watched = [];
      this.data = [];
      axios({
        method: 'PATCH',
        url: route('api.watched.all', { id }),
      }).then(res => {
        if (res.data.length > 0) {
          res.data.forEach(item => {
            this.watched.push(item.ms_id);
            this.getDetails(`/${item.type}/${item.ms_id}`);
          });
        }
      });
    },

    getDetails (url) {
      axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url,
          language: this.languageStore.tmdb,
        },
      }).then(res => {
        this.data.push(res.data);
      });
    },

    createWatched (userId, msId, video, known, air) {
      let msType = '';
      if (known) {
        msType = 'person';
      } else if (air) {
        msType = 'tv';
      } else if (!video) {
        msType = 'movie';
      }

      axios({
        method: 'POST',
        url: route('api.watched.store'),
        data: {
          user_id: userId,
          ms_id: msId,
          type: msType,
        },
      }).then(() => {
        this.refresh = !this.refresh;
      });
    },

    deleteWatched (userId, msId) {
      axios({
        method: 'DELETE',
        url: route('api.watched.delete'),
        data: {
          user_id: userId,
          ms_id: msId,
        },
      }).then(() => {
        this.refresh = !this.refresh;
      });
    },

    getLatestWatched (id) {
      this.watched = [];
      this.data = [];
      axios({
        method: 'PUT',
        url: route('api.watched.latest', { id }),
      }).then(res => {
        if (res.data) {
          this.watched.push(res.data.ms_id);
          this.getDetails(`/${res.data.type}/${res.data.ms_id}`);
        }
      });
    },
  },
});
