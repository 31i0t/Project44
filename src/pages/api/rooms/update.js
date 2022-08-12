import { db } from "../../../vendors/firebase";

export default async function handler(req, res) {
  const { id, ...rest} = req.body;
  await db.collection("rooms").doc(id).update({
    ...rest
  });
  res.status(200);
}
