<template>
  <PageHeader :title="$t('auth.dashboard.title')"/>

  <AuthenticatedLayout>
    <h1 class="text-center">
      {{ $t('auth.dashboard.welcome', {name: user.firstname}) }}
    </h1>

    <div class="text-center d-flex flex-row justify-center ga-4 flex-wrap">
      <div>
        <h2 class="mt-2">
          {{ $t('auth.dashboard.your_information') }}
        </h2>

        <v-card
          width="400"
          height="320"
          class="mt-4"
          elevation="0"
          color="primary"
        >
          <v-card-text>
            <v-avatar
              class="mb-4"
              color="secondary"
              size="x-large"
            >
              <span class="text-h5">
                {{ user.firstname.substring(0, 1) + user.lastname.substring(0, 1).toUpperCase() }}
              </span>
            </v-avatar>
            <h3 class="mt-2">
              {{ $t('auth.login.name') }}:
              <span class="font-weight-regular">
                {{ user.firstname }}  {{ user.lastname }}
              </span>
            </h3>
            <h3 class="mt-2">
              {{ $t('auth.login.email') }}:
              <span class="font-weight-regular">
                {{ user.email }}
              </span>
            </h3>
            <h3 class="mt-2">
              {{ $t('auth.dashboard.created') }}:
              <span class="font-weight-regular">
                {{ new Date(user.created_at).toLocaleDateString('nl') }}
              </span>
            </h3>
          </v-card-text>

          <v-card-actions class="d-flex flex-column">
            <SecondaryButton :href="route('favorites')">
              {{ $t('auth.dashboard.favorites') }}
            </SecondaryButton>

            <PrimaryButton :href="route('profile.edit')">
              {{ $t('auth.dashboard.edit_profile') }}
            </PrimaryButton>

            <ResponsiveNavLink
              :href="route('logout')"
              method="post"
              as="button"
              class="text-uppercase"
            >
              {{ $t('auth.logout.title') }}
            </ResponsiveNavLink>
          </v-card-actions>
        </v-card>
      </div>

      <div>
        <h2 class="mt-2">
          {{ $t('favorites.latest') }}
        </h2>

        <p v-if="favoriteStore.data.length < 1">
          {{ $t('favorites.not_added') }}
        </p>

        <Cards v-else :results="favoriteStore.data"/>
      </div>

      <div>
        <h2 class="mt-2">
          {{ $t('watched.latest') }}
        </h2>

        <p v-if="watchedStore.data.length < 1">
          {{ $t('watched.not_added') }}
        </p>

        <Cards v-else :results="watchedStore.data"/>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import { defineComponent } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { FavoriteStore } from '@/Stores/FavoriteStore';
import { LanguageStore } from '@/Stores/LanguageStore';
import { WatchedStore } from '@/Stores/WatchedStore';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import PrimaryButton from '@/Components/Breeze/PrimaryButton.vue';
import ResponsiveNavLink from '@/Components/Breeze/ResponsiveNavLink.vue';
import Cards from '@/Components/Cards.vue';
import SecondaryButton from '@/Components/Breeze/SecondaryButton.vue';
import PageHeader from '@/Components/PageHeader.vue';
import route from 'ziggy-js';

export default defineComponent({
  name: 'Dashboard',

  components: {
    PageHeader,
    SecondaryButton,
    Cards,
    AuthenticatedLayout,
    PrimaryButton,
    ResponsiveNavLink,
  },

  data () {
    return {
      favoriteStore: FavoriteStore(),
      languageStore: LanguageStore(),
      watchedStore: WatchedStore(),
    };
  },

  computed: {
    user () {
      return usePage().props.auth.user;
    },

    translate () {
      return this.languageStore.translate;
    },
  },

  methods: {
    route,
  },

  watch: {
    translate () {
      this.favoriteStore.getLatestFavorite(this.user.id);
      this.watchedStore.getLatestWatched(this.user.id);
    },
  },

  mounted () {
    this.favoriteStore.getLatestFavorite(this.user.id);
    this.watchedStore.getLatestWatched(this.user.id);
  },
});
</script>
