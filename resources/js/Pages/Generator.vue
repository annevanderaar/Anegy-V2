<template>
  <PageHeader :title="$t('generator.title')"/>

  <div class="text-center">
    <h1>{{ $t('generator.title') }}</h1>

    <h3>{{ $t('generator.overview') }}</h3>
  </div>

  <div class="d-flex justify-center flex-column align-center mt-2">
    <div>
      <v-btn-toggle
        v-model="generatorStore.choice"
        variant="outlined"
        color="accent"
        divided
      >
        <v-btn>
          {{ $t('movie') }}
        </v-btn>

        <v-btn>
          {{ $t('serie') }}
        </v-btn>
      </v-btn-toggle>
    </div>

    <h4 class="mt-2">
      {{ $t('generator.choose_genre') }}
    </h4>

    <div class="mt-2 select-width">
      <VueMultiselect
        v-model="generatorStore.genre"
        :options="getGenres()"
        placeholder="Genres"
        label="name"
        track-by="id"
      />
    </div>

    <h4 class="mt-2">
      {{ $t('generator.choose_decade') }}
      <span v-if="generatorStore.choice === 1">
        {{ $t('generator.decade_serie') }}
      </span>
    </h4>

    <div class="mt-2 select-width">
      <VueMultiselect
        v-model="generatorStore.decade"
        :options="generatorStore.decades"
        :placeholder="$t('generator.decades')"
        label="label"
        track-by="label"
      />
    </div>

    <h4 class="mt-2">
      {{ $t('generator.choose_rating') }}
    </h4>

    <div class="mt-2 select-width">
      <v-range-slider
        v-model="generatorStore.rating"
        :min="0"
        :max="10"
        :step="0.1"
        thumb-label="always"
        color="accent"
        strict
      />
    </div>

    <h4 class="mt-2">
      {{ $t('generator.choose_runtime') }}
    </h4>

    <p>
      {{ $t('generator.less_than') }}
      <strong>{{ generatorStore.runtime }}</strong>
      {{ $t('generator.minutes') }}
    </p>

    <div class="mt-2 select-width">
      <v-slider
        v-model="generatorStore.runtime"
        :min="10"
        :max="250"
        :step="1"
        color="accent"
      />
    </div>

    <v-btn
      color="accent"
      @click="generatorStore.generate"
    >
      {{ $t('generator.generate') }}
    </v-btn>

    <Cards v-if="generatorStore.result?.id" :results="[generatorStore.result]"/>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import VueMultiselect from 'vue-multiselect';
import Cards from '@/Components/Cards.vue';
import PageHeader from '@/Components/PageHeader.vue';
import { FilterStore } from '@/Stores/FilterStore';
import { GeneratorStore } from '@/Stores/GeneratorStore';
import { LanguageStore } from '@/Stores/LanguageStore';

const generatorStore = GeneratorStore();
const filterStore = FilterStore();
const languageStore = LanguageStore();

const translate = computed(() => {
  return languageStore.translate;
});

const getGenres = () => {
  if (generatorStore.choice === 0) {
    return filterStore.movieGenres;
  }

  return filterStore.serieGenres;
};

watch(translate, () => {
  generatorStore.getResult();
});

onMounted(() => {
  generatorStore.result = {};
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style>
.select-width {
  min-width: 250px;
}

.multiselect__tags,
.multiselect__single,
.multiselect__input,
.multiselect__content-wrapper {
  background: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-on-primary)) !important;
  border-color: rgb(var(--v-theme-accent)) !important;
}

.multiselect__placeholder,
.multiselect__input::placeholder {
  color: rgb(var(--v-theme-on-primary)) !important;
  opacity: 0.7;
}

.multiselect__option--highlight:not(.multiselect__option--selected),
.multiselect__option--highlight:not(.multiselect__option--selected)::after {
  background: rgb(var(--v-theme-accent)) !important;
}

.multiselect__select::before {
  border-color: rgb(var(--v-theme-on-primary)) transparent transparent transparent !important;
}
</style>
