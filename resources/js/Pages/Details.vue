<template>
  <PageHeader :title="title"/>

  <v-row>
    <ImageTile :title="data.title" :poster-path="data.poster_path"/>

    <v-col :class="['pl-6', {'pt-0' : mobile}]" lg="8">
      <DetailsTitle :data="data"/>

      <v-col class="text-center mb-6">
        <h3>{{ data.tagline }}</h3>

        <p>{{ data.overview }}</p>
      </v-col>

      <v-row v-if="current" class="mb-2">
        <h4>{{ $t('cards.release_date') }}: </h4>

        <p class="ml-2">
          {{ getDate(data.release_date) }}
          ({{ data.status }})
        </p>
      </v-row>

      <v-row v-else class="mb-2">
        <h4>{{ $t('cards.first_air_date') }}:</h4>

        <p class="ml-2">
          {{ getDate(data.first_air_date) }}
          ({{ data.status }})
        </p>
      </v-row>

      <v-row v-if="data.last_air_date" class="mb-2">
        <h4>{{ $t('cards.last_air_date') }}:</h4>

        <p class="ml-2">
          {{ getDate(data.last_air_date) }}
        </p>
      </v-row>

      <v-row class="flex-align">
        <h4>{{ $t('details.language') }}:</h4>

        <v-chip
          class="ml-2"
        >
          <span class="text-uppercase">
            {{ data.original_language }}
          </span>
        </v-chip>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('details.runtime') }}:</h4>

        <p class="ml-2">
          {{ data.runtime ? data.runtime : String(data.episode_run_time) }} min
        </p>
      </v-row>

      <v-row class="flex-align">
        <h4>{{ $t('details.score') }}:</h4>

        <v-avatar
          :color="getColor(data.vote_average)"
          rounded="0"
          class="ma-2 text-white rounded"
        >
          {{ data.vote_average >= 0 ? data.vote_average.toFixed(1) : 'P' }}
        </v-avatar>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('details.budget') }}:</h4>

        <p class="ml-2">
          ${{ localString(data.budget) }}
        </p>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('details.revenue') }}:</h4>

        <p class="ml-2">
          ${{ localString(data.revenue) }}
        </p>
      </v-row>

      <v-row class="flex-align">
        <h4>{{ $t('filters.genres') }}:</h4>

        <v-chip
          v-for="item in data.genres"
          :key="item.id"
          class="btnText"
          variant="outlined"
        >
          {{ item.name }}
        </v-chip>
      </v-row>

      <Links/>

      <v-row class="flex-align">
        <h4>{{ $t('details.production_companies') }}:</h4>

        <v-chip
          v-for="company in data.production_companies"
          :key="company.id"
          class="btnText"
          variant="outlined"
        >
          {{ company.name }}
        </v-chip>
      </v-row>

      <v-row class="flex-align">
        <h4>{{ $t('details.production_countries') }}:</h4>

        <v-chip
          v-for="country in data.production_countries"
          :key="country.iso_3166_1"
          class="btnText"
          variant="outlined"
        >
          {{ country.iso_3166_1 }}
          | {{ country.name }}
        </v-chip>
      </v-row>

      <v-row v-if="detailStore.providers" class="flex-align">
        <h4>{{ $t('details.watch_nl') }}:</h4>

        <v-chip
          v-for="item in detailStore.providers.flatrate"
          :key="item.provider_id"
          class="btnText"
          variant="outlined"
        >
          {{ item.provider_name }}
        </v-chip>

        <v-chip
          v-for="item in detailStore.providers.buy"
          :key="item.provider_id"
          class="btnText"
          variant="outlined"
        >
          {{ item.provider_name }}
        </v-chip>

        <v-chip
          v-for="item in detailStore.providers.rent"
          :key="item.provider_id"
          class="btnText"
          variant="outlined"
        >
          {{ item.provider_name }}
        </v-chip>

        <v-chip
          v-for="item in this.iLinks"
          :key="item.name"
          :href="item.to"
          class="btnText"
          target="_blank"
          variant="outlined"
        >
          {{ item.name }}
        </v-chip>
      </v-row>

      <v-row v-else class="flex-align">
        <h4>{{ $t('details.watch_nl') }}:</h4>

        <v-chip
          v-for="item in this.iLinks"
          :key="item.name"
          :href="item.to"
          class="btnText"
          target="_blank"
          variant="outlined"
        >
          {{ item.name }}
        </v-chip>
      </v-row>
    </v-col>

    <v-col sm="12">
      <v-tabs
        color="accent"
        stacked
        icons-and-text
        fixed-tabs
        show-arrows
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.title"
          @click="show(tab.val)"
        >
          <v-icon>{{ tab.icon }}</v-icon>

          {{ $t(tab.title) }}
        </v-tab>
      </v-tabs>

      <Cast
        v-if="selectedTab === 'cast'"
        :credits="detailStore.credits"
      />

      <Crew
        v-else-if="selectedTab === 'crew'"
        :credits="detailStore.credits"
      />

      <Collection
        v-else-if="selectedTab === 'collection'"
        :collection="detailStore.collection"
      />

      <Seasons
        v-else-if="selectedTab === 'seasons'"
        :seasons="detailStore.seasons"
      />

      <Videos
        v-else-if="selectedTab === 'videos'"
        :videos="detailStore.videos"
      />

      <Reviews
        v-else-if="selectedTab === 'reviews'"
        :reviews="detailStore.reviews"
      />

      <Similar
        v-else-if="selectedTab === 'similar'"
        :similar="detailStore.similar"
      />
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { DetailsStore } from '@/Stores/DetailsStore';
import { LanguageStore } from '@/Stores/LanguageStore';
import { FavoriteStore } from '@/Stores/FavoriteStore';
import { WatchedStore } from '@/Stores/WatchedStore';
import Cast from '@/Pages/Details/Cast.vue';
import Crew from '@/Pages/Details/Crew.vue';
import Collection from '@/Pages/Details/Collection.vue';
import Seasons from '@/Pages/Details/Seasons.vue';
import Videos from '@/Pages/Details/Videos.vue';
import Reviews from '@/Pages/Details/Reviews.vue';
import Similar from '@/Pages/Details/Similar.vue';
import Links from '@/Components/Links.vue';
import DetailsTitle from '@/Pages/Details/DetailsTitle.vue';
import PageHeader from '@/Components/PageHeader.vue';
import ImageTile from '@/Pages/Details/ImageTile.vue';
import route from 'ziggy-js';

export default defineComponent({
  name: 'Details',
  components: {
    ImageTile,
    PageHeader,
    DetailsTitle,
    Links,
    Similar,
    Reviews,
    Videos,
    Cast,
    Crew,
    Collection,
    Seasons,
  },
  data () {
    return {
      id: this.$page.props.route_parameters.id,
      title: '',
      detailStore: DetailsStore(),
      languageStore: LanguageStore(),
      favoriteStore: FavoriteStore(),
      watchedStore: WatchedStore(),
      selectedTab: 'cast',
      tabs: [
        {
          title: 'details.cast.title',
          icon: 'mdi-account-box-multiple',
          val: 'cast',
        },
        {
          title: 'details.crew',
          icon: 'mdi-account-group',
          val: 'crew',
        },
        {
          title: 'details.seasons.title',
          icon: 'mdi-cards-variant',
          val: 'seasons',
        },
        {
          title: 'details.collection.title',
          icon: 'mdi-bookmark-box-multiple',
          val: 'collection',
        },
        {
          title: 'details.videos.title',
          icon: 'mdi-filmstrip-box-multiple',
          val: 'videos',
        },
        {
          title: 'details.reviews.title',
          icon: 'mdi-message-text',
          val: 'reviews',
        },
        {
          title: 'details.similar',
          icon: 'mdi-approximately-equal-box',
          val: 'similar',
        },
      ],
      iLinks: [
        {
          name: '123Movies',
          to: 'https://0123movie.com.mx/',
        },
        {
          name: 'Watch Series',
          to: 'https://ww.watchseriesfree.co/',
        },
        {
          name: 'Putlockers',
          to: 'https://www.putlockers.tv/',
        },
      ],
    };
  },
  computed: {
    data () {
      return this.detailStore.data;
    },
    current () {
      return route().current('movies.*');
    },
    translate () {
      return this.languageStore.translate;
    },
    user () {
      return usePage().props.auth.user;
    },
    refreshFav () {
      return this.favoriteStore.refresh;
    },
    refreshWat () {
      return this.watchedStore.refresh;
    },
    mobile () {
      return this.$vuetify.display.mobile;
    },
  },
  methods: {
    getDetails (val) {
      this.detailStore.getDetails(`/${val}/${this.id}`);
      this.detailStore.getLinks(`/${val}/${this.id}/external_ids`);
      this.detailStore.getProviders(`/${val}/${this.id}/watch/providers`);
      this.detailStore.getCredits(`/${val}/${this.id}/credits`);
      this.detailStore.getVideos(`/${val}/${this.id}/videos`);
      this.detailStore.getReviews(`/${val}/${this.id}/reviews`);
      this.detailStore.getSimilar(`/${val}/${this.id}/similar`);
      this.getFavorites();
      this.getWatched();
    },
    getTabs () {
      if (this.current) {
        this.tabs.splice(2, 1);
        return;
      }
      this.tabs.splice(3, 1);
    },
    getDate (date) {
      return new Date(date).toLocaleDateString(this.languageStore.tmdb, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    getYear (date) {
      return new Date(date).toLocaleDateString(this.languageStore.tmdb, {
        year: 'numeric',
      });
    },
    getColor (average) {
      if (average >= 7.5) {
        return 'green';
      } else if (average >= 5) {
        return 'orange';
      } else {
        return 'red';
      }
    },
    localString (price) {
      if (price) {
        return parseInt(price).toLocaleString();
      }
      return '-';
    },
    show (value) {
      this.selectedTab = value;
    },
    getFavorites () {
      if (this.user) {
        this.favoriteStore.getFavorites(this.user.id);
      }
    },
    getWatched () {
      if (this.user) {
        this.watchedStore.getWatched(this.user.id);
      }
    },
  },
  watch: {
    data (val) {
      if (val) {
        if (this.current) {
          document.title = `${val.title} ${this.getYear(val.release_date)} - Anegy`;
        } else {
          document.title = `${val.name} ${this.getYear(val.first_air_date)} - Anegy`;
        }
      }
    },
    translate () {
      this.getDetails(this.current ? 'movie' : 'tv');
    },
    refreshFav () {
      this.getFavorites();
    },
    refreshWat () {
      this.getWatched();
    },
  },
  mounted () {
    this.getTabs();
    this.getDetails(this.current ? 'movie' : 'tv');
  },
});
</script>
