import create from 'zustand';
import createRoomsStore from './rooms';
import createInventoryStore from './inventory';
import createTaskStore from './tasks';

export const useStore = create((...options) => ({
  ...createRoomsStore(...options),
  ...createInventoryStore(...options),
  ...createTaskStore(...options),
}));
