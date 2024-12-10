export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  services: string[];
  rating: number;
  location: string;
  availability: boolean;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}