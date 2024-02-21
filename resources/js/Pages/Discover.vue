<template>
  <PageHeader :title="pageName"/>

  <FilterButton @click="filterStore.drawer = true"/>

  <h1 class="text-center">
    {{ pageName }}
  </h1>

  <Filter/>

  <Cards :results="data.results"/>

  <v-pagination
    v-model="dataStore.page"
    :length="dataStore.totalPages"
    :total-visible="!mobile ? 10 : 4"
    color="secondary"
    class="my-4"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { LanguageStore } from '@/Stores/LanguageStore';
import { DataStore } from '@/Stores/DataStore';
import { FilterStore } from '@/Stores/FilterStore';
import { SearchStore } from '@/Stores/SearchStore';
import { FavoriteStore } from '@/Stores/FavoriteStore';
import Cards from '@/Components/Cards.vue';
import Filter from '@/Components/Filters/Filter.vue';
import FilterButton from '@/Components/Filters/FilterButton.vue';
import PageHeader from '@/Components/PageHeader.vue';
import route from 'ziggy-js';

export default defineComponent({
  name: 'Discover',

  components: {
    PageHeader,
    FilterButton,
    Filter,
    Cards,
  },

  data () {
    return {
      languageStore: LanguageStore(),
      dataStore: DataStore(),
      filterStore: FilterStore(),
      searchStore: SearchStore(),
      favoriteStore: FavoriteStore(),
      pageName: '',
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

    genres () {
      return this.filterStore.select;
    },

    user () {
      return usePage().props.auth.user;
    },

    refresh () {
      return this.favoriteStore.refresh;
    },

    mobile () {
      return this.$vuetify.display.mobile;
    },
  },

  methods: {
    getRoutes () {
      if (route().current('movies.discover')) {
        this.pageName = this.$t('discover', { name: this.$t('movies') });
        this.dataStore.url = '/discover/movie?';
      } else if (route().current('movies.trending')) {
        this.pageName = this.$t('trending', { name: this.$t('movies') });
        this.dataStore.url = '/trending/movie/day?';
      } else if (route().current('movies.popular')) {
        this.pageName = this.$t('popular', { name: this.$t('movies') });
        this.dataStore.url = '/movie/popular?';
      } else if (route().current('movies.playing')) {
        this.pageName = this.$t('playing', { name: this.$t('movies') });
        this.dataStore.url = '/movie/now_playing?';
      } else if (route().current('movies.top-rated')) {
        this.pageName = this.$t('top_rated', { name: this.$t('movies') });
        this.dataStore.url = '/movie/top_rated?';
      } else if (route().current('movies.upcoming')) {
        this.pageName = this.$t('upcoming', { name: this.$t('movies') });
        this.dataStore.url = '/movie/upcoming?';
      }

      if (route().current('series.discover')) {
        this.pageName = this.$t('discover', { name: this.$t('series') });
        this.dataStore.url = '/discover/tv?';
      } else if (route().current('series.trending')) {
        this.pageName = this.$t('trending', { name: this.$t('series') });
        this.dataStore.url = '/trending/tv/day?';
      } else if (route().current('series.popular')) {
        this.pageName = this.$t('popular', { name: this.$t('series') });
        this.dataStore.url = '/tv/popular?';
      } else if (route().current('series.playing')) {
        this.pageName = this.$t('playing', { name: this.$t('series') });
        this.dataStore.url = '/tv/on_the_air?';
      } else if (route().current('series.top-rated')) {
        this.pageName = this.$t('top_rated', { name: this.$t('series') });
        this.dataStore.url = '/tv/top_rated?';
      } else if (route().current('series.upcoming')) {
        this.pageName = this.$t('upcoming', { name: this.$t('series') });
        this.dataStore.url = '/tv/airing_today?';
      }

      this.dataStore.getDiscover();
      this.getFavorites();

      if (localStorage.currentPage) {
        this.dataStore.page = parseInt(localStorage.currentPage);
      }
    },

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

    genres () {
      this.dataStore.genres = this.filterStore.selectedGenres;
      this.dataStore.getDiscover();
    },

    refresh () {
      this.getFavorites();
    },
  },

  mounted () {
    this.getRoutes();
  },
});
</script>
