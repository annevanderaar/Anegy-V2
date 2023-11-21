<template>
  <section>
    <header>
      <h2 class="mt-2 text-center">
        {{ $t('auth.profile.information') }}
      </h2>

      <p class="mt-1 text-center">
        {{ $t('auth.profile.update_profile') }}
      </p>
    </header>

    <div class="mt-2">
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

    <div class="mt-2">
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

    <div>
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

    <div v-if="mustVerifyEmail && user.email_verified_at === null">
      <p>
        {{ $t('auth.profile.email_unverified') }}
        <Link
          :href="route('verification.send')"
          method="post"
          class="underline"
        >
          {{ $t('auth.profile.resend_email') }}
        </Link>
      </p>

      <div
        v-show="status === 'verification-link-sent'"
        class="text-green"
      >
        {{ $t('auth.profile.new_verification') }}
      </div>
    </div>

    <div class="mb-4">
      <PrimaryButton :disabled="form.processing" @click="form.patch(route('profile.update'))">
        {{ $t('auth.profile.save') }}
      </PrimaryButton>

      <Transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        class="transition ease-in-out"
      >
        <p v-if="form.recentlySuccessful" class="text-green mt-2">
          {{ $t('auth.profile.saved') }}
        </p>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import InputError from '@/Components/Breeze/InputError.vue';
import InputLabel from '@/Components/Breeze/InputLabel.vue';
import PrimaryButton from '@/Components/Breeze/PrimaryButton.vue';
import TextInput from '@/Components/Breeze/TextInput.vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';
import route from 'ziggy-js';

defineProps({
  mustVerifyEmail: {
    type: Boolean,
  },

  status: {
    type: String,
    default: '',
  },
});

const user = usePage().props.auth.user;

const form = useForm({
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
});
</script>
