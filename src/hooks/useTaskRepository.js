/**
 * Handles inventory db calls
 */

import toast from 'react-hot-toast';
import { useStore } from "../store";
import { BASE_URL } from "../utils";

const service = {
  all() {
    return fetch(`${BASE_URL}/api/tasks`, {
      method: 'GET',
    });
  },
  add(name) {
    return fetch(`${BASE_URL}/api/tasks/add`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name })
    });
  },
  update(id, changes) {
    return fetch(`${BASE_URL}/api/tasks/update`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...changes })
    });
  },
  delete(id) {
    return fetch(`${BASE_URL}/api/tasks/delete`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id })
    });
  }
};

export const useFetchTasks = () => {
  const setLoadingTasks = useStore(state => state.setLoadingTasks);
  const setTasks = useStore(state => state.setTasks);
  const setActiveTaskId = useStore(state => state.setActiveTaskId);
  return async () => {
    setLoadingTasks(true);
    try {
      const response = await service.all();
      const tasks = await response.json();
      if (response.status !== 200) throw new Error(tasks.error.message);
      if (tasks.length) {
        // convert array to object for easier manipulation
        const tasksObj = tasks.reduce((output, task) => {
          output[task.id] = task;
          return output;
        }, {});
        setTasks(tasksObj);
        setActiveTaskId(tasks[0].id);
      }
      setLoadingTasks(false);
    } catch (err) {
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        "Something went wrong! Please refresh the page or contact our support team if the issue persist.",
        { duration: 4000 }
      );
    }
  }
};

export const useAddTask = () => {
  const tasks = useStore(state => state.tasks);
  const updateTask = useStore(state => state.updateTask);
  const setActiveTaskId = useStore(state => state.setActiveTaskId);
  const setTasks = useStore(state => state.setTasks);

  return async (value) => {
    const toastId = toast.loading('Creating task...');
    try {
      const response = await service.add(value);
      const task = await response.json();
      if (response.status !== 200) throw new Error(task.error.message);
      updateTask(task.id, task);
      setActiveTaskId(task.id);
      toast.success(<b>Task created successfully!</b>, { id: toastId });
    } catch (err) {
      // restore state
      setTasks(tasks);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        `There was an error trying to create task "${ value }", please try again.`,
        { id: toastId, duration: 4000 }
      );
    }
  }
};

export const useUpdateTask = () => {
  const tasks = useStore(state => state.tasks);
  const updateTask = useStore(state => state.updateTask);
  const setTasks = useStore(state => state.setTasks);
  return async(id, changes) => {
    const toastId = toast.loading('Updating task...');
    try {
      const response = await service.update(id, changes);
      const data = await response.json();
      if (response.status !== 200) throw new Error(data.error.message);
      updateTask(id, changes);
      toast.success(<b>Task updated successfully!</b>, { id: toastId });
    } catch (err) {
      // restore state
      setTasks(tasks);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        `There was an error trying to update task "${ value }", please try again.`,
        { id: toastId, duration: 4000 }
      );
    }
  }
};

export const useDeleteTask = () => {
  const tasks = useStore(state => state.tasks);
  const deleteTask = useStore(state => state.deleteTask);
  const setTasks = useStore(state => state.setTasks);
  return async (id) => {
    const toastId = toast.loading('Deleting task...');
    const task = tasks[id];
    try {
      const response = await service.delete(id);
      const data = await response.json();
      if (response.status !== 200) throw new Error(data.error.message);
      deleteTask(id)
      toast.success(<b>Task deleted successfully!</b>, { id: toastId });
    } catch (err) {
      // restore state
      setTasks(tasks);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        `There was an error trying to delete task "${ task.name }", please try again.</span>`,
        { id: toastId, duration: 4000 }
      );
    }
  }
};

export const useDeleteAllDone = () => {
  const tasks = useStore(state => state.tasks);
  const setTasks = useStore(state => state.setTasks);
  return async () => {
    const toastId = toast.loading('Deleting tasks...');
    const doneTasks = Object.values(tasks).filter(t => t.done).map(t => t.id);
    try {
      await Promise.all(doneTasks.map(service.delete));
      setTasks({});
      toast.success(<b>Tasks deleted successfully!</b>, { id: toastId });
    } catch (err) {
      // restore state
      setTasks(tasks);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        `There was an error trying to delete all done taasks, please try again.</span>`,
        { id: toastId, duration: 4000 }
      );
    }
  }
};
