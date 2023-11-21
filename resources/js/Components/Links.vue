<template>
  <v-row class="flex-align">
    <h4>{{ $t('details.links') }}:</h4>
    <v-chip
      v-if="detailStore.data.homepage"
      :href="`${detailStore.data.homepage}`"
      class="btnText"
      target="_blank"
      variant="outlined"
    >
      <v-icon>mdi-home-circle</v-icon>
    </v-chip>
    <v-chip
      v-if="detailStore.links.imdb_id"
      :href="`https://www.imdb.com/title/${detailStore.links.imdb_id}`"
      class="btnText"
      target="_blank"
      variant="outlined"
    >
      <v-icon>mdi-database</v-icon>
    </v-chip>
    <v-chip
      v-if="detailStore.links.twitter_id"
      :href="`https://twitter.com/${detailStore.links.twitter_id}`"
      class="btnText"
      target="_blank"
      variant="outlined"
    >
      <v-icon>mdi-twitter</v-icon>
    </v-chip>
    <v-chip
      v-if="detailStore.links.facebook_id"
      :href="`https://www.facebook.com/${detailStore.links.facebook_id}`"
      class="btnText"
      target="_blank"
      variant="outlined"
    >
      <v-icon>mdi-facebook</v-icon>
    </v-chip>
    <v-chip
      v-if="detailStore.links.instagram_id"
      :href="`https://www.instagram.com/${detailStore.links.instagram_id}`"
      class="btnText"
      target="_blank"
      variant="outlined"
    >
      <v-icon>mdi-instagram</v-icon>
    </v-chip>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DetailsStore } from '../Stores/DetailsStore';

export default defineComponent({
  components: {},

  data () {
    return {
      detailStore: DetailsStore(),
    };
  },
});
</script>

<style scoped>
@import "../../css/app.css";
</style>
