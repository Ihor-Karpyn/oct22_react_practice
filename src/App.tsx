import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';
import { ProductItem } from './components/ProductItem/ProductItem';
import { Category } from './types/Category';
import { User } from './types/User';

const productWithCategory = productsFromServer
  .map(product => ({
    ...product,
    category: categoriesFromServer
      .find(category => category.id === product.categoryId) as Category,
  }));

const products = productWithCategory
  .map(product => ({
    ...product,
    owner: usersFromServer
      .find(user => user.id === product.category?.ownerId) as User,
  }));

window.console.log(products);

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [inputText, setInputText] = useState('');

  const resetFilters = () => {
    setSelectedUser('');
    setInputText('');
  };

  let filteredProducts = products;

  if (selectedUser !== '') {
    filteredProducts = filteredProducts
      .filter(product => product.owner?.name === selectedUser);
  }

  if (inputText !== '') {
    filteredProducts = filteredProducts
      .filter(product => product.name.toLowerCase().includes(inputText));
  }

  window.console.log(inputText);

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
                className={cn({
                  'is-active': selectedUser === '',
                })}
                onClick={() => setSelectedUser('')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({
                    'is-active': user.name === selectedUser,
                  })}
                  onClick={() => setSelectedUser(user.name)}
                >
                  { user.name }
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
                  value={inputText}
                  onChange={event => (
                    setInputText(event.target.value.toLowerCase().trim())
                  )}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {inputText !== '' && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setInputText('')}
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

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className="button mr-2 my-1"
                  href="#/"
                >
                  { category.title }
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0 && (
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
              {filteredProducts.map(product => (
                <ProductItem product={product} key={product.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
