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
        :divided="true"
        variant="outlined"
        color="accent"
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
        :strict="true"
        :min="0"
        :max="10"
        :step="0.1"
        thumb-label="always"
        color="accent"
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

<script>
import { defineComponent } from 'vue';
import { GeneratorStore } from '@/Stores/GeneratorStore';
import { FilterStore } from '@/Stores/FilterStore';
import PageHeader from '@/Components/PageHeader.vue';
import Cards from '@/Components/Cards.vue';
import VueMultiselect from 'vue-multiselect';

export default defineComponent({
  name: 'Generator',

  components: {
    PageHeader,
    Cards,
    VueMultiselect,
  },

  data () {
    return {
      generatorStore: GeneratorStore(),
      filterStore: FilterStore(),
    };
  },

  methods: {
    getGenres () {
      if (this.generatorStore.choice === 0) {
        return this.filterStore.movieGenres;
      }

      return this.filterStore.serieGenres;
    },
  },

  mounted () {
    this.generatorStore.result = {};
  },
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
.select-width {
  min-width: 250px;
}
</style>
