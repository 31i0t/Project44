import { db } from "../../../vendors/firebase";

export default async function handler(req, res) {
  try {
    const { id } = req.body;
    await db.collection("tasks").doc(id.toString()).delete();
    res.status(200).json({ message: 'Deleted successfully'});
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
