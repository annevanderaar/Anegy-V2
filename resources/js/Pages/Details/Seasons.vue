<template>
  <div class="d-flex justify-center flex-wrap">
    <div class="d-flex flex-wrap">
      <v-card
        v-for="season in seasons"
        :key="season.id"
        width="300px"
        class="cards"
        @click="showEpisodes(season.season_number)"
      >
        <v-img :src="`https://image.tmdb.org/t/p/w500${season.poster_path}`"/>
        <v-card-title class="text-center">
          Season {{ season.season_number }}
        </v-card-title>
        <v-card-text class="text-center">
          {{ season.episode_count }}
          {{ season.episode_count > 1 ? "Episodes" : "Episode" }}
          <br>
          {{
            new Date(season.air_date).toLocaleDateString("nl-NL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </v-card-text>
      </v-card>
    </div>

    <div v-if="detailStore.episodes.length > 0">
      <v-card
        v-for="episode in detailStore.episodes"
        :key="episode.id"
        width="1000px"
        class="cards"
      >
        <v-card-title>
          {{ $t('details.seasons.episode') }}{{ episode.episode_number }} {{ episode.name }}
        </v-card-title>
        <v-card-text>{{ episode.overview }}</v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DetailsStore } from '../../Stores/DetailsStore';

export default defineComponent({
  props: {
    seasons: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      detailStore: DetailsStore(),
    };
  },

  methods: {
    showEpisodes (season: number) {
      this.detailStore.getSeasonDetails(`/tv/${this.$page.props.route_parameters.id}/season/${season}`);
      window.scrollTo(0, document.body.scrollHeight);
    },
  },
});
</script>
