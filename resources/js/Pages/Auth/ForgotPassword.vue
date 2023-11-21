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

    <div class="mt-4">
      <PrimaryButton
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        @click="submit"
      >
        {{ $t('auth.forgot_password.mail_link') }}
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
