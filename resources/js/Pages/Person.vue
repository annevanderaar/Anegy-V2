<template>
  <PageHeader :title="title"/>

  <v-row>
    <ImageTile
      :title="data.title"
      :profile-path="data.profile_path"
    />

    <v-col :class="['pl-6', {'pt-0' : mobile}]" lg="8">
      <DetailsTitle :data="data"/>

      <v-col class="text-center mb-4">
        <h3>{{ data.known_for_department }}</h3>

        <p>{{ data.biography }}</p>
      </v-col>

      <v-row class="mb-2">
        <h4>{{ $t('person.birth') }}:</h4>

        <p class="ml-2">
          {{ getDate(data.birthday) }}
        </p>
      </v-row>

      <v-row v-if="data.deathday" class="mb-2">
        <h4>{{ $t('person.death') }}:</h4>

        <p class="ml-2">
          {{ getDate(data.deathday) }}
        </p>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('person.age') }}:</h4>

        <p class="ml-2">
          {{ getAge(data.birthday) }}
        </p>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('person.place_birth') }}:</h4>

        <p class="ml-2">
          {{ data.place_of_birth }}
        </p>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('person.gender') }}:</h4>

        <p v-if="data.gender == 1" class="ml-2">
          {{ $t('person.female') }}
        </p>

        <p v-if="data.gender == 2" class="ml-2">
          {{ $t('person.male') }}
        </p>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('cards.known_for') }}:</h4>

        <p class="ml-2">
          {{ data.known_for_department }}
        </p>
      </v-row>

      <Links/>
    </v-col>

    <v-col md="12">
      <v-tabs
        color="accent"
        stacked
        icons-and-text
        fixed-tabs
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

      <PersonCards
        v-if="selectedTab === 'movies'"
        :person-movies="detailStore.personMovies"
      />

      <PersonCards
        v-else-if="selectedTab === 'series'"
        :person-series="detailStore.personSeries"
      />

      <Images
        v-else-if="selectedTab === 'images'"
        :images="detailStore.images"
      />
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from 'vue';
import { usePage } from '@inertiajs/vue3';
import Links from '@/Components/Links.vue';
import PageHeader from '@/Components/PageHeader.vue';
import DetailsTitle from '@/Pages/Details/DetailsTitle.vue';
import ImageTile from '@/Pages/Details/ImageTile.vue';
import Images from '@/Pages/Details/Images.vue';
import PersonCards from '@/Pages/Details/PersonCards.vue';
import { DetailsStore } from '@/Stores/DetailsStore';
import { FavoriteStore } from '@/Stores/FavoriteStore';
import { LanguageStore } from '@/Stores/LanguageStore';
import { WatchedStore } from '@/Stores/WatchedStore';

export default defineComponent({
  name: 'Person',
  components: {
    ImageTile,
    PageHeader,
    DetailsTitle,
    Images,
    PersonCards,
    Links,
  },
  data () {
    return {
      id: this.$page.props.route_parameters.id,
      title: '',
      detailStore: DetailsStore(),
      languageStore: LanguageStore(),
      favoriteStore: FavoriteStore(),
      watchedStore: WatchedStore(),
      selectedTab: 'movies',
      tabs: [
        {
          title: 'movies',
          icon: 'mdi-movie-open',
          val: 'movies',
        },
        {
          title: 'series',
          icon: 'mdi-television-classic',
          val: 'series',
        },
        {
          title: 'images',
          icon: 'mdi-image-multiple',
          val: 'images',
        },
      ],
    };
  },
  computed: {
    data () {
      return this.detailStore.data;
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
    getDetails () {
      this.detailStore.getDetails(`/person/${this.id}`);
      this.detailStore.getLinks(`/person/${this.id}/external_ids`);
      this.detailStore.getPersonMovies(this.id);
      this.detailStore.getPersonSeries(this.id);
      this.detailStore.getImages(this.id);
      this.getFavorites();
      this.getWatched();
    },
    getDate (date) {
      return new Date(date).toLocaleDateString(this.languageStore.tmdb, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    getAge (dateString) {
      const today = new Date();
      const birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
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
        document.title = `${val.name} - Anegy`;
      }
    },
    translate () {
      this.getDetails();
    },
    refreshFav () {
      this.getFavorites();
    },
    refreshWat () {
      this.getWatched();
    },
  },
  mounted () {
    this.getDetails();
  },
});
</script>
