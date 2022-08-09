import Head from "next/head";
// base components
import Tags from "../components/Tags";
import Title from "../components/Title";
import BaseTitle from "../components/BaseTitle";
import Menu from "../components/Menu";
// main components
import InventoryList from "../components/InventoryList";
import InventoryDetail from "../components/InventoryDetail";
// modals
import CreateRoomModal from "../components/CreateRoomModal";
import CreateInventoryModal from "../components/CreateInventoryModal";
// repositories
import roomRepository from "../services/_roomRepository";
import tagRepository from "../services/_tagRepository";
import inventoryRepository from "../services/_inventoryRepository";
// hooks
import {useState, useCallback, useEffect} from "react";
import {useStore} from "../store";
import TaskList from "../components/TaskList";

export default function Home() {
    const [tags,
        setTags] = useState([]);
    const [loadingRooms,
        setLoadingRooms] = useState(true);
    const rooms = useStore((state) => state.rooms);
    const setRooms = useStore((state) => state.setRooms);
    const setCreateRoomVisible = useStore((state) => state.setCreateRoomVisible);

    const activeRoomId = useStore((state) => state.activeRoomId);
    const setActiveRoomId = useStore((state) => state.setActiveRoomId);

    //TODO: useState hook
    const [tasks,
        setTasks] = useState([{title: "Task 1"}, {title: "Task 2"}]);

    const addTasks = (task) => {
        setTasks(previousTasks => [
            ...previousTasks, {
                title: "A"
            }
        ])
    };

    const setAllRooms = async() => {
        const res = await roomRepository.all();
        const rooms = await res.json()
        if (rooms.length) {
            setRooms(rooms);
            setActiveRoomId(rooms[0].id);
        }
        setLoadingRooms(false);
    };

    useEffect(() => {
        setAllRooms();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 font-sans leading-normal tracking-normal">
            <CreateRoomModal/>
            <CreateInventoryModal/>
            <Head>
                <title>Estatelaza</title>
                <meta name="description" content="put some cool description here"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="flex flex-1">           
                {/* Main screen */}
                <main className="flex flex-1">
                    <div className="w-full p-3">
                        <div className="bg-white border rounded shadow">
                            <div className="border-b p-3">
                                <h5 className="font-bold uppercase text-gray-600">Inventory</h5>
                            </div>
                            <div className="p-5">
                                {!loadingRooms && rooms.length === 0 && <p className="text-center">You haven&apos;t created any room yet</p>}
                                {rooms.length > 0 && <InventoryList/>}
                            </div>
                            <InventoryDetail/>
                        </div>                        
                    </div>
                    <div className="w-full md:w-1/2 p-3">
                        <div className="bg-white border rounded shadow">
                            <div className="border-b p-3">
                                <h5 className="font-bold uppercase text-gray-600">Tasks</h5>
                            </div>
                            {/* TaskList */}
                            <div className="p-5 bg-white border-2 border-gray-100">
                                <TaskList tasks={tasks} addTasks={addTasks}/>
                            </div>
                        </div>
                    </div>
                </main>
                {/* Sidebar */}
                <aside className="order-first bg-white w-60 mt-3 ml-1 mb-3 border rounded shadow">
                    <div className="border-b p-3">
                      <h5 className="font-bold uppercase text-gray-600">User Info</h5>
                    </div>                    
                    <BaseTitle
                        onAdd={() => setCreateRoomVisible(true)}
                        label="Rooms"
                        classes={["pl-2"]}/>
                    <Menu items={rooms} active={activeRoomId} onSelect={setActiveRoomId}/>
                    <Title label="Tags" classes={["pl-2"]}/>
                    <Tags items={tags}/>
                </aside>
            </div>
        </div>
    );
}
