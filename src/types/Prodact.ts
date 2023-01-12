import { Category } from './Category';

export interface Prodact {
  id: number;
  name: string;
  categoryId: number;
  category: Category | null ;
}
