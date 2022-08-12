import { db } from "../../../vendors/firebase";

export default async function handler(req, res) {
  const { id, name, roomId, description, fields } = req.body;

  await db.collection("inventory").doc(id).set({
    name, roomId, description, fields
  });
  res.status(200);
}
