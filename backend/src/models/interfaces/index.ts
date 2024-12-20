import type { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'agent';
  isVerified: boolean;
  comparePassword(password: string): Promise<boolean>;
}

export interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  owner: IUser['_id'];
  status: 'available' | 'sold' | 'rented';
} 