<template>
  <Head :title="$t('auth.profile.title')">
    <title>{{ $t('auth.profile.title') }}</title>
  </Head>

  <AuthenticatedLayout>
    <div>
      <div class="d-flex justify-center flex-column align-content-center">
        <div class="mb-8 w-50 align-self-center d-flex justify-center bg-grey-lighten-4 rounded-xl">
          <UpdateProfileInformationForm
            :must-verify-email="mustVerifyEmail"
            :status="status"
            class="width-inputs"
          />
        </div>

        <div class="mb-8 w-50 align-self-center d-flex justify-center bg-grey-lighten-4 rounded-xl">
          <UpdatePasswordForm class="width-inputs"/>
        </div>

        <div class="mb-4 w-50 align-self-center d-flex justify-center bg-grey-lighten-4 rounded-xl">
          <DeleteUserForm class="width-inputs"/>
        </div>
      </div>
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
