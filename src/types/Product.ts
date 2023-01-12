import { Category } from './Category';
import { User } from './User';

export interface Product{
  id: number,
  name: string,
  categoryId: number,
}

export interface Prepared extends Product {
  category: Category | null,
  user: User | null,
}
