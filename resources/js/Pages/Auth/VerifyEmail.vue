<template>
  <GuestLayout>
    <Head :title="$t('auth.verify_email.title')">
      <title>{{ $t('auth.verify_email.title') }}</title>
    </Head>

    <p class="mb-6 mt-4">
      {{ $t('auth.verify_email.thanks') }}
    </p>

    <p v-if="verificationLinkSent" class="mb-6 text-green">
      {{ $t('auth.verify_email.link') }}
    </p>

    <div class="d-flex mt-4">
      <PrimaryButton
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        class="mr-4 mb-4 mt-2"
        @click="submit"
      >
        {{ $t('auth.verify_email.resend') }}
      </PrimaryButton>

      <Link
        :href="route('logout')"
        method="post"
        class="underline mt-2"
      >
        {{ $t('auth.logout.title') }}
      </Link>
    </div>
  </GuestLayout>
</template>

<script setup>
import { computed } from 'vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import PrimaryButton from '@/Components/Breeze/PrimaryButton.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps({
  status: {
    type: String,
    default: '',
  },
});

const form = useForm({});

const submit = () => {
  form.post(route('verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>
