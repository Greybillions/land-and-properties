'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, DollarSign } from 'lucide-react';

interface PropertyListing {
  sellerName: string;
  propertyType: string;
  propertyDetails: string;
  price: string;
  location: string;
  images: string[];
  email: string;
  phoneNumber: string;
}

function PropertyContent() {
  const searchParams = useSearchParams();

  const propertyListing: PropertyListing = {
    sellerName: searchParams.get('sellerName') || '',
    propertyType: searchParams.get('propertyType') || '',
    propertyDetails: searchParams.get('propertyDetails') || '',
    price: searchParams.get('price') || '',
    location: searchParams.get('location') || '',
    images: JSON.parse(searchParams.get('images') || '[]'),
    email: searchParams.get('email') || '',
    phoneNumber: searchParams.get('phoneNumber') || '',
  };

  return (
    <Card className='md:w-[400px] w-[100%]'>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <div>
            <CardTitle className='text-2xl mb-2'>
              {propertyListing.propertyType.charAt(0).toUpperCase() +
                propertyListing.propertyType.slice(1)}{' '}
              For Sale
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
        {propertyListing.images.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {propertyListing.images.map((url, index) => (
              <div key={url} className='relative aspect-video'>
                <Image
                  src={url || '/placeholder.svg'}
                  alt={`Property image ${index + 1}`}
                  fill
                  className='object-cover rounded-lg'
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='relative w-full aspect-video bg-gray-100 rounded-lg'>
            <Image
              src='/api/placeholder/800/400'
              alt='Property'
              fill
              className='object-cover rounded-lg'
              priority
            />
          </div>
        )}

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
            <p className='text-gray-600'>{propertyListing.propertyDetails}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className='flex flex-col items-start gap-2'>
        <h3 className='text-lg font-semibold'>Contact Information</h3>
        <div className='space-y-1 text-gray-600'>
          <p>Listed by: {propertyListing.sellerName}</p>
          <p>Email: {propertyListing.email}</p>
          <p>Phone: {propertyListing.phoneNumber}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

const BuyPage = () => {
  return (
    <main className='container max-w-[1400px] mx-auto py-10 px-4'>
      <h1 className='text-3xl font-bold mb-6'>Property Listings</h1>
      <div className='mx-auto flex flex-col md:flex-row flex-wrap gap-10'>
        {[...Array(9)].map((_, index) => (
          <Suspense fallback={<div>Loading property...</div>} key={index}>
            <PropertyContent />
          </Suspense>
        ))}
      </div>
    </main>
  );
};

export const dynamic = 'force-dynamic';

export default BuyPage;
