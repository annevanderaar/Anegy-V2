<template>
  <GuestLayout>
    <Head :title="$t('auth.login.title')">
      <title>{{ $t('auth.login.title') }}</title>
    </Head>

    <div v-if="status" class="mb-4 mt-4 text-green text-center">
      {{ status }}
    </div>

    <div class="text-center mt-6">
      <h4>{{ $t('auth.login.login_account') }}</h4>
    </div>

    <div class="mt-4">
      <InputLabel :value="$t('auth.login.email')" for="email"/>

      <TextInput
        id="email"
        v-model="form.email"
        type="email"
        class="mt-1 block w-full"
        autocomplete="email"
        required
        autofocus
      />

      <InputError :message="form.errors.email"/>
    </div>

    <div class="mt-2">
      <InputLabel :value="$t('auth.login.password')" for="password"/>

      <TextInput
        id="password"
        v-model="form.password"
        type="password"
        class="mt-1 block w-full"
        autocomplete="current-password"
        required
      />

      <InputError :message="form.errors.password"/>
    </div>

    <div class="d-flex justify-between mb-2 mt-4">
      <PrimaryButton
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        class="mb-4 mr-4"
        @click="submit"
      >
        {{ $t('auth.login.title') }}
      </PrimaryButton>

      <Link
        v-if="canResetPassword"
        :href="route('password.request')"
        class="underline mr-4 mt-2"
      >
        {{ $t('auth.login.forgot_password') }}
      </Link>

      <Link
        :href="route('register')"
        class="underline mt-2"
      >
        {{ $t('auth.login.account') }}
      </Link>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/Breeze/InputError.vue';
import InputLabel from '@/Components/Breeze/InputLabel.vue';
import PrimaryButton from '@/Components/Breeze/PrimaryButton.vue';
import TextInput from '@/Components/Breeze/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
  canResetPassword: {
    type: Boolean,
  },

  status: {
    type: String,
    default: '',
  },
});

const form = useForm({
  email: '',
  password: '',
});

const submit = () => {
  form.post(route('login'), {
    onFinish: () => form.reset('password'),
  });
};
</script>
