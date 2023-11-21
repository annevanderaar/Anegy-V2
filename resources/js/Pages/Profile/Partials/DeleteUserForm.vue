<template>
  <section>
    <header>
      <h2 class="mt-2 mb-4">
        {{ $t('auth.profile.delete_account') }}
      </h2>

      <p class="mt-1 mb-4">
        {{ $t('auth.profile.delete_data') }}
      </p>
    </header>

    <DangerButton class="mb-4" @click="confirmUserDeletion">
      {{ $t('auth.profile.delete_account') }}
    </DangerButton>

    <Modal :show="confirmingUserDeletion" @close="closeModal">
      <div class="p-6">
        <h2 class="text-lg font-medium text-gray-900">
          {{ $t('auth.profile.sure') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600">
          {{ $t('auth.profile.delete_data') }}
        </p>

        <div class="mt-6">
          <InputLabel
            :value="$t('auth.login.password')"
            for="password"
            class="sr-only"
          />

          <TextInput
            id="password"
            ref="passwordInput"
            v-model="form.password"
            type="password"
            class="mt-1"
            placeholder="Password"
            @keyup.enter="deleteUser"
          />

          <InputError :message="form.errors.password"/>
        </div>

        <div class="mt-6 flex justify-end">
          <SecondaryButton @click="closeModal">
            {{ $t('auth.login.cancel') }}
          </SecondaryButton>

          <DangerButton
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
            class="ml-3"
            @click="deleteUser"
          >
            {{ $t('auth.profile.delete_account') }}
          </DangerButton>
        </div>
      </div>
    </Modal>
  </section>
</template>

<script setup>
import DangerButton from '@/Components/Breeze/DangerButton.vue';
import InputError from '@/Components/Breeze/InputError.vue';
import InputLabel from '@/Components/Breeze/InputLabel.vue';
import Modal from '@/Components/Breeze/Modal.vue';
import SecondaryButton from '@/Components/Breeze/SecondaryButton.vue';
import TextInput from '@/Components/Breeze/TextInput.vue';
import { useForm } from '@inertiajs/vue3';
import { nextTick, ref } from 'vue';
import route from 'ziggy-js';

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
  password: '',
});

const confirmUserDeletion = () => {
  confirmingUserDeletion.value = true;

  nextTick(() => passwordInput.value.focus());
};

const deleteUser = () => {
  form.delete(route('profile.destroy'), {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    onError: () => passwordInput.value.focus(),
    onFinish: () => form.reset(),
  });
};

const closeModal = () => {
  confirmingUserDeletion.value = false;

  form.reset();
};
</script>
