<template>
  <PageHeader :title="title()"/>

  <h1 class="text-center">
    {{ title() }}
  </h1>

  <h3 class="text-center">
    {{ $t('watched.all') }}
  </h3>

  <Cards :results="listStore.watched.data"/>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import Cards from '@/Components/Cards.vue';
import PageHeader from '@/Components/PageHeader.vue';
import { LanguageStore } from '@/Stores/LanguageStore';
import { ListStore } from '@/Stores/ListStore';

const instance = getCurrentInstance();

const languageStore = LanguageStore();
const listStore = ListStore();

const user = computed(() => {
  return usePage().props.auth.user;
});

const refreshFav = computed(() => {
  return listStore.favorites.refresh;
});

const refreshWat = computed(() => {
  return listStore.watched.refresh;
});

const translate = computed(() => {
  return languageStore.translate;
});

const title = () => {
  return instance.proxy.$t('auth.dashboard.watched');
};

const getWatched = () => {
  listStore.getAll('watched', user.value.id);
};

const getFavorites = () => {
  listStore.getAll('favorites', user.value.id);
};

watch(refreshFav, () => {
  getFavorites();
});

watch(refreshWat, () => {
  getWatched();
});

watch(translate, () => {
  getFavorites();
  getWatched();
});

onMounted(() => {
  getFavorites();
  getWatched();
});
</script>
