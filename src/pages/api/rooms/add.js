import { v4 as uuid } from "uuid";
import { db } from "../../../vendors/firebase";

export default async function handler(req, res) {
  const { name } = req.body;

  await db.collection("rooms").doc(uuid()).set({
    name,
  });

  res.send({ message: `Successfully added ${name} to the database!` });
}
