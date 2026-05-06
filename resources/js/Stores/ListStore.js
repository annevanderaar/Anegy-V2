import { defineStore } from 'pinia';
import { LanguageStore } from '@/Stores/LanguageStore';
import axios from 'axios';

export const ListStore = defineStore('list', {
  state: () => ({
    favorites: {
      data: [],
      ids: [],
      refresh: false,
    },
    watched: {
      data: [],
      ids: [],
      refresh: false,
    },
    languageStore: LanguageStore(),
  }),
  actions: {
    getListState (kind) {
      return this[kind];
    },
    getType (video, known, air) {
      if (known) return 'person';
      if (air) return 'tv';
      if (!video) return 'movie';

      return '';
    },
    async getAll (kind, userId) {
      const list = this.getListState(kind);

      list.ids = [];
      list.data = [];

      const res = await axios({
        method: 'PATCH',
        url: route(`api.${kind}.all`, { id: userId }),
      });

      if (!res.data?.length) return;

      list.ids = res.data.map(item => item.ms_id);

      res.data.forEach(item => {
        this.getDetails(kind, `/${item.type}/${item.ms_id}`);
      });
    },
    async getDetails (kind, url) {
      const list = this.getListState(kind);

      const res = await axios({
        method: 'POST',
        url: route('api.details'),
        data: {
          url,
          language: this.languageStore.tmdb,
        },
      });

      list.data.push(res.data);
    },
    async create (kind, userId, msId, video, known, air) {
      const list = this.getListState(kind);
      const msType = this.getType(video, known, air);

      await axios({
        method: 'POST',
        url: route(`api.${kind}.store`),
        data: {
          user_id: userId,
          ms_id: msId,
          type: msType,
        },
      });

      list.refresh = !list.refresh;
    },
    async delete (kind, userId, msId) {
      const list = this.getListState(kind);

      await axios({
        method: 'DELETE',
        url: route(`api.${kind}.delete`),
        data: {
          user_id: userId,
          ms_id: msId,
        },
      });

      list.refresh = !list.refresh;
    },
    async getLatest (kind, userId) {
      const list = this.getListState(kind);

      list.ids = [];
      list.data = [];

      const res = await axios({
        method: 'PUT',
        url: route(`api.${kind}.latest`, { id: userId }),
      });

      if (!res.data) return;

      list.ids = [res.data.ms_id];

      await this.getDetails(kind, `/${res.data.type}/${res.data.ms_id}`);
    },
  },
});
