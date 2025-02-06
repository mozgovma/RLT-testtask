<script setup>
import LeftWindow from '@/components/LeftWindow.vue';
import Inventory from '@/components/Inventory.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
<div>
  <div class="flex-for-elem">
    <LeftWindow />
    <Inventory />
  </div>
  <Footer />
</div>
</template>

<style scoped>
.flex-for-elem{
  display: flex;
}
</style>