<template>
  <GuestLayout>
    <Head :title="$t('auth.reset_password.title')">
      <title>{{ $t('auth.reset_password.title') }}</title>
    </Head>

    <div class="text-center mt-6">
      <h4>{{ $t('auth.reset_password.reset') }}</h4>
    </div>

    <div class="mt-4">
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

    <div>
      <v-text-field
        id="password"
        v-model="form.password"
        :label="$t('auth.login.password')"
        type="password"
        variant="outlined"
        density="compact"
        color="accent"
        autocomplete="current-password"
        required
      />

      <InputError :message="form.errors.password"/>
    </div>

    <div>
      <v-text-field
        id="password_confirmation"
        v-model="form.password_confirmation"
        :label="$t('auth.login.confirm_password')"
        type="password"
        variant="outlined"
        density="compact"
        color="accent"
        autocomplete="new-password"
        required
      />

      <InputError :message="form.errors.password_confirmation"/>
    </div>

    <div class="mb-2 mt-2">
      <PrimaryButton
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        class="mb-4 w-100"
        @click="submit"
      >
        {{ $t('auth.reset_password.title') }}
      </PrimaryButton>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/Breeze/InputError.vue';
import PrimaryButton from '@/Components/Breeze/PrimaryButton.vue';
import { Head, useForm } from '@inertiajs/vue3';

const props = defineProps({
  email: {
    type: String,
    required: true,
  },

  token: {
    type: String,
    required: true,
  },
});

const form = useForm({
  token: props.token,
  email: props.email,
  password: '',
  password_confirmation: '',
});

const submit = () => {
  form.post(route('password.store'), {
    onFinish: () => form.reset('password', 'password_confirmation'),
  });
};
</script>
