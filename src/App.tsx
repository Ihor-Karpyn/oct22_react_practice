import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
// import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';
import { Category } from './types/Category';
import { User } from './types/User';
import { Product } from './types/Product';
import products from './api/products';

const getUsersById = (userId: number): User | null => {
  return usersFromServer.find((user) => user.id === userId) || null;
};

const getProducts = (categoryId: number): Product[] => {
  const findProduct = products.filter(
    (product) => product.categoryId === categoryId,
  );

  return findProduct;
};

export const preparedCategories: Category[] = categoriesFromServer.map(
  (category) => ({
    ...category,

    user: getUsersById(category.ownerId),
    products: getProducts(category.id),
  }),
);

export const App: React.FC = () => {
  const [search, setSearch] = useState('');

  const visibleProducts = preparedCategories.filter((product) => product.title
    .toLowerCase().trim().includes(search.toLowerCase().trim()));

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

              <a
                data-cy="FilterUser"
                href="#/"
              >
                User 1
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className="is-active"
              >
                User 2
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
              >
                User 3
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
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

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
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
              {visibleProducts.map((category) => (
                <tr data-cy="Product" key={category.id}>

                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {category.id}
                  </td>

                  <td data-cy="ProductName">{
                    category.products.map(product => product.name)}
                  </td>

                  <td data-cy="ProductCategory">
                    {category.icon}
                    {' '}
                    -
                    {' '}
                    {category.title}
                  </td>

                  {category.user
                    && (
                      <td
                        data-cy="ProductUser"
                        className={classNames('has-text-link')}
                      >
                        {category.user.name}
                      </td>
                    )}

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
