<template>
  <Head :title="$t('auth.profile.title')">
    <title>{{ $t('auth.profile.title') }}</title>
  </Head>

  <AuthenticatedLayout>
    <div class="d-flex flex-row justify-space-between flex-wrap gap-2">
      <v-card
        class="rounded-xl pa-4 width-card ma-2"
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
        class="rounded-xl pa-4 width-card ma-2"
        elevation="0"
        color="primary"
      >
        <UpdatePasswordForm class="width-inputs"/>
      </v-card>

      <v-card
        class="rounded-xl pa-4 width-card ma-2"
        elevation="0"
        color="primary"
      >
        <DeleteUserForm class="width-inputs"/>
      </v-card>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import { Head } from '@inertiajs/vue3';

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
