<template>
  <MobileAppBar
    v-if="mobile"
    v-model:show-field="showField"
    :items="mobileItems"
    :show-search="showSearch"
    :dark="dark"
    :user="user"
    @reset-page="resetPage"
    @logout="logout"
    @translate="translate"
    @dark-mode="darkMode"
  />

  <DesktopAppBar
    v-else
    v-model:show-field="showField"
    :items="desktopItems"
    :show-search="showSearch"
    :dark="dark"
    :user="user"
    @reset-page="resetPage"
    @logout="logout"
    @translate="translate"
    @dark-mode="darkMode"
  />
</template>

<script setup>
import { computed, getCurrentInstance, ref, watch } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import { useDisplay, useTheme } from 'vuetify';
import DesktopAppBar from '@/Components/AppBar/DesktopAppBar.vue';
import MobileAppBar from '@/Components/AppBar/MobileAppBar.vue';
import { DataStore } from '@/Stores/DataStore';
import { LanguageStore } from '@/Stores/LanguageStore';
import { SearchStore } from '@/Stores/SearchStore';
import { route } from 'ziggy-js';

const { mobile } = useDisplay();
const theme = useTheme();
const instance = getCurrentInstance();

const showField = ref(false);

const dataStore = DataStore();
const searchStore = SearchStore();
const languageStore = LanguageStore();

const user = computed(() => usePage().props.auth.user);

const showSearch = computed(() => {
  return route().current('home') ||
    route().current('movies.*') ||
    route().current('series.*');
});

const dark = computed(() => {
  return theme.global.name.value === 'darkTheme';
});

const desktopItems = [
  { route: route('dashboard'), name: 'auth.dashboard.title', icon: 'mdi-view-dashboard' },
  { route: route('favorites'), name: 'auth.dashboard.favorites', icon: 'mdi-book-heart' },
  { route: route('watched'), name: 'auth.dashboard.watched', icon: 'mdi-book-check' },
  { route: route('profile.edit'), name: 'auth.dashboard.edit_profile', icon: 'mdi-account-edit' },
];

const mobileItems = [
  { route: route('generator'), name: 'generator.title', icon: 'mdi-generator-portable' },
  { route: route('movies.discover'), name: 'appbar.movies_discover', icon: 'mdi-movie-open' },
  { route: route('series.discover'), name: 'appbar.series_discover', icon: 'mdi-television-classic' },
  ...desktopItems,
];

const darkMode = () => {
  theme.global.name.value = dark.value ? 'lightTheme' : 'darkTheme';
  localStorage.setItem('dark_theme', theme.global.name.value);
};

const translate = () => {
  languageStore.i18n = languageStore.i18n === 'en' ? 'nl' : 'en';
  localStorage.setItem('vue_i18n_locale', languageStore.i18n);

  instance.proxy.$i18n.locale = languageStore.i18n;

  if (languageStore.i18n === 'en') {
    languageStore.tmdb = 'en-US';
    localStorage.setItem('language', 'en-US');
  } else {
    languageStore.tmdb = 'nl-NL';
    localStorage.setItem('language', 'nl-NL');
  }

  languageStore.translate = !languageStore.translate;
};

const resetPage = () => {
  localStorage.currentPage = 1;
};

const logout = () => {
  router.post(route('logout'));

  setTimeout(() => {
    window.location.href = route('home');
  }, 200);
};

watch(showField, val => {
  if (!val) {
    searchStore.search = '';
  }
});

watch(
  () => searchStore.search,
  val => {
    if (!val) {
      dataStore.getDiscover();
      return;
    }

    searchStore.searching = !!val;

    if (route().current('movies.*')) {
      searchStore.url = '/search/movie?';
    } else if (route().current('series.*')) {
      searchStore.url = '/search/tv?';
    } else if (route().current('home')) {
      searchStore.url = '/search/multi?';
    }

    searchStore.getSearch();
  },
);
</script>

<style>
.c-text-field {
  width: 200px;
  z-index: 9999;
  position: absolute;
}
</style>
