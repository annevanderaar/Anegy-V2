<template>
  <MobileAppBar v-if="mobile"/>

  <DesktopAppBar v-else/>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import DesktopAppBar from '@/Components/AppBar/DesktopAppBar.vue';
import MobileAppBar from '@/Components/AppBar/MobileAppBar.vue';

const { mobile } = useDisplay();
</script>
