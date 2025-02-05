<template>
    <div class="grid-container">
      <div
        v-for="(square, index) in 25"
        :key="index"
        class="square"
        @drop="onDrop($event, index)"
        @dragover.prevent
      >
        <div v-if="store.items[index]" class="item">
          <img
            :src="store.items[index].img"
            :alt="store.items[index].name"
            class="item-img"
            :draggable="true"
            @dragstart="onDragStart(store.items[index], index)"
            @click="openItemModal(store.items[index])"
          />
          <span class="item-count">{{ store.items[index].count }}</span>
        </div>
      </div>
  

      <div
        v-show="isModalVisible"
        class="modal-overlay"
        :class="{'active': isModalVisible}"
      >
        <div class="modal-content">

          <div class="modal-img-container">
            <img :src="itemToDelete?.img" :alt="itemToDelete?.name" class="modal-img" />
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

          <div class="modal-actions">
            <button class="delete-item" v-if="!isInputVisible" @click="openDeleteInput">Удалить предмет</button>
  
            <div v-if="isInputVisible" class="input-container">
              <input v-model="quantityToDelete" type="number" placeholder="Введите количество" />
              <div class="input-actions">
                <button @click="deleteItem" class="confirm-btn">Подтвердить</button>
                <button @click="cancelDelete" class="cancel-btn">Отмена</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useItemsStore } from '@/stores/counter.ts';
  import { ref, onMounted } from 'vue';
  
  const store = useItemsStore();
  const isModalVisible = ref(false);
  const isInputVisible = ref(false);
  const itemToDelete = ref<any>(null);
  const quantityToDelete = ref<number | null>(null);
  const draggedItem = ref<any>(null); 
  

  const loadInventory = () => {
    const savedItems = localStorage.getItem('inventory');
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      store.items = parsedItems;
    }
  };
  

  const saveInventory = () => {
    localStorage.setItem('inventory', JSON.stringify(store.items));
  };
  

  onMounted(() => {
    loadInventory();
  });
  

  const openItemModal = (item: any) => {
    itemToDelete.value = item;
    document.querySelector('.modal-overlay')?.classList.add('active');
    setTimeout(() => {
      isModalVisible.value = true;
    }, 0);
  };
  
  const closeModal = () => {
    document.querySelector('.modal-overlay')?.classList.remove('active');
    setTimeout(() => {
      isModalVisible.value = false;
    }, 300); 
  };
  

  const onDragStart = (item: any, index: number) => {
    draggedItem.value = { item, index };
  };
  
  const onDrop = (event: DragEvent, index: number) => {
    event.preventDefault();
    if (draggedItem.value) {
      const draggedIndex = draggedItem.value.index;
      const draggedItemData = draggedItem.value.item;
  

      const temp = store.items[draggedIndex];
      store.items[draggedIndex] = store.items[index];
      store.items[index] = temp;
  

      saveInventory();
  

      draggedItem.value = null;
    }
  };
  
 
  const openDeleteInput = () => {
    isInputVisible.value = true;
  };
  

  const deleteItem = () => {
    if (itemToDelete.value && quantityToDelete.value > 0) {
      const index = store.items.findIndex(item => item.id === itemToDelete.value.id);
      if (index !== -1) {
        store.items[index].count -= quantityToDelete.value;
        if (store.items[index].count <= 0) {
          store.items.splice(index, 1);
        }
      }
    }
    saveInventory();
    closeModal();
    isInputVisible.value = false;
  };
  

  const cancelDelete = () => {
    isInputVisible.value = false;
  };
  </script>
  
  
  
  <style scoped>
  
  </style>
  