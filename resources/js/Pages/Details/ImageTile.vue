<template>
  <v-col class="d-flex justify-center" lg="4">
    <a
      :href="getUrl(posterPath ? posterPath : profilePath)"
      target="_blank"
    >
      <v-img
        :src="getUrl(posterPath ? posterPath : profilePath)"
        :alt="title"
        :width="mobile ? 370 : 450"
        :height="mobile ? 500 : 700"
      />
    </a>
  </v-col>
</template>

<script setup>
import { useDisplay } from 'vuetify';

defineProps({
  title: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
    required: false,
    default: null,
  },
  profilePath: {
    type: String,
    required: false,
    default: null,
  },
});

const { mobile } = useDisplay();

const getUrl = path => {
  if (!path) {
    return 'http://via.placeholder.com/1080x1580';
  }
  return `https://image.tmdb.org/t/p/w500${path}`;
};
</script>
