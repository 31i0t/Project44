import { db } from "../../../vendors/firebase";

const deleteInventoryFromRoom = async (id, { roomId }) => {
  var roomRef = await db.collection("rooms").doc(roomId);
  var roomData = await roomRef.get().then((r) => r.data());
  // remove inventory from room
  const inventory = roomData.inventory || [];
  roomData.inventory = inventory.filter((i) => i.id !== id);
  // update room
  return roomRef.set(roomData);
};

export default async function handler(req, res) {
  const { id, roomId } = req.body;
  await deleteInventoryFromRoom(id, roomId);
  await db.collection("inventory").doc(id).delete();
  res.status(200);
}
