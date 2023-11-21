<template>
  <GuestLayout>
    <Head :title="$t('auth.reset_password.title')">
      <title>{{ $t('auth.reset_password.title') }}</title>
    </Head>

    <div class="text-center mt-6">
      <h4>{{ $t('auth.reset_password.reset') }}</h4>
    </div>

    <div class="mt-4">
      <InputLabel :value="$t('auth.login.email')" for="email"/>

      <TextInput
        id="email"
        v-model="form.email"
        type="email"
        class="mt-1 block w-full"
        autocomplete="username"
        required
        autofocus
      />

      <InputError :message="form.errors.email"/>
    </div>

    <div>
      <InputLabel :value="$t('auth.login.password')" for="password"/>

      <TextInput
        id="password"
        v-model="form.password"
        type="password"
        class="mt-1 block w-full"
        autocomplete="new-password"
        required
      />

      <InputError :message="form.errors.password"/>
    </div>

    <div>
      <InputLabel :value="$t('auth.login.confirm_password')" for="password_confirmation"/>

      <TextInput
        id="password_confirmation"
        v-model="form.password_confirmation"
        type="password"
        class="mt-1 block w-full"
        autocomplete="new-password"
        required
      />

      <InputError :message="form.errors.password_confirmation"/>
    </div>

    <div class="mb-2 mt-4">
      <PrimaryButton
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        class="mb-4"
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
import InputLabel from '@/Components/Breeze/InputLabel.vue';
import PrimaryButton from '@/Components/Breeze/PrimaryButton.vue';
import TextInput from '@/Components/Breeze/TextInput.vue';
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
