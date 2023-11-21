<template>
  <GuestLayout>
    <Head :title="$t('auth.confirm_password.title')">
      <title>{{ $t('auth.confirm_password.title') }}</title>
    </Head>

    <p class="mb-4 mt-4">
      {{ $t('auth.confirm_password.secure') }}
    </p>

    <div>
      <InputLabel :value="$t('auth.login.password')" for="password"/>

      <TextInput
        id="password"
        v-model="form.password"
        type="password"
        class="mt-1 block w-full"
        autocomplete="current-password"
        required
        autofocus
      />

      <InputError :message="form.errors.password"/>
    </div>

    <div class="mt-2 mb-2">
      <PrimaryButton
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        class="mb-4"
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
import InputLabel from '@/Components/Breeze/InputLabel.vue';
import PrimaryButton from '@/Components/Breeze/PrimaryButton.vue';
import TextInput from '@/Components/Breeze/TextInput.vue';
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
