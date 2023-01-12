export interface Categories {
  id: number,
  title: string,
  icon: string,
  ownerId: number,
}

export interface Users {
  id: number,
  name: string,
  sex: string,
}

export interface Products {
  id: number,
  name: string,
  categoryId: number,
}

export interface FullProducts extends Products {
  category?: Categories,
  owner?: Users,
}
