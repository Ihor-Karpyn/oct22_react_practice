import { User } from './User';
import { Category } from './Category';

export interface Product {
  id: number,
  name: string,
  categoryId: number,
}

export interface PreparedProduct extends Product {
  category: Category;
  owner: User;

}
