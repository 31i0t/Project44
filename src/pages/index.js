import { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';

import Head from "next/head";

import BaseCard from "../components/base/BaseCard";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import RoomList from "../components/RoomList";
import RoomInventory from "../components/RoomInventory";
import Quote from "../components/Quote";

import { useStore } from "../store";
import { useFetchRooms } from "../hooks/useRoomRepository";
import { useFetchInventory } from "../hooks/useInventoryRepository";


export default function Home() {
    const fetchRooms = useFetchRooms();
    const fetchInventory = useFetchInventory();
    const activeRoomId = useStore(state => state.activeRoomId);

    const [tasks,
        setTasks] = useState([{title: "Task 1"}, {title: "Task 2"}]);

    const addTask = (task) => {
        setTasks(previousTasks => [
            ...previousTasks, {
                title: task,
            }
        ])
    };

    const appTitle = "Estatelaza";
    const appSummary = "Manage inventories of your home with Estatelaza, at ease...";

    // initialize rooms data
    useEffect(() => {
        fetchRooms();
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
                <meta name="description" content="put some cool description here"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header title={appTitle} summary={appSummary} />
            <div className="flex flex-1 gap-3 p-3">
                {/* Main screen */}
                <main className="flex flex-1 gap-3">
                    <div className="w-full">
                        <RoomInventory />
                    </div>
                    <div className="w-full md:w-1/3">
                        <BaseCard title="Tasks">
                            <TaskList tasks={tasks} addTask={addTask}/>
                        </BaseCard>
                    </div>
                </main>
                {/* Sidebar */}
                <aside className="order-first flex flex-col gap-3 w-60">
                    <RoomList className="-mx-3"/>
                    <Quote />
                </aside>
            </div>
        </div>
    );
}
