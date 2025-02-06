<template>
    <div class="full-window">
      <div class="img-container">
        <img src="/Img.png" alt="">
      </div>
      <div class="skeleton-loader">
        <div class="bold-skeleton-container">
          <div class="skeleton bold-skeleton-text"></div>
        </div>
        <div class="thin-skeleton-container">
          <div class="skeleton skeleton-text" :style="{ width: '60%' }"></div>
          <div class="skeleton skeleton-text" :style="{ width: '80%' }"></div>
          <div class="skeleton skeleton-text" :style="{ width: '70%' }"></div>
          <div class="skeleton skeleton-text" :style="{ width: '65%' }"></div>
          <div class="skeleton skeleton-text" :style="{ width: '62.5%' }"></div>
          <div class="skeleton skeleton-text" :style="{ width: '30%' }"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  </script>
  
  <style >
 
  </style>
  