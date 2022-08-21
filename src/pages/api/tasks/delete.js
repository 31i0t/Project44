import { db } from "../../../vendors/firebase";

export default async function handler(req, res) {
  try {
    const { id } = req.body;
    await db.collection("tasks").doc(id).delete();
    res.status(200).end();
  }

  catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
