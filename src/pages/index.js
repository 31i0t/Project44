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
import { useState, useCallback, useEffect } from "react";
import { useStore } from "../store";



export default function Home() {
  const [tags, setTags] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const rooms = useStore((state) => state.rooms);
  const setRooms = useStore((state) => state.setRooms);
  const setCreateRoomVisible = useStore((state) => state.setCreateRoomVisible);

  const activeRoomId = useStore((state) => state.activeRoomId);
  const setActiveRoomId = useStore((state) => state.setActiveRoomId);

  const setAllRooms = async () => {
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
    <div className="min-h-screen flex flex-col">
      <CreateRoomModal />
      <CreateInventoryModal />
      <Head>
        <title>Estatelaza</title>
        <meta name="description" content="put some cool description here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-1">
        {/* Main screen */}
        <main className="flex flex-1">
          <div className="w-1/2 p-5 border-l border-gray-100">
            { !loadingRooms && rooms.length === 0 && <p className="text-center">You haven&apos;t created any room yet</p> }
            { rooms.length > 0 && <InventoryList />}
          </div>
          <div className="w-1/2 p-5 bg-white border-l border-gray-100">
            <InventoryDetail />
          </div>
        </main>
        {/* Sidebar */}
        <aside className="order-first bg-white w-60">
          <div className="p-2 border-b border-gray-100">User info</div>
          <BaseTitle onAdd={() => setCreateRoomVisible(true)} label="Rooms" classes={["pl-2"]} />
          <Menu items={rooms} active={activeRoomId} onSelect={setActiveRoomId} />
          <Title label="Tags" classes={["pl-2"]} />
          <Tags items={tags} />
        </aside>
      </div>
    </div>
  );
}
