import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA2LFcwu0pO473LB1mKGPRVBzMRFI78KWM",
  authDomain: "homehub-c2f7c.firebaseapp.com",
  projectId: "homehub-c2f7c",
  storageBucket: "homehub-c2f7c.appspot.com",
  messagingSenderId: "572068925125",
  appId: "1:572068925125:web:76732659ef21c7b5a06aac"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)