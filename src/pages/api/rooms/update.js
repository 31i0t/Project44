import { db } from "../../../vendors/firebase";

export default async function handler(req, res) {
  try {
    const { id, ...rest} = req.body;

    await db.collection("rooms").doc(id).update({
      ...rest
    });
    res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      error: {
        message: error.message,
      }
    });
  }
}
