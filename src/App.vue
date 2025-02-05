<script setup>
import LeftWindow from '@/components/LeftWindow.vue';
import Inventory from '@/components/Inventory.vue';
</script>

<template>
  <div class="flex-for-elem">
    <LeftWindow />
    <Inventory />
  </div>
</template>

<style scoped>
.flex-for-elem{
  display: flex;
}
</style>