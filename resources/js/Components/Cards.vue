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
          <strong>
            {{ item.release_date ? $t('cards.release_date') : $t('cards.first_air_date') }}:
          </strong>

          {{ item.release_date ? getDate(item.release_date) : getDate(item.first_air_date) }}
        </v-card-subtitle>

        <v-card-text>
          {{ getText(item) }}
        </v-card-text>

        <v-btn
          :href="getHref(item)"
          elevation="0"
          color="accent"
          class="ml-2 mr-2"
        >
          {{ $t('cards.more') }}
        </v-btn>

        <v-btn
          v-if="(favoriteStore.favorites?.includes(String(item.id)) || favoriteStore.favorites?.includes(item.id))
            && !route().current('generator')"
          class="ml-1"
          variant="text"
          icon="mdi-heart"
          color="secondary"
          @click="favoriteStore.deleteFavorite(user.id, item.id)"
        />

        <v-btn
          v-else-if="!route().current('generator')"
          class="ml-1"
          variant="text"
          icon="mdi-heart-outline"
          color="secondary"
          @click="createFavorite(item.id, item.video, item.known_for_department, item.first_air_date)"
        />

        <v-btn
          v-if="(watchedStore.watched?.includes(String(item.id)) || watchedStore.watched?.includes(item.id))
            && !route().current('generator')"
          class="ml-1"
          variant="text"
          icon="mdi-check-bold"
          color="accent"
          @click="watchedStore.deleteWatched(user.id, item.id)"
        />

        <v-btn
          v-else-if="!route().current('generator')"
          class="ml-1"
          variant="text"
          icon="mdi-check-outline"
          color="accent"
          @click="createWatched(item.id, item.video, item.known_for_department, item.first_air_date)"
        />
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useToast } from 'vue-toastification';
import { FavoriteStore } from '@/Stores/FavoriteStore';
import { WatchedStore } from '@/Stores/WatchedStore';

export default defineComponent({
  name: 'Cards',
  props: {
    results: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      msType: '',
      favoriteStore: FavoriteStore(),
      watchedStore: WatchedStore(),
    };
  },
  computed: {
    user () {
      return usePage().props.auth.user;
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
        return 'https://via.placeholder.com/1080x1580';
      }
    },
    getColor (average) {
      if (typeof average === 'number') {
        const newAverage = average.toFixed(1);
        if (newAverage >= 7.5) {
          return 'green';
        } else if (newAverage >= 5) {
          return 'orange';
        } else if (newAverage >= 0) {
          return 'red';
        }
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
    createFavorite (msId, video, known, air) {
      if (this.user) {
        this.favoriteStore.createFavorite(this.user.id, msId, video, known, air);
        return;
      }
      useToast().warning(this.$t('favorites.need_account'));
    },
    createWatched (msId, video, known, air) {
      if (this.user) {
        this.watchedStore.createWatched(this.user.id, msId, video, known, air);
        return;
      }
      useToast().warning(this.$t('watched.need_account'));
    },
  },
});
</script>

<style scoped>
.overview {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 100%;
  padding: 1rem;
  transform: translateY(101%);
  transition: transform 0.3s ease-in;
  overflow: auto;
}

.overview::-webkit-scrollbar {
  width: 10px;
}

.card:hover .overview {
  transform: translateY(0);
}

.v-avatar {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
}

.title {
  width: 240px;
}
</style>
