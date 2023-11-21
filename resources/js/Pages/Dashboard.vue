<template>
  <Head :title="$t('auth.dashboard.title')">
    <title>{{ $t('auth.dashboard.title') }}</title>
  </Head>

  <AuthenticatedLayout>
    <div class="text-center d-flex flex-column">
      <h1>{{ $t('auth.dashboard.welcome', {name: user.firstname}) }}</h1>

      <v-card width="400" class="align-self-center mt-2">
        <v-card-title>
          <h2>{{ $t('auth.dashboard.your_information') }}</h2>
        </v-card-title>

        <v-card-text>
          <h3 class="mb-2">
            {{ $t('auth.login.name') }}: {{ user.firstname }}  {{ user.lastname }}
          </h3>
          <h3>{{ $t('auth.login.email') }}: {{ user.email }}</h3>
        </v-card-text>

        <v-card-actions class="d-flex flex-column">
          <PrimaryButton :href="route('profile.edit')">
            {{ $t('auth.dashboard.edit_profile') }}
          </PrimaryButton>

          <ResponsiveNavLink
            :href="route('logout')"
            method="post"
            as="button"
          >
            {{ $t('auth.logout.title') }}
          </ResponsiveNavLink>
        </v-card-actions>
      </v-card>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import { defineComponent } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/Breeze/PrimaryButton.vue';
import ResponsiveNavLink from '@/Components/Breeze/ResponsiveNavLink.vue';
import route from 'ziggy-js';

export default defineComponent({
  name: 'Dashboard',

  components: {
    AuthenticatedLayout,
    Head,
    PrimaryButton,
    ResponsiveNavLink,
  },

  computed: {
    user () {
      return usePage().props.auth.user;
    },
  },

  methods: {
    route,
  },
});
</script>
