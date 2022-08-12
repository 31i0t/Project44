import {useState, useCallback, useEffect} from "react";
import {useStore} from "../store";
import Head from "next/head";

import Tags from "../components/Tags";
import BaseCard from "../components/base/BaseCard";
import CreateRoomModal from "../components/CreateRoomModal";
import CreateInventoryModal from "../components/CreateInventoryModal";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import RoomList from "../components/RoomList";
import RoomInventory from "../components/RoomInventory";
import Quote from "../components/Quote";

export default function Home() {
    const [tags, setTags] = useState([]);
    //TODO: useState hook
    const [tasks,
        setTasks] = useState([{title: "Task 1"}, {title: "Task 2"}]);

    const addTasks = (task) => {
        setTasks(previousTasks => [
            ...previousTasks, {
                title: task,
            }
        ])
    };

    const appTitle = "Estatelaza";
    const appSummary = "Manage assets and inventories of your home seamlessly...";

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 font-sans leading-normal tracking-normal">
            <CreateRoomModal/>
            <CreateInventoryModal/>
            <Head>
                <title>{appTitle}</title>
                <meta name="description" content="put some cool description here"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header title={appTitle} summary={appSummary} />
            <Quote />
            <div className="flex flex-1 gap-3 p-3">
                {/* Main screen */}
                <main className="flex flex-1 gap-3">
                    <div className="w-full">
                        <RoomInventory />
                    </div>
                    <div className="w-full md:w-1/3">
                        <BaseCard title="Tasks">
                            <TaskList tasks={tasks} addTasks={addTasks}/>
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
