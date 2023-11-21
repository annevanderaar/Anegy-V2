<template>
  <div>
    <Cards :results="similar"/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Cards from '@/Components/Cards.vue';

export default defineComponent({
  components: {
    Cards,
  },

  props: {
    similar: {
      type: Array,
      required: true,
    },
  },
});
</script>
