import usersFromServer from '../api/users';
import productsFromServer from '../api/products';
import categoriesFromServer from '../api/categories';

import { FullProduct } from '../types/FullProduct';

export const findCategoryByCategoryId = (categoryId: number) => (
  categoriesFromServer.find(category => category.id === categoryId)
);

export const findUserIdByCategoryId = (categoryId: number): number | null => {
  return categoriesFromServer.find(
    category => category.id === categoryId,
  )?.ownerId || null;
};

export const findUserByUserId = (userId: number | null) => (
  usersFromServer.find(user => user.id === userId)
);

export const getFullProducts = (): FullProduct[] => (
  productsFromServer.map(product => ({
    ...product,
    user: findUserByUserId(findUserIdByCategoryId(product.categoryId)),
    category: findCategoryByCategoryId(product.categoryId),
  }))
);
