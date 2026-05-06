<template>
  <v-app-bar color="secondary" clipped-left>
    <v-menu transition="slide-y-transition">
      <template #activator="{ props: menuProps }">
        <IconButton v-bind="menuProps" icon="mdi-menu"/>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :href="item.route"
          @click="$emit('reset-page')"
        >
          <v-list-item-title>
            <v-icon :icon="item.icon" class="mr-3"/>
            {{ $t(item.name) }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-if="user" @click="$emit('logout')">
          <v-list-item-title>
            <v-icon icon="mdi-logout" class="mr-3"/>
            {{ $t('auth.logout.title') }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <IconButton
      v-if="showSearch"
      icon="mdi-magnify"
      @click="$emit('update:showField', !showField)"
    />

    <v-btn
      v-else
      disabled
      icon
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
      icon
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

    <v-btn
      append-icon="mdi-earth"
      class="text-white"
      @click="$emit('translate')"
    >
      {{ languageStore.i18n }}
    </v-btn>

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
  margin-left: 110px;
}
</style>
