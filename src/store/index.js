import create from 'zustand';
import createRoomsStore from './rooms';
import createInventoryStore from './inventory';

export const useStore = create((...options) => ({
  ...createRoomsStore(...options),
  ...createInventoryStore(...options),
}));
