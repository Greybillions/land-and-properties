'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase'; // Firebase import
import { collection, getDocs } from 'firebase/firestore'; // Firebase imports
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, DollarSign, Phone, Mail } from 'lucide-react';

interface PropertyListing {
  sellerName: string;
  propertyType: string;
  propertyDetails: string;
  price: string;
  location: string;
  imageCount: string;
  phoneNumber: string;
  email: string;
  images: string[];
}

const BuyPage = () => {
  const [propertyListing, setPropertyListing] =
    useState<PropertyListing | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, 'properties'));
      const properties = querySnapshot.docs.map((doc) => doc.data());

      // Assuming we only want to display the first property for now
      const selectedProperty = properties[0] as PropertyListing;
      setPropertyListing(selectedProperty);
    };

    fetchProperties();
  }, []);

  if (!propertyListing) {
    return (
      <div className='container mx-auto py-10 px-4 h-[80vh]'>Loading...</div>
    );
  }

  return (
    <main className='container mx-auto py-10 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Property Listings</h1>

        <Card className='w-full'>
          <CardHeader>
            <div className='flex justify-between items-start'>
              <div>
                <CardTitle className='text-2xl mb-2'>
                  {propertyListing.propertyType.charAt(0).toUpperCase() +
                    propertyListing.propertyType.slice(1)}{' '}
                  for Sale
                </CardTitle>
                <CardDescription className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4' />
                  {propertyListing.location}
                </CardDescription>
              </div>
              <Badge variant='secondary' className='flex items-center gap-1'>
                <Building2 className='w-4 h-4' />
                {propertyListing.propertyType.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            {/* Property Images */}
            <div className='relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden'>
              <Image
                src={propertyListing.images[0] || '/public/hero1.jpg'}
                alt='Property'
                fill
                className='object-cover'
                priority
              />
              <div className='absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm'>
                {propertyListing.imageCount} photos
              </div>
            </div>

            {/* Property Details */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>Price</h3>
                <div className='flex items-center text-xl font-bold text-green-600'>
                  <DollarSign className='w-5 h-5' />
                  {Number(propertyListing.price).toLocaleString()}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className='text-lg font-semibold mb-2'>Description</h3>
                <p className='text-gray-600'>
                  {propertyListing.propertyDetails}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className='space-y-2 flex flex-col gap-2 items-start'>
            <h3 className='text-lg font-semibold'>Contact Information</h3>
            <p className='text-gray-600'>
              Listed by: {propertyListing.sellerName}
            </p>
            {propertyListing.phoneNumber && (
              <p className='text-gray-600 flex items-center gap-2'>
                <Phone className='w-4 h-4' /> {propertyListing.phoneNumber}
              </p>
            )}
            {propertyListing.email && (
              <p className='text-gray-600 flex items-center gap-2'>
                <Mail className='w-4 h-4' /> {propertyListing.email}
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default BuyPage;
