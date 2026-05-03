<template>
  <section>
    <header class="text-center">
      <h2 class="mt-2 mb-4">
        {{ $t('auth.profile.delete_account') }}
      </h2>

      <p class="mt-1 mb-4">
        {{ $t('auth.profile.delete_data') }}
      </p>

      <v-text-field
        id="password"
        ref="passwordInput"
        v-model="form.password"
        :label="$t('auth.login.password')"
        type="password"
        class="mt-1"
        variant="outlined"
        density="compact"
        color="accent"
        @keyup.enter="deleteUser"
      />

      <InputError :message="form.errors.password"/>
    </header>

    <SecondaryButton
      :class="{ 'opacity-25': form.processing }"
      :disabled="form.processing"
      class="mb-4 mt-2 w-100"
      @click="deleteUser"
    >
      {{ $t('auth.profile.delete_account') }}
    </SecondaryButton>
  </section>
</template>

<script setup lang="ts">
import InputError from '@/Components/Breeze/InputError.vue';
import SecondaryButton from '@/Components/Breeze/SecondaryButton.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import route from 'ziggy-js';

const passwordInput = ref(null);

const form = useForm({
  password: '',
});

const deleteUser = () => {
  form.delete(route('profile.destroy'), {
    preserveScroll: true,
    onError: () => passwordInput.value.focus(),
    onFinish: () => form.reset(),
  });
};
</script>
