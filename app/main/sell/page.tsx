'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { compressImage } from '@/utils/imageCompression';

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

// Form validation schema
const formSchema = z.object({
  sellerName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only numbers'),
  propertyType: z.string().min(1, 'Please select a property type'),
  propertyDetails: z.string().min(10, 'Please provide more details'),
  price: z.string().min(1, 'Price is required'),
  location: z.string().min(1, 'Location is required'),
});

const SellPropertyPage = () => {
  const router = useRouter();
  const [images, setImages] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sellerName: '',
      email: '',
      phoneNumber: '',
      propertyType: '',
      propertyDetails: '',
      price: '',
      location: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImages(e.target.files);

      const newPreviews = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      previews.forEach((url) => URL.revokeObjectURL(url));
      setPreviews(newPreviews);
    }
  };

  React.useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const removeImage = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    URL.revokeObjectURL(previews[index]);
    setPreviews(newPreviews);

    if (images) {
      const dt = new DataTransfer();
      const files = Array.from(images);
      files.splice(index, 1);
      files.forEach((file) => dt.items.add(file));
      setImages(dt.files);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!images || images.length === 0) {
      alert('Please upload at least one image.');
      return;
    }

    try {
      // Compress and convert images to Base64
      const compressedImages = await Promise.all(
        Array.from(images).map(compressImage)
      );
      let totalSize = 0;
      const imageBase64Array: string[] = [];

      for (const image of compressedImages) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });

        const sizeInBytes = new Blob([base64]).size;
        if (totalSize + sizeInBytes > 5 * 1024 * 1024) {
          // 5MB limit
          alert(
            'Total image size exceeds 5MB. Please reduce the number or size of images.'
          );
          return;
        }

        totalSize += sizeInBytes;
        imageBase64Array.push(base64);
      }

      const payload = {
        ...values,
        images: imageBase64Array,
        createdAt: new Date(),
      };

      // Send data directly to Firebase
      const docRef = await addDoc(collection(db, 'properties'), payload);

      alert('Property added successfully. ID: ' + docRef.id);
      router.push('/main/buy'); // Redirect to another page if needed
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <main className='container mx-auto py-10 px-4'>
      <Card className='max-w-2xl mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>
            Sell Your Property
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='sellerName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seller Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Enter your email address'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type='tel'
                        placeholder='Enter your phone number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='propertyType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select property type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='land'>Land</SelectItem>
                        <SelectItem value='house'>House</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='propertyDetails'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter details about the property'
                        className='min-h-32'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (USD)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter the price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter the location of the property'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Upload Images</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='image/*'
                    multiple
                    onChange={handleFileChange}
                    className='file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-primary/90'
                  />
                </FormControl>
                <FormMessage />

                {previews.length > 0 && (
                  <div className='mt-4'>
                    <p className='text-sm text-gray-500 mb-2'>Preview:</p>
                    <div className='flex flex-wrap gap-2'>
                      {previews.map((preview, index) => (
                        <div key={preview} className='relative'>
                          <Image
                            width={100}
                            height={100}
                            src={preview || '/placeholder.svg'}
                            alt={`Preview ${index + 1}`}
                            className='w-24 h-24 object-cover rounded-lg'
                          />
                          <button
                            type='button'
                            onClick={() => removeImage(index)}
                            className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600'
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </FormItem>

              <Button type='submit' className='w-full text-white'>
                Submit Property for Sale
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default SellPropertyPage;
