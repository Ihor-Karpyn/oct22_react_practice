import { Category } from './category';
import { User } from './user';
import { Product } from './product';

export interface PreparedProduct extends Product {
  category: Category,
  user: User;
}
