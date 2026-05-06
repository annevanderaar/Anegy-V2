<template>
  <PageHeader :title="$t('homepage.title')"/>

  <h1 class="mb-5 text-center">
    {{ $t('homepage.trending_title') }}
  </h1>

  <Cards :results="data.results"/>

  <v-pagination
    v-model="dataStore.page"
    :length="dataStore.totalPages"
    :total-visible="!mobile ? 15 : 3"
    color="secondary"
    class="my-4"
  />
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useDisplay } from 'vuetify';
import Cards from '@/Components/Cards.vue';
import PageHeader from '@/Components/PageHeader.vue';
import { DataStore } from '@/Stores/DataStore';
import { LanguageStore } from '@/Stores/LanguageStore';
import { SearchStore } from '@/Stores/SearchStore';
import { ListStore } from '@/Stores/ListStore';

const { mobile } = useDisplay();

const languageStore = LanguageStore();
const dataStore = DataStore();
const searchStore = SearchStore();
const listStore = ListStore();

const data = computed(() => {
  return dataStore.data;
});

const page = computed(() => {
  return dataStore.page;
});

const translate = computed(() => {
  return languageStore.translate;
});

const user = computed(() => {
  return usePage().props.auth.user;
});

const refreshFav = computed(() => {
  return listStore.favorites.refresh;
});

const refreshWat = computed(() => {
  return listStore.watched.refresh;
});

const scroll = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const getFavorites = () => {
  if (user.value) {
    listStore.getAll('favorites', user.value.id);
  }
};

const getWatched = () => {
  if (user.value) {
    listStore.getAll('watched', user.value.id);
  }
};

watch(page, val => {
  localStorage.currentPage = val;

  if (searchStore.searching) {
    searchStore.searchPage = val;
    searchStore.getSearch();
  } else {
    dataStore.page = val;
    dataStore.getDiscover();
  }

  scroll();
});

watch(translate, () => {
  dataStore.getDiscover();
});

watch(refreshFav, () => {
  getFavorites();
});

watch(refreshWat, () => {
  getWatched();
});

onMounted(() => {
  if (localStorage.currentPage) {
    dataStore.page = parseInt(localStorage.currentPage);
  }

  dataStore.url = '/trending/all/day?';
  dataStore.getDiscover();

  getFavorites();
  getWatched();
});
</script>
