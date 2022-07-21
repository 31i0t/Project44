import { v4 as uuid } from "uuid";
import { db } from "../../../vendors/firebase";

export default async function handler(req, res) {
  const rooms = await db.collection("rooms").get();

  res.send(rooms.docs.map((doc) => doc.data()));
}
