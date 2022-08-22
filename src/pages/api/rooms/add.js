import { v4 as uuid } from "uuid";
import { db, FieldValue } from "../../../vendors/firebase";

export default async function handler(req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).json({
        error: {
            message: 'Invalid Name',
            status: 400,
        },
      });
    }
    const id = uuid();
    await db.collection("rooms").doc(id).set({
      name,
      id,
      createdAt: FieldValue.serverTimestamp(),
      inventory: [],
    });
    const doc = await db.collection("rooms").doc(id).get();
    res.status(200).json(doc.data());
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      error: {
          message: error.message || 'Internal Server Error',
          status: error.status || 500,
      },
    });
  }
}
