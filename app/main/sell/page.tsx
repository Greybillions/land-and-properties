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

// Form validation schema
const formSchema = z.object({
  sellerName: z.string().min(2, 'Name must be at least 2 characters'),
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
      propertyType: '',
      propertyDetails: '',
      price: '',
      location: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImages(e.target.files);

      // Create preview URLs
      const newPreviews = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      // Clean up old preview URLs before setting new ones
      previews.forEach((url) => URL.revokeObjectURL(url));
      setPreviews(newPreviews);
    }
  };

  // Cleanup preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const removeImage = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    URL.revokeObjectURL(previews[index]);
    setPreviews(newPreviews);

    // Convert FileList to array, remove item, and create new FileList
    if (images) {
      const dt = new DataTransfer();
      const files = Array.from(images);
      files.splice(index, 1);
      files.forEach((file) => dt.items.add(file));
      setImages(dt.files);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const imageCount = images ? images.length : 0;
    const searchParams = new URLSearchParams({
      ...values,
      imageCount: String(imageCount),
    }).toString();
    router.push(`/main/buy?${searchParams}`);
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

                {/* Image Preview Section */}
                {previews.length > 0 && (
                  <div className='mt-4'>
                    <p className='text-sm text-gray-500 mb-2'>Preview:</p>
                    <div className='flex flex-wrap gap-2'>
                      {previews.map((preview, index) => (
                        <div key={preview} className='relative'>
                          <Image
                            width={100}
                            height={100}
                            src={preview}
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
