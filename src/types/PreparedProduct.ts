import { Category } from './Category';
import { Product } from './Product';
import { User } from './User';

export interface PreparedProduct extends Product {
  category?: Category,
  owner?: User,
}
