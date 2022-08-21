import { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Head from "next/head";

import Tags from "../components/Tags";
import BaseCard from "../components/base/BaseCard";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import RoomList from "../components/RoomList";
import RoomInventory from "../components/RoomInventory";
// import Quote from "../components/Quote";

import { useStore } from "../store";
import { useFetchRooms } from "../hooks/useRoomRepository";
import { useFetchInventory } from "../hooks/useInventoryRepository";


export default function Home() {
    const fetchRooms = useFetchRooms();
    const fetchInventory = useFetchInventory();
    const activeRoomId = useStore(state => state.activeRoomId);

    const [tags, setTags] = useState([]);
    //TODO: useState hook
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
    const appSummary = "Manage assets and inventories of your home seamlessly...";

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
            <ToastContainer />
            <Head>
                <title>{appTitle}</title>
                <meta name="description" content="put some cool description here"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header title={appTitle} summary={appSummary} />
            {/* <Quote /> */}
            <div className="flex flex-1 gap-3 p-3">
                {/* Main screen */}
                <main className="flex flex-1 gap-3">
                    <div className="w-full">
                        <RoomInventory />
                    </div>
                    <div className="w-full md:w-1/3">
                        <BaseCard title="Tasks">
                            <TaskList tasks={tasks} addTasks={addTask}/>
                        </BaseCard>
                    </div>
                </main>
                {/* Sidebar */}
                <aside className="order-first flex flex-col gap-3 w-60">
                    <RoomList className="-mx-3"/>
                    <BaseCard title="Tags">
                        <Tags items={tags}/>
                    </BaseCard>
                </aside>
            </div>
        </div>
    );
}
