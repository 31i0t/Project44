import { v4 as uuid } from "uuid";
import { db, FieldValue } from "../../../vendors/firebase";

export default async function handler(req, res) {
  try {
    const { name } = req.body;

    const id = uuid();
    await db.collection("tasks").doc(id).set({
      name,
      id,
      createdAt: FieldValue.serverTimestamp(),
      done: false,
    });
    const doc = await db.collection("tasks").doc(id).get();
    res.status(200).json(doc.data());
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      error: {
        message: error.message,
      }
    });
  }
}
