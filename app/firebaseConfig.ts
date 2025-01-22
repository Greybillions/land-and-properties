import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBht7qNA5kDwKFnnG1HByB6-tCcUedp6Us',
  authDomain: 'assestsng.firebaseapp.com',
  projectId: 'assestsng',
  storageBucket: 'assestsng.firebasestorage.app',
  messagingSenderId: '837337349517',
  appId: '1:837337349517:web:019f319266972021fc11c4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
