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
  try {
    const { id, roomId } = req.body;
    await deleteInventoryFromRoom(id, roomId);
    await db.collection("inventory").doc(id.toString()).delete();
    res.status(200).json({ message: 'Deleted successfully'});
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      error: {
        message: error.message,
      }
    });
  }
}
