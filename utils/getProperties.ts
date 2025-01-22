import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { PropertyListing } from '@/types/property'; // Adjust the path to where your PropertyListing interface is defined

const firebaseConfig = {
  apiKey: 'AIzaSyBht7qNA5kDwKFnnG1HByB6-tCcUedp6Us',
  authDomain: 'assestsng.firebaseapp.com',
  projectId: 'assestsng',
  storageBucket: 'assestsng.firebasestorage.app',
  messagingSenderId: '837337349517',
  appId: '1:837337349517:web:019f319266972021fc11c4',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getProperties(): Promise<PropertyListing[]> {
  const querySnapshot = await getDocs(collection(db, 'properties'));
  const properties = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    // Assuming all fields in Firebase match the PropertyListing interface
    return {
      sellerName: data.sellerName,
      propertyType: data.propertyType,
      propertyDetails: data.propertyDetails,
      price: data.price,
      location: data.location,
      images: data.images,
      email: data.email,
      phoneNumber: data.phoneNumber,
    } as PropertyListing;
  });
  return properties;
}
