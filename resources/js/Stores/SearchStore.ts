import { defineStore } from 'pinia';
import axios from 'axios';
import { DataStore } from './DataStore';

export const SearchStore = defineStore('search', {
  state: () => ({
    search: '',
    url: '',
    searchPage: 1,
    searching: false,
    dataStore: DataStore(),
  }),

  actions: {
    getSearch () {
      axios({
        method: 'POST',
        url: route('api.search'),
        data: {
          url: this.url,
          query: this.search,
          page: String(this.searchPage),
        },
      }).then(res => {
        this.searchPage = res.data.page;

        if (res.data.total_pages <= 500) {
          this.dataStore.totalPages = res.data.total_pages;
        }

        this.dataStore.data = res.data;
      });
    },
  },
});
