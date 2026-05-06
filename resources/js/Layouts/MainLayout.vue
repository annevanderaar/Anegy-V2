<template>
  <v-app>
    <AppBar/>
    <v-main>
      <v-container fluid>
        <slot/>
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount } from 'vue';
import { useTheme } from 'vuetify';
import AppBar from '@/Components/AppBar/AppBar.vue';
import Footer from '@/Components/Footer.vue';
import { LanguageStore } from '@/Stores/LanguageStore';

const theme = useTheme();
const languageStore = LanguageStore();

const instance = getCurrentInstance();

onBeforeMount(() => {
  const savedLocale = localStorage.getItem('vue_i18n_locale');

  if (!savedLocale) {
    instance.proxy.$i18n.locale = languageStore.i18n;
  } else {
    instance.proxy.$i18n.locale = savedLocale;
    languageStore.i18n = savedLocale;
  }

  if (languageStore.i18n === 'en') {
    languageStore.tmdb = 'en-US';
    localStorage.setItem('language', 'en-US');
  } else if (languageStore.i18n === 'nl') {
    languageStore.tmdb = 'nl-NL';
    localStorage.setItem('language', 'nl-NL');
  }

  const savedTheme = localStorage.getItem('dark_theme');

  if (savedTheme) {
    theme.global.name.value = savedTheme;
  }
});
</script>

<style>
@import "../../css/app.css";
</style>
