const createTaskStore = (set, get) => ({
  activeTaskId: null,
  editTaskEnabled: false,
  loadingTasks: true,
  tasks: {},
  // actions
  setActiveTaskId: (id) => {
    set({ activeTaskId: id });
    get().setActiveInventoryId(null);
  },
  setLoadingTasks: (value) => set({ loadingTasks: value }),
  setTasks: (tasks) => set(() => ({ tasks })),
  updateTask: (id, changes) => {
    set((state) => ({
      tasks: {
        ...state.tasks,
        [id]: {
          ...state.tasks[id],
          ...changes,
        },
      }
    }));
  },
  deleteTask: (id) => {
    set((state) => {
      const tasks = { ...state.tasks };
      delete tasks[id];
      return {
        tasks,
      }
    });
  },
});

export default createTaskStore;
