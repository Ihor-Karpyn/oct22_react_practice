export interface User {
  id: number | null;
  name: string;
  sex: string;
}

export interface Category {
  id: number | null;
  title: string;
  icon: string;
  ownerId: number;
}

export interface Product {
  id: number | null;
  name: string;
  categoryId: number | null;
  user?: User;
  category?: Category;
}
