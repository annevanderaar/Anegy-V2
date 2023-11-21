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

    <div>
      <InputLabel :value="$t('auth.profile.current_password')" for="current_password"/>

      <TextInput
        id="current_password"
        ref="currentPasswordInput"
        v-model="form.current_password"
        type="password"
        class="mt-1 block w-full"
        autocomplete="current-password"
      />

      <InputError :message="form.errors.current_password"/>
    </div>

    <div>
      <InputLabel :value="$t('auth.profile.new_password')" for="password"/>

      <TextInput
        id="password"
        ref="passwordInput"
        v-model="form.password"
        type="password"
        class="mt-1 block w-full"
        autocomplete="new-password"
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
      />

      <InputError :message="form.errors.password_confirmation"/>
    </div>

    <div class="mb-4">
      <PrimaryButton :disabled="form.processing" @click="updatePassword">
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
