export interface User{
  id: number,
  name: string,
  sex: string,
}

export interface Products {
  id: number,
  name: string
  categoryId: number,
}

export interface Categories {
  id: number,
  title: string,
  icon: string,
  ownerId: number,
}

export interface CategoriesWithProducts extends Categories {
  product: Products,
}