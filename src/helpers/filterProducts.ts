import { ProductFull } from '../types/types';

interface Filters {
  searchQuery: string,
  selectedCategoriesIds: number[],
  selectedUserId: number,
}

export const filterProducts = (products: ProductFull[], filters: Filters) => {
  const {
    selectedUserId,
    selectedCategoriesIds,
    searchQuery,
  } = filters;

  const preparedSearchQuery = searchQuery.toLowerCase();

  return products.filter((product) => {
    const { name } = product;
    const categoryId = product.category?.id || 0;
    const preparedName = name.toLowerCase();

    const isSearchQueryMatch = preparedName.includes(preparedSearchQuery);

    const isUserIdMatch = selectedUserId !== 0
      ? product.category?.owner?.id === selectedUserId
      : true;

    const isCategoriesMatch = selectedCategoriesIds.length
      ? selectedCategoriesIds.includes(categoryId)
      : true;

    return isSearchQueryMatch && isUserIdMatch && isCategoriesMatch;
  });
};
