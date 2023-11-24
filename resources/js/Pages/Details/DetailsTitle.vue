<template>
  <v-row justify="space-between" class="mt-2">
    <div>
      <v-btn
        :disabled="true"
        variant="plain"
      />
    </div>

    <h1>{{ data.name ? data.name : data.title }}</h1>

    <div>
      <v-btn
        v-if="favoriteStore.favorites.includes(data.id)"
        class="ml-1"
        variant="text"
        icon="mdi-heart"
        color="secondary"
        size="x-large"
        @click="favoriteStore.deleteFavorite(user.id, data.id)"
      />

      <v-btn
        v-else
        class="ml-1"
        variant="text"
        icon="mdi-heart-outline"
        color="secondary"
        size="x-large"
        @click="createFavorite(data.id, data.video, data.known_for_department, data.first_air_date)"
      />
    </div>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FavoriteStore } from '../../Stores/FavoriteStore';
import { usePage } from '@inertiajs/vue3';
import { useToast } from 'vue-toastification';

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      favoriteStore: FavoriteStore(),
    };
  },

  computed: {
    user () {
      return usePage().props.auth.user;
    },
  },

  methods: {
    createFavorite (msId, video, known, air) {
      if (this.user) {
        this.favoriteStore.createFavorite(this.user.id, msId, video, known, air);
        return;
      }
      useToast().warning(this.$t('favorites.need_account'));
    },
  },
});
</script>
