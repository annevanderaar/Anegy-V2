<template>
  <Head :title="title">
    <title>{{ title }}</title>
  </Head>

  <v-row>
    <v-col class="d-flex justify-center" md="4">
      <v-card
        :href="`https://image.tmdb.org/t/p/w500${data.profile_path}`"
        width="450px"
        height="700px"
        class="ma-10"
        target="_blank"
      >
        <v-img
          :src="`https://image.tmdb.org/t/p/w500${data.profile_path}`"
          :alt="`${data.title}`"
          width="450px"
          height="700px"
        />
        <v-img
          v-if="data.profile_path == null"
          :alt="`${data.title}`"
          width="450px"
          height="700px"
          src="http://via.placeholder.com/1080x1580"
        />
      </v-card>
    </v-col>

    <v-col md="8">
      <v-col class="text-center mb-4">
        <h1>{{ data.name }}</h1>
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
          {{ this.getAge(data.birthday) }}
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
        :stacked="true"
        color="accent"
        icons-and-text
        fixed-tabs
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.title"
          @click="show(tab.val)"
        >
          <v-icon>{{ tab.icon }}</v-icon>{{ tab.title }}
        </v-tab>
      </v-tabs>

      <PersonCards v-if="selectedTab === 'movies'" :person-movies="detailStore.personMovies"/>
      <PersonCards v-else-if="selectedTab === 'series'" :person-series="detailStore.personSeries"/>
      <Images v-else-if="selectedTab === 'images'" :images="detailStore.images"/>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DetailsStore } from '../Stores/DetailsStore';
import { LanguageStore } from '../Stores/LanguageStore';
import Links from '../Components/Links.vue';
import PersonCards from '../Pages/Details/PersonCards.vue';
import Images from '../Pages/Details/Images.vue';

export default defineComponent({
  components: {
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
      selectedTab: 'movies',
      tabs: [
        {
          title: 'Movies',
          icon: 'mdi-movie-open',
          val: 'movies',
        },
        {
          title: 'Series',
          icon: 'mdi-television-classic',
          val: 'series',
        },
        {
          title: 'Images',
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
  },

  methods: {
    getDetails () {
      this.detailStore.getDetails(`/person/${this.id}`);
      this.detailStore.getLinks(`/person/${this.id}/external_ids`);
      this.detailStore.getPersonMovies(this.id);
      this.detailStore.getPersonSeries(this.id);
      this.detailStore.getImages(this.id);
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
  },

  mounted () {
    this.getDetails();
  },
});
</script>
