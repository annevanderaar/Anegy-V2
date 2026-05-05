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

    <div class="d-flex flex-column justify-center text-center mb-2 mt-2">
      <PrimaryButton
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        @click="submit"
      >
        {{ $t('auth.login.title') }}
      </PrimaryButton>

      <Link
        :href="route('register')"
        class="underline mt-4"
      >
        {{ $t('auth.login.account') }}
      </Link>

      <Link
        v-if="canResetPassword"
        :href="route('password.request')"
        class="underline mt-2"
      >
        {{ $t('auth.login.forgot_password') }}
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

const onSearchOnKeyCode = e => {
  if (e.keyCode === 13) {
    submit();
  }
};

onMounted(() => {
  window.addEventListener('keypress', onSearchOnKeyCode);
});
</script>
