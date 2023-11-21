<template>
  <v-text-field
    ref="input"
    :value="modelValue"
    variant="outlined"
    density="compact"
    class="rounded-lg"
    color="accent"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue';

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus();
  }
});

defineExpose({ focus: () => input.value.focus() });
</script>
