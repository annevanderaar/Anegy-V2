<template>
  <Head :title="$t('homepage.title')">
    <title>{{ $t('homepage.title') }}</title>
  </Head>

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
import { Head } from '@inertiajs/vue3';
import Cards from '@/Components/Cards.vue';
import { LanguageStore } from '@/Stores/LanguageStore';
import { DataStore } from '@/Stores/DataStore';
import { SearchStore } from '@/Stores/SearchStore';

export default defineComponent({
  name: 'Homepage',

  components: {
    Cards,
    Head,
  },

  data () {
    return {
      languageStore: LanguageStore(),
      dataStore: DataStore(),
      searchStore: SearchStore(),
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
  },

  methods: {
    scroll () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
  },

  mounted () {
    if (localStorage.currentPage) {
      this.dataStore.page = parseInt(localStorage.currentPage);
    }
    this.dataStore.url = '/trending/all/day?';
    this.dataStore.getDiscover();
  },
});
</script>
