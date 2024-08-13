<template>
  <section>
    <header>
      <h2 class="mt-2 text-center">
        {{ $t('auth.profile.update_password') }}
      </h2>

      <p class="mt-1 text-center">
        {{ $t('auth.profile.ensure_password') }}
      </p>
    </header>

    <div class="mt-4">
      <v-text-field
        id="current_password"
        ref="currentPasswordInput"
        v-model="form.current_password"
        :label="$t('auth.profile.current_password')"
        type="password"
        variant="outlined"
        density="compact"
        color="accent"
        autocomplete="current-password"
      />

      <InputError :message="form.errors.current_password"/>
    </div>

    <div>
      <v-text-field
        id="password"
        ref="passwordInput"
        v-model="form.password"
        :label="$t('auth.profile.new_password')"
        type="password"
        variant="outlined"
        density="compact"
        color="accent"
        autocomplete="new-password"
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
      />

      <InputError :message="form.errors.password_confirmation"/>
    </div>

    <div class="mb-4">
      <PrimaryButton
        :disabled="form.processing"
        class="w-100"
        @click="updatePassword"
      >
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
import PrimaryButton from '@/Components/Breeze/PrimaryButton.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import route from 'ziggy-js';

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
  current_password: '',
  password: '',
  password_confirmation: '',
});

const updatePassword = () => {
  form.put(route('password.update'), {
    preserveScroll: true,
    onSuccess: () => form.reset(),
    onError: () => {
      if (form.errors.password) {
        form.reset('password', 'password_confirmation');
        passwordInput.value.focus();
      }
      if (form.errors.current_password) {
        form.reset('current_password');
        currentPasswordInput.value.focus();
      }
    },
  });
};
</script>
