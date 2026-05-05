<template>
  <Head :title="$t('auth.profile.title')">
    <title>{{ $t('auth.profile.title') }}</title>
  </Head>

  <main class="d-flex justify-center flex-column">
    <div class="d-flex flex-row justify-center flex-wrap gap-2">
      <v-card
        class="rounded-xl pa-4 width-card ma-4"
        elevation="0"
        color="primary"
      >
        <UpdateProfileInformationForm
          :must-verify-email="mustVerifyEmail"
          :status="status"
          class="width-inputs"
        />
      </v-card>

      <v-card
        class="rounded-xl pa-4 width-card ma-4"
        elevation="0"
        color="primary"
      >
        <UpdatePasswordForm class="width-inputs"/>
      </v-card>

      <v-card
        class="rounded-xl pa-4 width-card ma-4"
        elevation="0"
        color="primary"
      >
        <DeleteUserForm class="width-inputs"/>
      </v-card>
    </div>
  </main>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';

defineProps({
  mustVerifyEmail: {
    type: Boolean,
  },
  status: {
    type: String,
    default: '',
  },
});
</script>
