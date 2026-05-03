<template>
  <MobileAppBar v-if="mobile"/>

  <DesktopAppBar v-else/>
</template>

<script setup lang="ts">
import MobileAppBar from '@/Components/AppBar/MobileAppBar.vue';
import DesktopAppBar from '@/Components/AppBar/DesktopAppBar.vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
</script>
