<template>
  <v-app-bar
    color="secondary"
    clipped-left
  >
    <v-tooltip :text="$t('generator.title')" location="bottom">
      <template #activator="{ props }">
        <IconButton
          v-bind="props"
          :href="route('generator')"
          icon="mdi-generator-portable"
          @click="resetPage"
        />
      </template>
    </v-tooltip>

    <v-tooltip :text="$t('appbar.movies_discover')" location="bottom">
      <template #activator="{ props }">
        <IconButton
          v-bind="props"
          :href="route('movies.discover')"
          icon="mdi-movie-open"
          @click="resetPage"
        />
      </template>
    </v-tooltip>

    <v-tooltip :text="$t('appbar.series_discover')" location="bottom">
      <template #activator="{ props }">
        <IconButton
          v-bind="props"
          :href="route('series.discover')"
          icon="mdi-television-classic"
          @click="resetPage"
        />
      </template>
    </v-tooltip>

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
      v-if="!user"
      :disabled="true"
      icon
    />

    <v-btn
      append-icon="mdi-earth"
      class="text-white"
      @click="translate"
    >
      {{ this.languageStore.i18n }}
    </v-btn>

    <IconButton
      v-if="!user"
      :href="route('dashboard')"
      icon="mdi-account"
    />

    <!-- Dropdown -->
    <div class="d-flex justify-space-around">
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-if="user"
            v-bind="props"
            prepend-icon="mdi-account"
          >
            {{ user.firstname }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :href="item.route"
          >
            <v-icon
              :icon="item.icon"
              class="mr-3"
              color="accent"
            />
            {{ item.name }}
          </v-list-item>

          <ResponsiveNavLink
            :href="route('logout')"
            class="ml-1"
            method="post"
            as="button"
          >
            <v-icon
              icon="mdi-logout"
              class="mr-3"
              color="accent"
            />
            {{ $t('auth.logout.title') }}
          </ResponsiveNavLink>
        </v-list>
      </v-menu>
    </div>

    <IconButton
      :icon="!dark ? 'mdi-moon-waning-crescent' : 'mdi-weather-sunny'"
      @click="darkMode"
    />
  </v-app-bar>
</template>

<script>
import { defineComponent } from 'vue';
import IconButton from '@/Components/IconButton.vue';
import route from 'ziggy-js';
import { LanguageStore } from '@/Stores/LanguageStore';
import { useTheme } from 'vuetify';
import { SearchStore } from '@/Stores/SearchStore';
import { DataStore } from '@/Stores/DataStore';
import { usePage } from '@inertiajs/vue3';
import ResponsiveNavLink from '@/Components/Breeze/ResponsiveNavLink.vue';

export default defineComponent({
  name: 'AppBar',

  emits: ['translate'],

  components: {
    IconButton,
    ResponsiveNavLink,
  },

  data () {
    return {
      showField: false,
      dataStore: DataStore(),
      searchStore: SearchStore(),
      languageStore: LanguageStore(),
      theme: useTheme(),
      items: [
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

    mobile () {
      return this.$vuetify.display.mobile;
    },
  },

  methods: {
    route,

    darkMode () {
      this.theme.global.name = this.theme.global.name === 'darkTheme' ? 'lightTheme' : 'darkTheme';
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
  margin-left: 160px;
}
</style>
