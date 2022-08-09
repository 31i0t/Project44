import { db } from "../../../vendors/firebase";

export default async function handler(req, res) {
  const rooms = await db.collection("rooms").orderBy("createdAt", "asc").get();

  res.send(rooms.docs.map((doc) => doc.data()));
}
