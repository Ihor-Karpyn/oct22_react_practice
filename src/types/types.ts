export interface User {
  id: number;
  name: string;
  sex: string;
}

export interface Category {
  id: number;
  title: string;
  icon: string;
  ownerId: number;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
}

export interface CategoryFull extends Category {
  owner?: User;
}

export interface ProductFull extends Product {
  category?: CategoryFull;
}
