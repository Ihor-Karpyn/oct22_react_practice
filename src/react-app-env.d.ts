/// <reference types="react-scripts" />

export interface Product {
  id: number
  name: string
  categoryId: number
  category: Category | null
}

export interface Category {
  id: number
  title: string
  icon: string
  ownerId: number
  owner: User | null
}

export interface User {
  id: number
  name: string
  sex: string
}
