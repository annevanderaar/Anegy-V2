<template>
  <v-app-bar
    color="secondary"
    clipped-left
  >
    <v-menu transition="slide-y-transition">
      <template #activator="{ props }">
        <IconButton
          v-bind="props"
          icon="mdi-menu"
        />
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :href="item.route"
          @click="resetPage"
        >
          <v-list-item-title>
            <v-icon
              :icon="item.icon"
              class="mr-3"
            />
            {{ item.name }}
          </v-list-item-title>
        </v-list-item>

        <ResponsiveNavLink
          v-if="user"
          :href="route('logout')"
          class="ml-1"
          method="post"
          as="button"
        >
          <v-icon
            icon="mdi-logout"
            class="mr-3"
          />
          {{ $t('auth.logout.title') }}
        </ResponsiveNavLink>
      </v-list>
    </v-menu>

    <IconButton
      v-if="showSearch"
      icon="mdi-magnify"
      @click="showField = !showField"
    />

    <v-btn
      v-else
      :disabled="true"
      icon
    />

    <v-text-field
      v-if="showField"
      ref="textField"
      v-model="searchStore.search"
      :label="$t('appbar.search')"
      :autofocus="true"
      variant="solo"
      density="compact"
      class="mt-6 text-field"
    />

    <v-divider class="border-opacity-0"/>

    <v-btn
      :href="route('home')"
      variant="plain"
      class="ms-6"
      icon
      @click="resetPage"
    >
      <v-img
        alt="Anegy logo"
        src="/Anegy-logo.png"
        transition="scale-transition"
        width="40px"
        height="40px"
        contain
      />
    </v-btn>

    <v-divider class="border-opacity-0"/>

    <v-btn
      append-icon="mdi-earth"
      class="text-white"
      @click="translate"
    >
      {{ languageStore.i18n }}
    </v-btn>

    <IconButton
      :icon="!dark ? 'mdi-moon-waning-crescent' : 'mdi-weather-sunny'"
      @click="darkMode"
    />
  </v-app-bar>
</template>

<script>
import { defineComponent } from 'vue';
import { LanguageStore } from '@/Stores/LanguageStore';
import { useTheme } from 'vuetify';
import { DataStore } from '@/Stores/DataStore';
import { SearchStore } from '@/Stores/SearchStore';
import { usePage } from '@inertiajs/vue3';
import IconButton from '@/Components/IconButton.vue';
import ResponsiveNavLink from '@/Components/Breeze/ResponsiveNavLink.vue';
import route from 'ziggy-js';

export default defineComponent({
  name: 'MobileAppBar',

  components: {
    ResponsiveNavLink,
    IconButton,
  },

  data () {
    return {
      showField: false,
      dataStore: DataStore(),
      searchStore: SearchStore(),
      languageStore: LanguageStore(),
      theme: useTheme(),
      items: [
        { route: route('generator'), name: this.$t('generator.title'), icon: 'mdi-generator-portable' },
        { route: route('movies.discover'), name: this.$t('appbar.movies_discover'), icon: 'mdi-movie-open' },
        { route: route('series.discover'), name: this.$t('appbar.series_discover'), icon: 'mdi-television-classic' },
        { route: route('dashboard'), name: this.$t('auth.dashboard.title'), icon: 'mdi-view-dashboard' },
        { route: route('favorites'), name: this.$t('auth.dashboard.favorites'), icon: 'mdi-book-heart' },
        { route: route('profile.edit'), name: this.$t('auth.dashboard.edit_profile'), icon: 'mdi-account-edit' },
      ],
    };
  },

  computed: {
    showSearch () {
      return !(route().current('movies.details') ||
        route().current('series.details') ||
        route().current('person.details'));
    },

    dark () {
      return this.theme.global.name === 'darkTheme';
    },

    search () {
      return this.searchStore.search;
    },

    user () {
      return usePage().props.auth.user;
    },
  },

  methods: {
    route,

    darkMode () {
      this.theme.global.name = this.dark ? 'lightTheme' : 'darkTheme';
      localStorage.setItem('dark_theme', String(this.theme.global.name));
    },

    translate () {
      this.languageStore.i18n = this.languageStore.i18n === 'en' ? 'nl' : 'en';
      localStorage.setItem('vue_i18n_locale', this.languageStore.i18n);
      this.$i18n.locale = this.languageStore.i18n;

      if (this.languageStore.i18n === 'en') {
        this.languageStore.tmdb = 'en-US';
        localStorage.setItem('language', 'en-US');
      } else if (this.languageStore.i18n === 'nl') {
        this.languageStore.tmdb = 'nl-NL';
        localStorage.setItem('language', 'nl-NL');
      }

      this.languageStore.translate = !this.languageStore.translate;
    },

    resetPage () {
      localStorage.currentPage = 1;
    },
  },

  watch: {
    showField (val) {
      if (!val) {
        this.searchStore.search = '';
      }
    },

    search (val) {
      if (!val) {
        this.dataStore.getDiscover();
        return;
      }

      this.searchStore.searching = !!val;

      if (route().current('movies.*')) {
        this.searchStore.url = '/search/movie?';
      } else if (route().current('series.*')) {
        this.searchStore.url = '/search/tv?';
      } else if (route().current('home')) {
        this.searchStore.url = '/search/multi?';
      }

      this.searchStore.getSearch();
    },
  },
});
</script>

<style scoped>
.text-field {
  width: 200px;
  z-index: 9999;
  position: absolute;
  margin-left: 110px;
}
</style>
