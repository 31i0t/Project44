import { db } from "../../../vendors/firebase";

export default async function handler(req, res) {
  const { id } = req.body;

  await db.collection("inventory").doc(id).delete();
  res.status(200);
}
