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

          {{ item.release_date ? generalStore.getDate(item.release_date) : generalStore.getDate(item.first_air_date) }}
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
          v-if="isInList('favorites', item.id)
            && !route().current('generator')"
          class="ml-1"
          variant="text"
          icon="mdi-heart"
          color="secondary"
          @click="listStore.delete('favorites', user.id, item.id)"
        />

        <v-btn
          v-else-if="!route().current('generator')"
          class="ml-1"
          variant="text"
          icon="mdi-heart-outline"
          color="secondary"
          @click="createListItem('favorites', item)"
        />

        <v-btn
          v-if="isInList('watched', item.id)
            && !route().current('generator') && item.media_type !== 'person'"
          class="ml-1"
          variant="text"
          icon="mdi-check-bold"
          color="accent"
          @click="listStore.delete('watched', user.id, item.id)"
        />

        <v-btn
          v-else-if="!route().current('generator') && item.media_type !== 'person'"
          class="ml-1"
          variant="text"
          icon="mdi-check-outline"
          color="accent"
          @click="createListItem('watched', item)"
        />
      </v-card>
    </v-card>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useToast } from 'vue-toastification';
import { ListStore } from '@/Stores/ListStore';
import { GeneralStore } from '@/Stores/GeneralStore';

defineProps({
  results: {
    type: Object,
    required: true,
  },
});

const instance = getCurrentInstance();
const toast = useToast();

const generalStore = GeneralStore();
const listStore = ListStore();

const user = computed(() => {
  return usePage().props.auth.user;
});

const t = key => {
  return instance.proxy.$t(key);
};

const getUrl = item => {
  const posterPath = 'https://image.tmdb.org/t/p/w500';

  if (item.profile_path) {
    return posterPath + item.profile_path;
  }

  if (item.poster_path) {
    return posterPath + item.poster_path;
  }

  return 'https://via.placeholder.com/1080x1580';
};

const getColor = average => {
  if (typeof average === 'number') {
    const newAverage = average.toFixed(1);

    if (newAverage >= 7.5) {
      return 'green';
    }

    if (newAverage >= 5) {
      return 'orange';
    }

    if (newAverage >= 0) {
      return 'red';
    }
  }

  return 'accent';
};

const getHref = item => {
  if (item.media_type === 'movie' || item.video === false) {
    return `/movies/details/${item.id}`;
  }

  if (item.media_type === 'person' || item.known_for_department) {
    return `/people/${item.id}`;
  }

  if (item.media_type === 'tv' || item.name) {
    return `/series/details/${item.id}`;
  }

  return '';
};

const getText = item => {
  if (item.media_type === 'person' || item.known_for_department) {
    return `${t('cards.known_for')}: ${item.known_for_department}`;
  }

  if (item.overview) {
    return item.overview;
  }

  return '';
};

const isInList = (kind, id) => {
  const ids = listStore[kind].ids;

  return ids?.includes(String(id)) || ids?.includes(id);
};

const createListItem = (kind, item) => {
  if (user.value) {
    listStore.create(
      kind,
      user.value.id,
      item.id,
      item.video,
      item.known_for_department,
      item.first_air_date,
    );

    return;
  }

  const messageKey = kind === 'favorites'
    ? 'favorites.need_account'
    : 'watched.need_account';

  toast.warning(t(messageKey));
};
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
