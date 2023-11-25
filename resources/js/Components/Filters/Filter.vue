<template>
  <section>
    <v-navigation-drawer
      v-model="filterStore.drawer"
      :temporary="true"
      style="width: 300px"
    >
      <v-container>
        <v-row>
          <v-col>
            <h1 class="ml-2">
              {{ $t('filters.title') }}
            </h1>
          </v-col>

          <v-btn
            icon="mdi-close"
            variant="plain"
            class="text-black"
            @click="filterStore.drawer = false"
          />
        </v-row>

        <v-divider/>

        <!-- Filter -->
        <v-list>
          <v-list-item
            v-for="(item, i) in items()"
            :key="i"
            :href="route(item.route)"
            :class="{ 'highlight-page' : route().current(item.route) }"
            color="accent"
            class="mt-2"
            @click="resetPage"
          >
            <v-icon
              :icon="item.icon"
              class="mr-3"
              color="accent"
            />
            {{ item.text }}
          </v-list-item>
        </v-list>

        <!-- Genres-->
        <v-list v-if="route().current('series.discover') || route().current('movies.discover')">
          <div class="d-flex justify-space-between align-content-center">
            <h1 class="ml-2 mt-2">
              {{ $t('filters.genres') }}
            </h1>

            <div v-if="filterStore.selectedGenres.length > 0">
              <v-tooltip :text="$t('filters.clear')" location="left">
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon="mdi-text-box-remove"
                    variant="text"
                    @click="clearAllFilters"
                  />
                </template>
              </v-tooltip>
            </div>
          </div>
          <v-divider/>

          <v-list-item
            v-for="genre in genres"
            :key="genre.id"
            :class="{ 'highlight-genre' : includes(genre.id) }"
            @click="addGenre(genre.id)"
          >
            {{ genre.name }}
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { FilterStore } from '@/Stores/FilterStore';
import route from 'ziggy-js';

export default defineComponent({
  name: 'Filter',

  data () {
    return {
      filterStore: FilterStore(),
    };
  },

  computed: {
    genres () {
      if (route().current('series.*')) {
        return this.filterStore.serieGenres;
      } else {
        return this.filterStore.movieGenres;
      }
    },
  },

  methods: {
    route,

    includes (id) {
      return this.filterStore.selectedGenres.includes(id);
    },

    addGenre (id) {
      if (this.includes(id)) {
        const index = this.filterStore.selectedGenres.indexOf(id);
        this.filterStore.selectedGenres.splice(index, 1);
        this.filterStore.drawer = false;
        this.filterStore.select = !this.filterStore.select;
        return;
      }
      this.filterStore.selectedGenres.push(id);
      this.filterStore.drawer = false;
      this.filterStore.select = !this.filterStore.select;
    },

    clearAllFilters () {
      this.filterStore.selectedGenres.splice(0);
      this.filterStore.drawer = false;
      this.filterStore.select = !this.filterStore.select;
    },

    items () {
      let name;

      if (route().current('series.*')) {
        name = 'series';
      } else {
        name = 'movies';
      }

      return [
        { text: this.$t('discover'), icon: 'mdi-shuffle-variant', route: `${name}.discover` },
        { text: this.$t('trending'), icon: 'mdi-fire', route: `${name}.trending` },
        { text: this.$t('popular'), icon: 'mdi-chart-box', route: `${name}.popular` },
        { text: this.$t('playing'), icon: 'mdi-play-circle-outline', route: `${name}.playing` },
        { text: this.$t('top_rated'), icon: 'mdi-star', route: `${name}.top-rated` },
        { text: this.$t('upcoming'), icon: 'mdi-calendar-month', route: `${name}.upcoming` },
      ];
    },

    resetPage () {
      localStorage.currentPage = 1;
    },
  },
});
</script>

<style scoped>
.highlight-genre {
  background-color: #23a9a7;
  color: white;
}

.highlight-page {
  background-color: #E4F4F4;
  color: #23a9a7;
}
</style>
