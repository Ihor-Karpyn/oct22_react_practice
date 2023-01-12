import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';
import { Product } from './types/Product';

function findCategory(categoryId: number) {
  return categoriesFromServer
    .find(category => categoryId === category.id) || categoriesFromServer[0];
}

function findOwner(userId: number) {
  return usersFromServer.find(user => userId === user.id) || usersFromServer[0];
}

const products: Product[] = productsFromServer.map(product => {
  const category = findCategory(product.categoryId);
  const owner = findOwner(category.ownerId);

  return { ...product, category, owner };
});

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const searchTextByQuery = (text: string) => {
    const preparedQuery = query.toLowerCase().trim();

    return text.toLowerCase().includes(preparedQuery);
  };

  const visibleProducts = products.filter(product => {
    const checkUser = userName ? product.owner.name === userName : true;
    const checkCategory = selectedCategories.length
      ? selectedCategories.includes(product.category.title) : true;

    return searchTextByQuery(product.name) && checkUser && checkCategory;
  });

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
                className={classNames({
                  'is-active': !userName,
                })}
                onClick={(event) => {
                  event.preventDefault();
                  setUserName('');
                }}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames({
                    'is-active': userName === user.name,
                  })}
                  onClick={(event: React.BaseSyntheticEvent) => {
                    event.preventDefault();
                    setUserName(event.target.innerText);
                  }}
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
                  onChange={event => setQuery(event.target.value)}
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
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}

              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={classNames('button is-success mr-6 is-outlined')}
                onClick={() => setSelectedCategories([])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={classNames('button mr-2 my-1', {
                    'is-info': selectedCategories.includes(category.title),
                  })}
                  href="#/"
                  onClick={(event: React.BaseSyntheticEvent) => {
                    event.preventDefault();
                    if (selectedCategories.includes(category.title)) {
                      setSelectedCategories(
                        selectedCategories.filter(
                          categoryName => categoryName !== category.title,
                        ),
                      );

                      return;
                    }

                    setSelectedCategories(
                      [...selectedCategories, category.title],
                    );
                  }}
                >
                  {category.title}
                </a>
              ))}

            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setQuery('');
                  setUserName('');
                  setSelectedCategories([]);
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length
            ? (
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
                            <i
                              data-cy="SortIcon"
                              className="fas fa-sort-down"
                            />
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
                  {visibleProducts.map(product => {
                    return (
                      <tr data-cy="Product">
                        <td
                          className="has-text-weight-bold"
                          data-cy="ProductId"
                        >
                          {product.id}
                        </td>

                        <td data-cy="ProductName">{product.name}</td>
                        <td data-cy="ProductCategory">
                          {`${product.category.icon} - ${product.category.title}`}
                        </td>

                        <td
                          data-cy="ProductUser"
                          className={classNames({
                            'has-text-link': product.owner.sex === 'm',
                            'has-text-danger': product.owner.sex === 'f',
                          })}
                        >
                          {product.owner.name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )
            : (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )}

        </div>
      </div>
    </div>
  );
};
