import type { NextApiRequest, NextApiResponse } from 'next';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PropertyListing } from '@/types/property';

type ResponseData = { message: string; id?: string } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const {
      sellerName,
      email,
      phoneNumber,
      propertyType,
      propertyDetails,
      price,
      location,
      images,
    }: PropertyListing = req.body;

    try {
      // Upload images to Firebase Storage
      const imageUrls: string[] = [];
      for (const image of images) {
        const buffer = Buffer.from(image, 'base64'); // Assuming images are Base64 strings
        const storageRef = ref(
          storage,
          `properties/${Date.now()}-${Math.random()}.jpg`
        );
        await uploadBytes(storageRef, buffer);
        const downloadURL = await getDownloadURL(storageRef);
        imageUrls.push(downloadURL);
      }

      // Save property details to Firestore
      const docRef = await addDoc(collection(db, 'properties'), {
        sellerName,
        email,
        phoneNumber,
        propertyType,
        propertyDetails,
        price,
        location,
        images: imageUrls,
        createdAt: new Date(),
      });

      res
        .status(201)
        .json({ id: docRef.id, message: 'Property added successfully' });
    } catch (error) {
      console.error('Error adding property:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
