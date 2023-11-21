<template>
  <div>
    <v-btn-toggle
      v-model="value"
      color="accent"
      variant="text"
      mandatory
    >
      <v-btn>{{ $t('details.cast.title') }}</v-btn>
      <v-btn>{{ $t('details.crew') }}</v-btn>
    </v-btn-toggle>

    <Cards
      v-if="selectedValue === 'cast'"
      :results="personMovies ? personMovies.cast : personSeries.cast"
    />

    <Cards
      v-else-if="selectedValue === 'crew'"
      :results="personMovies ? personMovies.crew : personSeries.crew"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cards from '../../Components/Cards.vue';

export default defineComponent({
  components: {
    Cards,
  },

  props: {
    personMovies: {
      type: Object,
      required: false,
      default: () => {},
    },

    personSeries: {
      type: Object,
      required: false,
      default: () => {},
    },
  },

  data () {
    return {
      selectedValue: 'cast',
      value: 0,
    };
  },

  watch: {
    value (val) {
      if (val === 0) {
        this.selectedValue = 'cast';
      }
      if (val === 1) {
        this.selectedValue = 'crew';
      }
    },
  },
});
</script>
