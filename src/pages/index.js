import Head from "next/head";
import Tags from "../components/Tags";
import Title from "../components/Title";
import Menu from "../components/Menu";
import InventoryList from "../components/InventoryList";
import InventoryDetail from "../components/InventoryDetail";

import roomRepository from "../services/roomRepository";
import tagRepository from "../services/tagRepository";
import inventoryRepository from "../services/inventoryRepository";

import { useState } from "react";

export default function Home() {
  // mock response from API
  const [rooms, setRooms] = useState([]);
  const [tags, setTags] = useState([]);
  const [inventory, setInventory] = useState([]);

  roomRepository.all().then((response) => {
    setRooms(response.data);
  });

  tagRepository.all().then((response) => {
    setTags(response.data);
  });

  inventoryRepository.all().then((response) => {
    setInventory(response.data);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Estatelaza</title>
        <meta name="description" content="put some cool description here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-1">
        {/* Main screen */}
        <main className="flex flex-1">
          <div className="w-1/2 p-5 border-l border-gray-100">
            <Title label="Inventory" add={true} classes={["pl-2"]} />
            <InventoryList items={inventory} />
          </div>
          <div className="w-1/2 p-5 bg-white border-l border-gray-100">
            <InventoryDetail />
          </div>
        </main>
        {/* Sidebar */}
        <aside className="order-first bg-white w-60">
          <div className="p-2 border-b border-gray-100">User info</div>
          <Title add={true} label="Rooms" classes={["pl-2"]} />
          <Menu items={rooms} />
          <Title label="Tags" classes={["pl-2"]} />
          <Tags items={tags} />
        </aside>
      </div>
    </div>
  );
}
