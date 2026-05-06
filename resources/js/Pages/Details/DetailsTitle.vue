<template>
  <v-row
    class="mt-2"
    justify="center"
    align="center"
  >
    <h1 class="text-center">
      {{ data.name ? data.name : data.title }}
    </h1>

    <div>
      <v-btn
        v-if="isInList('favorites', data.id)"
        class="ml-1"
        variant="text"
        icon="mdi-heart"
        color="secondary"
        size="x-large"
        @click="listStore.delete('favorites', user.id, data.id)"
      />

      <v-btn
        v-else
        class="ml-1"
        variant="text"
        icon="mdi-heart-outline"
        color="secondary"
        size="x-large"
        @click="createListItem('favorites')"
      />

      <v-btn
        v-if="isInList('watched', data.id)"
        class="ml-1"
        variant="text"
        icon="mdi-check-bold"
        color="accent"
        size="x-large"
        @click="listStore.delete('watched', user.id, data.id)"
      />

      <v-btn
        v-else
        class="ml-1"
        variant="text"
        icon="mdi-check-outline"
        color="accent"
        size="x-large"
        @click="createListItem('watched')"
      />
    </div>
  </v-row>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';
import { ListStore } from '@/Stores/ListStore';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const listStore = ListStore();
const toast = useToast();
const { t } = useI18n();

const user = computed(() => usePage().props.auth.user);

const isInList = (kind, id) => {
  const ids = listStore[kind].ids;

  return ids?.includes(String(id)) || ids?.includes(id);
};

const createListItem = kind => {
  if (user.value) {
    listStore.create(
      kind,
      user.value.id,
      props.data.id,
      props.data.video,
      props.data.known_for_department,
      props.data.first_air_date,
    );

    return;
  }

  const messageKey = kind === 'favorites'
    ? 'favorites.need_account'
    : 'watched.need_account';

  toast.warning(t(messageKey));
};
</script>
