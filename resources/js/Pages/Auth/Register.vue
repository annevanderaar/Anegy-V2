<template>
  <GuestLayout>
    <Head :title="$t('auth.register.title')">
      <title>{{ $t('auth.register.title') }}</title>
    </Head>

    <div class="text-center mt-6">
      <h4>{{ $t('auth.register.create_account') }}</h4>
    </div>

    <div>
      <InputLabel :value="$t('auth.login.firstname')" for="firstname"/>

      <TextInput
        id="firstname"
        v-model="form.firstname"
        type="text"
        class="mt-1 block w-full"
        autocomplete="firstname"
        required
        autofocus
      />

      <InputError :message="form.errors.firstname"/>
    </div>

    <div>
      <InputLabel :value="$t('auth.login.lastname')" for="lastname"/>

      <TextInput
        id="lastname"
        v-model="form.lastname"
        type="text"
        class="mt-1 block w-full"
        autocomplete="lastname"
        required
        autofocus
      />

      <InputError :message="form.errors.lastname"/>
    </div>

    <div class="mt-2">
      <InputLabel :value="$t('auth.login.email')" for="email"/>

      <TextInput
        id="email"
        v-model="form.email"
        type="email"
        class="mt-1 block w-full"
        autocomplete="username"
        required
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
        autocomplete="new-password"
        required
      />

      <InputError :message="form.errors.password"/>
    </div>

    <div class="mt-2">
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

    <div class="d-flex mb-2 mt-4">
      <PrimaryButton
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        class="mb-4 mr-4"
        @click="submit"
      >
        {{ $t('auth.register.title') }}
      </PrimaryButton>

      <Link
        :href="route('login')"
        class="underline mt-2"
      >
        {{ $t('auth.register.registered') }}
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
import route from 'ziggy-js';

const form = useForm({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: false,
});

const submit = () => {
  form.post(route('register'), {
    onFinish: () => form.reset('password', 'password_confirmation'),
  });
};
</script>
