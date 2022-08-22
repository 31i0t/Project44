import { db } from "../../../vendors/firebase";

const deleteInventory = (id) => db.collection("inventory").doc(id).delete();

export default async function handler(req, res) {
  try {
    const { id } = req.body;
    var roomRef = await db.collection("rooms").doc(id);
    var roomData = await roomRef.get().then((r) => r.data());
    // delete inventory related to this room
    await Promise.all(roomData.inventory.map(deleteInventory));
    // delete room
    await roomRef.delete();
    res.status(200).end();
  }
  catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      error: {
        message: error.message,
      }
    });
  }
}
