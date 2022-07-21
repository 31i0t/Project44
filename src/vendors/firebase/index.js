const Firestore = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: "homehub-c2f7c",
  keyFilename: "./firebase_keys.json",
});

export { db };
