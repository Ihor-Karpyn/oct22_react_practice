import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

interface Product {
  id: number,
  name: string,
  categoryId: number,
  category: Category | null,
}

interface Category {
  id: number,
  title: string,
  icon: string,
  ownerId: number,
  owner: User | null,
}

interface User {
  id: number,
  name: string,
  sex: string,
}
function getOwnerById(ownerId: number): User | null {
  return usersFromServer
    .find(owner => ownerId === owner.id) || null;
}

const categories: Category[] = categoriesFromServer.map(category => ({
  ...category,
  owner: getOwnerById(category.ownerId),
}));

function getCategoryById(categoryId: number): Category | null {
  return categories
    .find(category => categoryId === category.id) || null;
}

const products: Product[] = productsFromServer.map(product => ({
  ...product,
  category: getCategoryById(product.categoryId),
}
));

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('All');
  const [query, setQuery] = useState('');

  const selectNewUser = (userName: string) => {
    if (userName !== selectedUser) {
      setSelectedUser(userName);
    }
  };

  let visidleProducts: Product[] = products.filter(product => (
    selectedUser === 'All' || product.category?.owner?.name === selectedUser
  ));

  visidleProducts = visidleProducts.filter(product => {
    const productName = product.name.toLowerCase();

    const normalizedQuery = query
      .split(' ')
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return productName.includes(normalizedQuery);
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearInput = () => {
    setQuery('');
  };

  const clearAll = () => {
    setSelectedUser('All');
    setQuery('');
  };

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
                className={cn(
                  { 'is-active': selectedUser === 'All' },
                )}
                onClick={() => selectNewUser('All')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={cn(
                    { 'is-active': selectedUser === user.name },
                  )}
                  onClick={() => selectNewUser(user.name)}
                >
                  {user.name}
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
                  onChange={handleChange}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={clearInput}
                    />
                  </span>
                )}
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
                onClick={clearAll}

              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">

          {!visidleProducts.length && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

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
              {visidleProducts.map(product => (
                <tr data-cy="Product" key={product.id}>
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {`${product.category?.icon} - ${product.category?.title}`}
                  </td>

                  <td
                    data-cy="ProductUser"
                    className={cn(
                      { 'has-text-link': product.category?.owner?.sex === 'm' },
                      {
                        'has-text-danger': product.category?.owner?.sex === 'f',
                      },
                    )}
                  >
                    {product.category?.owner?.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
