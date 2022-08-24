import { v4 as uuid } from "uuid";
import { db, FieldValue } from "../../../vendors/firebase";

const updateRoomCollection = async (inventoryId, roomId) => {
  var roomRef = await db.collection("rooms").doc(roomId);
  var roomData = await roomRef.get().then((r) => r.data());
  // add inventoryId to room
  roomData.inventory.push(inventoryId);
  // update room
  return roomRef.set(roomData);
};

const updateInventoryCollection = async (id, name, roomId) => {
  await db.collection("inventory").doc(id).set({
    name,
    id,
    roomId,
    createdAt: FieldValue.serverTimestamp(),
  });
  return db.collection("inventory").doc(id).get();
};

export default async function handler(req, res) {
  try {
    const { name, roomId } = req.body;
    const inventoryId = uuid();
    await updateRoomCollection(inventoryId, roomId);
    const updatedDoc = await updateInventoryCollection(inventoryId, name, roomId);
    res.status(200).json(updatedDoc.data());
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      error: {
        message: error.message,
      }
    });
  }
}
