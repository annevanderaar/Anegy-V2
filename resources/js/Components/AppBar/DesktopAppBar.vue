<template>
  <v-app-bar color="secondary" clipped-left>
    <v-tooltip :text="$t('generator.title')" location="bottom">
      <template #activator="{ props: tooltipProps }">
        <IconButton
          v-bind="tooltipProps"
          :href="route('generator')"
          icon="mdi-generator-portable"
          @click="$emit('reset-page')"
        />
      </template>
    </v-tooltip>

    <v-tooltip :text="$t('appbar.movies_discover')" location="bottom">
      <template #activator="{ props: tooltipProps }">
        <IconButton
          v-bind="tooltipProps"
          :href="route('movies.discover')"
          icon="mdi-movie-open"
          @click="$emit('reset-page')"
        />
      </template>
    </v-tooltip>

    <v-tooltip :text="$t('appbar.series_discover')" location="bottom">
      <template #activator="{ props: tooltipProps }">
        <IconButton
          v-bind="tooltipProps"
          :href="route('series.discover')"
          icon="mdi-television-classic"
          @click="$emit('reset-page')"
        />
      </template>
    </v-tooltip>

    <IconButton
      v-if="showSearch"
      icon="mdi-magnify"
      @click="$emit('update:showField', !showField)"
    />

    <v-btn
      v-else
      icon=""
      disabled
    />

    <v-text-field
      v-if="showField"
      v-model="searchStore.search"
      :label="$t('appbar.search')"
      variant="solo"
      density="compact"
      class="mt-6 c-text-field"
      autofocus
    />

    <v-divider class="border-opacity-0"/>

    <v-btn
      :href="route('home')"
      variant="plain"
      class="ms-6"
      icon=""
      @click="$emit('reset-page')"
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

    <v-btn icon="" disabled/>

    <v-btn
      append-icon="mdi-earth"
      class="text-white"
      @click="$emit('translate')"
    >
      {{ languageStore.i18n }}
    </v-btn>

    <IconButton
      v-if="!user"
      :href="route('dashboard')"
      icon="mdi-account"
    />

    <div class="d-flex justify-space-around">
      <v-menu>
        <template #activator="{ props: menuProps }">
          <v-btn
            v-if="user"
            v-bind="menuProps"
            icon="mdi-account"
            variant="text"
          >
            {{ user.firstname.substring(0, 1).toUpperCase() }}
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
            {{ $t(item.name) }}
          </v-list-item>

          <v-list-item v-if="user" @click="$emit('logout')">
            <v-list-item-title>
              <v-icon
                icon="mdi-logout"
                class="mr-3"
                color="accent"
              />

              {{ $t('auth.logout.title') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <IconButton
      :icon="!dark ? 'mdi-moon-waning-crescent' : 'mdi-weather-sunny'"
      @click="$emit('dark-mode')"
    />
  </v-app-bar>
</template>

<script setup>
import IconButton from '@/Components/IconButton.vue';
import { route } from 'ziggy-js';
import { LanguageStore } from '@/Stores/LanguageStore';
import { SearchStore } from '@/Stores/SearchStore';

defineProps({
  showField: {
    type: Boolean,
    required: true,
  },
  showSearch: {
    type: Boolean,
    required: true,
  },
  dark: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object,
    required: false,
    default: null,
  },
  items: {
    type: Array,
    required: true,
  },
});

defineEmits([
  'update:showField',
  'reset-page',
  'logout',
  'translate',
  'dark-mode',
]);

const searchStore = SearchStore();
const languageStore = LanguageStore();
</script>

<style scoped>
.c-text-field {
  margin-left: 205px;
}
</style>
