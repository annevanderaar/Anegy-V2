import { defineStore } from 'pinia';
import { LanguageStore } from './LanguageStore';
import axios from 'axios';

export const FavoriteStore = defineStore('favorite', {
  state: () => ({
    data: [],
    favorites: [],
    languageStore: LanguageStore(),
    refresh: false,
  }),

  actions: {
    getFavorites (id) {
      this.favorites = [];
      this.data = [];
      axios({
        method: 'PATCH',
        url: route('api.favorites.all', { id }),
      }).then(res => {
        if (res.data.length > 0) {
          res.data.forEach(item => {
            this.favorites.push(item.ms_id);

            let val;
            if (item.type === 'movie') {
              val = 'movie';
            } else if (item.type === 'tv') {
              val = 'tv';
            } else if (item.type === 'person') {
              val = 'person';
            }

            this.getDetails(`/${val}/${item.ms_id}`);
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

    createFavorite (userId, msId, video, known, air) {
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
        url: route('api.favorites.store'),
        data: {
          user_id: userId,
          ms_id: msId,
          type: msType,
        },
      }).then(() => {
        this.refresh = !this.refresh;
      });
    },

    deleteFavorite (userId, msId) {
      axios({
        method: 'PUT',
        url: route('api.favorites.delete'),
        data: {
          user_id: userId,
          ms_id: msId,
        },
      }).then(() => {
        this.refresh = !this.refresh;
      });
    },
  },
});
