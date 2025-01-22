'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { getProperties } from '@/utils/getProperties';

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
import { Building2, MapPin, DollarSign, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

// Update PropertyContent to accept property as a prop
function PropertyContent({ property }: { property: PropertyListing }) {
  const propertyListing = property;

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
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [visibleProperties, setVisibleProperties] = useState<PropertyListing[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProperties();
      setProperties(data);
      setVisibleProperties(data.slice(0, 4)); // Only show first 4 on load
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='text-center flex justify-center items-center w-full h-[80vh]'>
        <Loader2 className='h-12 w-12 animate-spin' />
      </div>
    );
  }

  const handleShowMore = () => {
    const newVisibleCount = visibleProperties.length + 4;
    setVisibleProperties(properties.slice(0, newVisibleCount));
  };

  const canShowMore = visibleProperties.length < properties.length;

  // Check if no properties were fetched
  if (properties.length === 0) {
    return (
      <main className='container max-w-[1400px] h-[80vh] mx-auto md:py-10 py-3 px-4 text-center'>
        <h1 className='text-3xl font-bold mb-6'>No Properties Listed</h1>
        <p className='text-lg mb-4'>
          Looks like there are no properties available right now.
        </p>
        <Link href='/main/sell'>
          <Button className='text-white'>List Your Property</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className='container max-w-[1400px] mx-auto md:py-10 py-3 px-4'>
      <h1 className='text-3xl font-bold mb-6'>Property Listings</h1>
      <div className='mx-auto flex flex-col md:flex-row flex-wrap gap-10'>
        {visibleProperties.map((property, index) => (
          <Suspense
            fallback={<div>Loading property...</div>}
            key={property.sellerName + index}
          >
            <PropertyContent property={property} />
          </Suspense>
        ))}
      </div>

      {canShowMore && (
        <div className='flex justify-center mt-6 text-white'>
          <Button onClick={handleShowMore}>Show More</Button>
        </div>
      )}
    </main>
  );
};

export const dynamic = 'force-dynamic';

export default BuyPage;
