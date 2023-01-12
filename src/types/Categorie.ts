import { Product } from './Product';
import { User } from './User';

export interface Category {
  id: number;
  title: string;
  icon: string;
  ownerId: number;
  user: User | null;
  products: Product[];
}
