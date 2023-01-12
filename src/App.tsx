import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

import { User } from './Types/User';
import { Category } from './Types/Category';
// import { Product } from './Types/Product';

export const App: React.FC = () => {
  function getOwner(ownerId: number): User | null {
    const foundUser = usersFromServer
      .find(user => user.id === ownerId);

    return foundUser || null;
  }

  const categoryWithOwner = categoriesFromServer.map(category => ({
    ...category,
    owner: getOwner(category.ownerId),
  }));

  function getCategory(categoryId: number): Category | null {
    const foundCategory = categoryWithOwner
      .find(category => category.id === categoryId);

    return foundCategory || null;
  }

  const allGoods = productsFromServer.map(product => ({
    ...product,
    category: getCategory(product.categoryId),
  }));

  const [visibleUser, setVisibleUser] = useState(0); //
  const [searchText, setSearchText] = useState('');

  const handleUserSelector = (newUserId: number) => {
    // visibleUser = (newUserId === 0)
    //   ? usersFromServer
    //   : usersFromServer.filter(user => user.id === newUserId);

    setVisibleUser(newUserId);
  };

  const VisibleGoods = allGoods.filter(
    product => {
      const productName = product.name.toLowerCase();
      // const selectedUser = usersFromServer.filter(user => user.id === visibleUser)
      const selectedUser = (visibleUser !== 0)
        ? usersFromServer.filter(user => user.id === visibleUser)
        : usersFromServer;

      return (
        productName.includes(searchText.toLowerCase())
        && selectedUser.includes(product.category?.owner)
      );
    },
  );

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
                className="is-active"
                onClick={() => handleUserSelector(0)}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={cn(
                    { 'is-active': visibleUser === user.id },
                  )}
                  onClick={() => handleUserSelector(user.id)}
                // className="is-active"
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
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
              {VisibleGoods.map(item => (
                <tr data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {item.id}
                  </td>

                  <td data-cy="ProductName">{item.name}</td>
                  <td data-cy="ProductCategory">{`${item.category?.icon}-${item.category?.title}`}</td>
                  {item.category?.owner && (
                    <td
                      data-cy="ProductUser"
                      className={cn(
                        { 'has-text-link': item.category.owner.sex === 'm' },
                        { 'has-text-danger': item.category.owner.sex === 'f' },
                      )}
                    >
                      {item.category.owner.name}
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
