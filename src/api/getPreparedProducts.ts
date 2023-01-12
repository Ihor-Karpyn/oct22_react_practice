import { CategoryFull, ProductFull } from '../types/types';
import products from './products';
import categories from './categories';
import users from './users';

const getPreparedCategories = (): CategoryFull[] => {
  return categories.map(category => ({
    ...category,
    owner: users.find(user => user.id === category.ownerId),
  }));
};

export const getPreparedProducts = (): ProductFull[] => {
  const preparedCategories = getPreparedCategories();

  return products.map(product => {
    const category = preparedCategories.find(c => c.id === product.categoryId);

    return {
      ...product,
      category,
    };
  });
};
