export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'agent';
}

export interface Property {
  id: string;
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
  owner: User;
  status: 'available' | 'sold' | 'rented';
} 