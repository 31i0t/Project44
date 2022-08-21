import { db } from "../../../vendors/firebase";

export default async function handler(req, res) {
  const tasks = await db.collection("tasks").orderBy("createdAt", "asc").get();

  res.send(tasks.docs.map((doc) => doc.data()));
}
