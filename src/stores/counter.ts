// src/stores/itemsStore.ts
import { defineStore } from 'pinia';

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [
      { id: 1, name: 'Item 1', img: '/Item-Image-green.png', count: 5 },
      { id: 2, name: 'Item 2', img: '/Item-Image-orange.png', count: 5 },
      { id: 3, name: 'Item 3', img: '/Item-Image-purple.png', count: 5 },
    ],
  }),
  getters: {
    itemCount: (state) => state.items.length, // Общее количество предметов
    getItemById: (state) => (id: number) => {
      return state.items.find(item => item.id === id);
    },
  },
  actions: {
    decrementItemCount(id: number) {
      const item = this.items.find(item => item.id === id);
      if (item && item.count > 0) {
        item.count--;
      }
    },
  },
});
