import { Category } from './Category';
import { Product } from './Product';
import { User } from './User';

export interface TotalProducts extends Product {
  category: Category | null,
  user: User | null,
}
