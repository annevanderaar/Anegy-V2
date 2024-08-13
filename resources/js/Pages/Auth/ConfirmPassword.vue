<template>
  <GuestLayout>
    <Head :title="$t('auth.confirm_password.title')">
      <title>{{ $t('auth.confirm_password.title') }}</title>
    </Head>

    <p class="mb-5 mt-4">
      {{ $t('auth.confirm_password.secure') }}
    </p>

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

    <div class="mb-2">
      <PrimaryButton
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        class="mb-4 w-100"
        @click="submit"
      >
        {{ $t('auth.confirm_password.confirm') }}
      </PrimaryButton>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/Breeze/InputError.vue';
import PrimaryButton from '@/Components/Breeze/PrimaryButton.vue';
import { Head, useForm } from '@inertiajs/vue3';

const form = useForm({
  password: '',
});

const submit = () => {
  form.post(route('password.confirm'), {
    onFinish: () => form.reset(),
  });
};
</script>
