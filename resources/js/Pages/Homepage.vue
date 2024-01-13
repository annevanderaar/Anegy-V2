<template>
  <PageHeader :title="$t('homepage.title')"/>

  <h1 class="mb-5 text-center">
    {{ $t('homepage.trending_title') }}
  </h1>

  <Cards :results="data.results"/>

  <v-pagination
    v-model="dataStore.page"
    :length="dataStore.totalPages"
    :total-visible="10"
    color="secondary"
    class="my-4"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { LanguageStore } from '@/Stores/LanguageStore';
import { DataStore } from '@/Stores/DataStore';
import { SearchStore } from '@/Stores/SearchStore';
import { FavoriteStore } from '@/Stores/FavoriteStore';
import Cards from '@/Components/Cards.vue';
import PageHeader from '@/Components/PageHeader.vue';

export default defineComponent({
  name: 'Homepage',

  components: {
    PageHeader,
    Cards,
  },

  data () {
    return {
      languageStore: LanguageStore(),
      dataStore: DataStore(),
      searchStore: SearchStore(),
      favoriteStore: FavoriteStore(),
    };
  },

  computed: {
    data () {
      return this.dataStore.data;
    },

    page () {
      return this.dataStore.page;
    },

    translate () {
      return this.languageStore.translate;
    },

    user () {
      return usePage().props.auth.user;
    },

    refresh () {
      return this.favoriteStore.refresh;
    },
  },

  methods: {
    scroll () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    getFavorites () {
      if (this.user) {
        this.favoriteStore.getFavorites(this.user.id);
      }
    },
  },

  watch: {
    page (val) {
      localStorage.currentPage = val;
      if (this.searchStore.searching) {
        this.searchStore.searchPage = val;
        this.searchStore.getSearch();
      } else {
        this.dataStore.page = val;
        this.dataStore.getDiscover();
      }
      this.scroll();
    },

    translate () {
      this.dataStore.getDiscover();
    },

    refresh () {
      this.getFavorites();
    },
  },

  mounted () {
    if (localStorage.currentPage) {
      this.dataStore.page = parseInt(localStorage.currentPage);
    }
    this.dataStore.url = '/trending/all/day?';
    this.dataStore.getDiscover();
    this.getFavorites();
  },
});
</script>
