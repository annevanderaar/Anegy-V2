<template>
  <v-app>
    <AppBar/>
    <v-main>
      <v-container :fluid="true">
        <slot/>
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';
import AppBar from '@/Components/AppBar.vue';
import Footer from '@/Components/Footer.vue';
import { useTheme } from 'vuetify';
import { LanguageStore } from '@/Stores/LanguageStore';

export default defineComponent({
  name: 'MainLayout',

  components: {
    Footer,
    AppBar,
  },

  data () {
    return {
      theme: useTheme(),
      languageStore: LanguageStore(),
    };
  },

  created () {
    if (!localStorage.getItem('vue_i18n_locale')) {
      this.$i18n.locale = this.languageStore.i18n;
    }
    this.$i18n.locale = localStorage.getItem('vue_i18n_locale');
    this.languageStore.i18n = localStorage.getItem('vue_i18n_locale');

    if (this.languageStore.i18n === 'en') {
      this.languageStore.tmdb = 'en-US';
      localStorage.setItem('language', 'en-US');
    } else if (this.languageStore.i18n === 'nl') {
      this.languageStore.tmdb = 'nl-NL';
      localStorage.setItem('language', 'nl-NL');
    }

    if (localStorage.getItem('dark_theme')) {
      this.theme.global.name = localStorage.getItem('dark_theme');
    }
  },
});
</script>
