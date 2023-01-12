import React, { useState } from 'react';
import './App.scss';
// import { User, Products, Categories, CategoriesWithProducts } from './types/types';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

const findProductById = (id: number) => (
  productsFromServer.find(el => el.categoryId === id)
);

const categoryWithProducts = categoriesFromServer.map(el => ({
  ...el,
  product: findProductById(el.id),
}));

const findUserWithProducts = (id: number) => (
  categoryWithProducts.find(el => el.ownerId === id)
);
const userWithProducts = usersFromServer.map(el => ({
  ...el,
  category: findUserWithProducts(el.id),
}));

export const App: React.FC = () => {
  // const [users, setUsers] = useState(userWithProducts);
  const [query, setQuery] = useState('');

  let visibleUsers = userWithProducts;

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    visibleUsers = userWithProducts.filter(el => {
      const stringToCheck = `
      ${el.name}
      ${el.category?.title}
      ${el.category?.product?.name}
      `;

      return stringToCheck.toLocaleLowerCase().includes(lowerQuery);
    });
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
              >
                All
              </a>

              {userWithProducts.map(el => (
                <a
                  data-cy="FilterAllUsers"
                  href={el.name}
                  key={el.id}
                >
                  {el.name}
                </a>
              ))}

            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={el => setQuery(el.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              {categoryWithProducts.map(el => (
                <a
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href={el.title}
                  key={el.id}
                >
                  {el.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"

              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {
                visibleUsers.map(el => (
                  <tr data-cy="Product" key={el.id}>
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {el.category?.id}
                    </td>
                    <td data-cy="ProductName">
                      {el.category?.product?.name}
                    </td>
                    <td data-cy="ProductCategory">
                      {el.category?.icon}
                      -
                      {el.category?.title}
                    </td>
                    <td
                      data-cy="ProductUser"
                      className="has-text-link"
                    >
                      {el.name}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
