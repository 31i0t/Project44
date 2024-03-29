import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Head from "next/head";

import BaseCard from "../components/base/BaseCard";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import RoomList from "../components/RoomList";
import RoomInventory from "../components/RoomInventory";

import { useStore } from "../store";
import { useFetchRooms } from "../hooks/useRoomRepository";
import { useFetchInventory } from "../hooks/useInventoryRepository";
import { useFetchTasks } from "../hooks/useTaskRepository";

export default function Home() {
  const fetchRooms = useFetchRooms();
  const fetchInventory = useFetchInventory();
  const fetchTasks = useFetchTasks();
  const activeRoomId = useStore((state) => state.activeRoomId);

  const [tasks, setTasks] = useState([
    { title: "Task 1" },
    { title: "Task 2" },
  ]);

  const addTask = (task) => {
    setTasks((previousTasks) => [
      ...previousTasks,
      {
        title: task,
      },
    ]);
  };

  const appTitle = "EstateLaza";
  const appSummary =
    "Manage inventories of your home with EstateLaza, at ease...";

  // initialize rooms data
  useEffect(() => {
    fetchRooms();
    fetchTasks();
  }, []);

  // load room inventory on room change
  useEffect(() => {
    if (activeRoomId) {
      fetchInventory(activeRoomId);
    }
  }, [activeRoomId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans leading-normal tracking-normal">
      <Toaster />
      <Head>
        <title>{appTitle}</title>
        <meta
          name="description"
          content="EstateLaza is an easy-to-learn and easy-to-use tool for general estate and asset management, including non-routine maintenance activities."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Top header */}
      <Header title={appTitle} />
      {/* App content */}
      <div className="flex flex-1 flex-col md:flex-row gap-3 p-3">
        {/* Main content */}
        <main className="flex md:flex-1 flex-col lg:flex-row gap-3">
          {/* */}
          <div className="flex-1 w-full">
            <RoomInventory />
          </div>
          {/* */}
          <div className="w-full lg:w-1/3">
            <BaseCard title="Tasks">
              <TaskList tasks={tasks} addTask={addTask} />
            </BaseCard>
          </div>
        </main>
        {/* Aside containing the room list - top section on mobile, sidebar on larger screens */}
        <aside className="order-first flex flex-col gap-3 md:w-1/3 lg:w-80">
          <RoomList className="-mx-3" />
        </aside>
      </div>
    </div>
  );
}
