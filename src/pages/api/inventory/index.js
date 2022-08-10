import { db } from "../../../vendors/firebase";

export default async function handler(req, res) {
  const { roomId } = req.query;
  const items = await db.collection("inventory").where('roomId', '==', roomId).get();

  res.send(items.docs.map((doc) => doc.data()));
}
