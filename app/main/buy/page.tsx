'use client';

import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
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
import { Building2, MapPin, DollarSign } from 'lucide-react';

interface PropertyListing {
  sellerName: string;
  propertyType: string;
  propertyDetails: string;
  price: string;
  location: string;
  images: string[];
}

const BuyPage = () => {
  const searchParams = useSearchParams();

  const propertyListing: PropertyListing = {
    sellerName: searchParams.get('sellerName') || '',
    propertyType: searchParams.get('propertyType') || '',
    propertyDetails: searchParams.get('propertyDetails') || '',
    price: searchParams.get('price') || '',
    location: searchParams.get('location') || '',
    images: JSON.parse(searchParams.get('images') || '[]'),
  };

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
            {propertyListing.images.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {propertyListing.images.map((url, index) => (
                  <div key={url} className='relative aspect-video'>
                    <Image
                      src={url}
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

          <CardFooter className='flex flex-col items-start gap-2'>
            <h3 className='text-lg font-semibold'>Contact Information</h3>
            <p className='text-gray-600'>
              Listed by: {propertyListing.sellerName}
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default BuyPage;
