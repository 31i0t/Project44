import { db } from "../../../vendors/firebase";

// const deleteInventory = (id) => db.collection("inventory").doc(id).delete();

// export default async function handler(req, res) {
//   const { id } = req.body;
//   var roomRef = await db.collection("rooms").doc(id);
//   var roomData = await roomRef.get().then((r) => r.data());
//   console.log('ROOM DATA', roomData);
//   // delete room inventory
//  // await Promise.all(roomData.inventory.map(deleteInventory));
//   // delete room
//   await roomRef.delete();
//   res.status(200);
// }

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    await db.collection("rooms").doc(id).delete();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=180000');
    res.end();
  }

  catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
