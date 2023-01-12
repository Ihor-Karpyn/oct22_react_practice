import { Category } from './Category';
import { User } from './User';
import { Product } from './Product';

export interface FullProduct extends Product {
  user?: User,
  category?: Category,
}
