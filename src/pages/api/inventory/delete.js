import { db } from "../../../vendors/firebase";

const deleteInventoryFromRoom = async (id, roomId) => {
  var roomRef = await db.collection("rooms").doc(roomId);
  var roomData = await roomRef.get().then((r) => r.data());
  const inventory = roomData.inventory || [];
  // remove id from array
  roomData.inventory = inventory.filter(inventoryId => inventoryId !== id);
  // update room
  roomRef.update(roomData);
};

export default async function handler(req, res) {
  const { id, roomId } = req.body;
  await deleteInventoryFromRoom(id, roomId);
  await db.collection("inventory").doc(id).delete();
  res.status(200).end();
}
