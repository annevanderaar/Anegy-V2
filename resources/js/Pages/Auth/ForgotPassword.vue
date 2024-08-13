<template>
  <GuestLayout>
    <Head :title="$t('auth.forgot_password.title')">
      <title>{{ $t('auth.forgot_password.title') }}</title>
    </Head>

    <p class="mb-4 mt-4">
      {{ $t('auth.forgot_password.forgot') }}
    </p>

    <p v-if="status" class="mb-4 text-green">
      {{ status }}
    </p>

    <div>
      <v-text-field
        id="email"
        v-model="form.email"
        :label="$t('auth.login.email')"
        type="email"
        variant="outlined"
        density="compact"
        color="accent"
        autocomplete="email"
        required
      />

      <InputError :message="form.errors.email"/>
    </div>

    <div class="mb-4 d-flex flex-column justify-center">
      <PrimaryButton
        :class="{ 'opacity-25' : form.processing }"
        :disabled="form.processing"
        class="w-100"
        @click="submit"
      >
        {{ $t('auth.forgot_password.mail_link') }}
      </PrimaryButton>

      <Link
        :href="route('login')"
        class="underline mt-4 text-center"
      >
        {{ $t('auth.login.login_account') }}
      </Link>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/Breeze/InputError.vue';
import PrimaryButton from '@/Components/Breeze/PrimaryButton.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
  status: {
    type: String,
    default: '',
  },
});

const form = useForm({
  email: '',
});

const submit = () => {
  form.post(route('password.email'));
};
</script>
