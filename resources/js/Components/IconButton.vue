<template>
  <v-btn
    :icon="icon"
    :href="href"
    class="text-white"
  />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: '',
    },

    href: {
      type: String,
      default: '',
    },
  },
});
</script>
