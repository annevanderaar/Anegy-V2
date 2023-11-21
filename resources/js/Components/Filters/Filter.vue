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
            :href="item.route"
            color="accent"
            class="mt-2"
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
        <v-list>
          <div class="d-flex justify-space-between align-content-center">
            <h1 class="ml-2 mt-2">
              {{ $t('filters.genres') }}
            </h1>

            <div v-if="filterStore.selectedGenres.length > 0">
              <v-tooltip :text="$t('filters.clear')" location="left">
                <template #activator="{ props }">
                  <IconButton
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
            :class="{ highlight : includes(genre.id) }"
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
import IconButton from '@/Components/IconButton.vue';

export default defineComponent({
  name: 'Filter',

  components: {
    IconButton,
  },

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
        { text: this.$t('discover'), icon: 'mdi-shuffle-variant', route: route(`${name}.discover`) },
        { text: this.$t('trending'), icon: 'mdi-fire', route: route(`${name}.trending`) },
        { text: this.$t('popular'), icon: 'mdi-chart-box', route: route(`${name}.popular`) },
        { text: this.$t('playing'), icon: 'mdi-play-circle-outline', route: route(`${name}.playing`) },
        { text: this.$t('top_rated'), icon: 'mdi-star', route: route(`${name}.top-rated`) },
        { text: this.$t('upcoming'), icon: 'mdi-calendar-month', route: route(`${name}.upcoming`) },
      ];
    },
  },
});
</script>

<style scoped>
.highlight {
  background-color: #23a9a7;
}
</style>
