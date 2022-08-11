import Head from "next/head";
// base components
import Tags from "../components/Tags";
import BaseButton from "../components/BaseButton";
import BaseCard from "../components/BaseCard";
import Menu from "../components/Menu";
// main components
import InventoryList from "../components/InventoryList";
import InventoryDetail from "../components/InventoryDetail";
// modals
import CreateRoomModal from "../components/CreateRoomModal";
import CreateInventoryModal from "../components/CreateInventoryModal";
// repositories
import roomRepository from "../services/roomRepository";
// hooks
import {useState, useCallback, useEffect} from "react";
import {useStore} from "../store";
import TaskList from "../components/TaskList";
import Header from "../components/Header";

export default function Home() {
  const [tags, setTags] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const rooms = useStore((state) => Object.values(state.rooms));
  const setRooms = useStore((state) => state.setRooms);
  const setCreateRoomVisible = useStore((state) => state.setCreateRoomVisible);


    const activeRoomId = useStore((state) => state.activeRoomId);
    const setActiveRoomId = useStore((state) => state.setActiveRoomId);


    const activeInventoryId = useStore((state) => state.activeInventoryId);
    const setActiveInventoryId = useStore((state) => state.setActiveInventoryId);

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

    const handleSelectRoom = (id) => {
        setActiveRoomId(id);
        setActiveInventoryId(null);
    }

    const appTitle = "Estatelaza";

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 font-sans leading-normal tracking-normal">
            <CreateRoomModal/>
            <CreateInventoryModal/>
            <Head>
                <title>{appTitle}</title>
                <meta name="description" content="put some cool description here"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>            
            <Header title={appTitle} />
           
            <div className="flex flex-1 gap-3 p-3">
                {/* Main screen */}
                <main className="flex flex-1 gap-3">
                    <div className="w-full">
                        <BaseCard
                            title="Inventory"
                            className="h-full">
                            <div className="flex h-full -mx-3">
                                <div className={`flex flex-col ${activeInventoryId ? 'w-1/2' : 'w-full'}`}>
                                    {
                                        !loadingRooms && rooms.length === 0 &&
                                        <p className="text-center">You haven&apos;t created any room yet</p>
                                    }
                                    {
                                        rooms.length > 0 &&
                                        <InventoryList className="flex-grow" />
                                    }
                                    {
                                        activeRoomId &&
                                        <div className="mx-3">
                                            <BaseButton type="danger-blank" size="xs">Delete room</BaseButton>
                                        </div>
                                    }
                                </div>
                                { activeInventoryId && <div className="w-1/2 h-full"><InventoryDetail/></div> }
                            </div>
                        </BaseCard>
                    </div>
                    <div className="w-full md:w-1/3">
                        <BaseCard title="Tasks">
                            <TaskList tasks={tasks} addTasks={addTasks}/>
                        </BaseCard>
                    </div>
                </main>
                {/* Sidebar */}
                <aside className="order-first flex flex-col gap-3 w-60">
                    <BaseCard
                        title="Rooms"
                        titleAppend={
                            <BaseButton
                                className="ml-auto"
                                type="secondary"
                                size="xs"
                                onClick={() => setCreateRoomVisible(true)}>Add</BaseButton>
                        }>
                        <Menu className="-mx-3" items={rooms} active={activeRoomId} onSelect={handleSelectRoom}/>
                    </BaseCard>
                    <BaseCard title="Tags">
                        <Tags items={tags}/>
                    </BaseCard>
                </aside>
            </div>
        </div>
    );
}
