import { v4 as uuid } from "uuid";
import { db } from "../../../vendors/firebase";

export default async function handler(req, res) {
  const { name } = req.body;

  const id = uuid();
  await db.collection("rooms").doc(id).set({
    name,
    id,
  });

  res.send({ message: `Successfully added ${name} to the database!` });
}
