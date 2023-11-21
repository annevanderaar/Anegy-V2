<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      v-for="item in results"
      :key="item.id"
      class="card ma-4"
      elevation="4"
      width="300"
    >
      <v-img :src="getUrl(item)"/>

      <div class="d-flex justify-space-between">
        <v-card-title class="text-wrap title">
          {{ item.title ? item.title : item.name }}
        </v-card-title>

        <v-avatar
          :color="getColor(item.vote_average)"
          class="ma-2 text-white"
        >
          {{ item.vote_average >= 0 ? item.vote_average.toFixed(1) : 'P' }}
        </v-avatar>
      </div>

      <v-card class="overview">
        <v-card-subtitle v-if="item.release_date || item.first_air_date" class="text-wrap">
          <strong>{{ item.release_date ? $t('cards.release_date') : $t('cards.first_air_date') }}:</strong>

          {{ item.release_date ? getDate(item.release_date) : getDate(item.first_air_date) }}
        </v-card-subtitle>

        <v-card-text>
          {{ getText(item) }}
        </v-card-text>

        <v-btn
          :href="getHref(item)"
          elevation="0"
          color="accent"
          class="ml-2"
        >
          {{ $t('cards.more') }}
        </v-btn>

        <!--        <IconButton variant="plain" icon="mdi-heart"/>-->
        <!--        <IconButton-->
        <!--          class="ml-2"-->
        <!--          variant="plain"-->
        <!--          icon="mdi-heart-outline"-->
        <!--        />-->
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// import IconButton from '@/Components/IconButton.vue';

export default defineComponent({
  name: 'Cards',

  components: {
    // IconButton,
  },

  props: {
    results: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getUrl (item) {
      const posterPath = 'https://image.tmdb.org/t/p/w500';
      if (item.profile_path) {
        return posterPath + item.profile_path;
      } else if (item.poster_path) {
        return posterPath + item.poster_path;
      } else {
        return 'http://via.placeholder.com/1080x1580';
      }
    },

    getColor (average) {
      if (average >= 7.5) {
        return 'green';
      } else if (average >= 5) {
        return 'orange';
      } else if (average >= 0) {
        return 'red';
      } else {
        return 'accent';
      }
    },

    getDate (date) {
      return new Date(date).toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },

    getHref (item) {
      if (item.media_type === 'movie' || item.video === false) {
        return `/movies/details/${item.id}`;
      } else if (item.media_type === 'person' || item.known_for_department) {
        return `/people/${item.id}`;
      } else if (item.media_type === 'tv' || item.name) {
        return `/series/details/${item.id}`;
      }
    },

    getText (item) {
      if (item.media_type === 'person' || item.known_for_department) {
        return this.$t('cards.known_for') + ': ' + item.known_for_department;
      } else if (item.overview) {
        return item.overview;
      }
    },
  },
});
</script>

<style scoped>
@import "../../css/cards.css";
</style>
