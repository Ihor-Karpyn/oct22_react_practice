import { Category } from './Category';
import { User } from './User';

export interface FinalProduct {
  id: number;
  name: string;
  categoryId: number;
  category: Category | null;
  owner: User | null;
}
