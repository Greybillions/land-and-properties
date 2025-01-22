export interface PropertyListing {
  id?: string; // Optional for Firestore auto-generated IDs
  sellerName: string;
  email: string;
  phoneNumber: string;
  propertyType: string;
  propertyDetails: string;
  price: string;
  imageCount: string;
  location: string;
  images: string[]; // Array of image URLs
  createdAt?: Date; // Optional for auto-generated timestamps
}
