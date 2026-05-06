<template>
  <GuestLayout>
    <Head :title="$t('auth.register.title')">
      <title>{{ $t('auth.register.title') }}</title>
    </Head>

    <div class="text-center mt-6 mb-4">
      <h4>{{ $t('auth.register.create_account') }}</h4>
    </div>

    <div>
      <v-text-field
        id="firstname"
        v-model="form.firstname"
        :label="$t('auth.login.firstname')"
        variant="outlined"
        density="compact"
        color="accent"
        autocomplete="firstname"
        required
      />

      <InputError :message="form.errors.firstname"/>
    </div>

    <div>
      <v-text-field
        id="lastname"
        v-model="form.lastname"
        :label="$t('auth.login.lastname')"
        variant="outlined"
        density="compact"
        color="accent"
        autocomplete="lastname"
        required
      />

      <InputError :message="form.errors.lastname"/>
    </div>

    <div>
      <v-text-field
        id="email"
        v-model="form.email"
        :label="$t('auth.login.email')"
        type="email"
        variant="outlined"
        density="compact"
        color="accent"
        autocomplete="username"
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
        autocomplete="new-password"
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

    <div class="d-flex flex-column justify-center mb-2 mt-2">
      <PrimaryButton
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        @click="submit"
      >
        {{ $t('auth.register.title') }}
      </PrimaryButton>

      <Link
        :href="route('login')"
        class="underline mt-4 text-center"
      >
        {{ $t('auth.register.registered') }}
      </Link>
    </div>
  </GuestLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import InputError from '@/Components/Breeze/InputError.vue';
import PrimaryButton from '@/Components/Breeze/PrimaryButton.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { route } from 'ziggy-js';

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

const onSearchOnKeyCode = e => {
  if (e.keyCode === 13) {
    submit();
  }
};

onMounted(() => {
  window.addEventListener('keypress', onSearchOnKeyCode);
});
</script>
