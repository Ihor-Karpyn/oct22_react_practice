import React from 'react';
import { Prodact } from '../types/Prodact';
// import { User } from '../types/User';

type Props = {
  products: Prodact[]
  // filterProductsByOwner: (id: number) => number;
};

export const Tabs: React.FC<Props> = ({
  products,
  // filterProductsByOwner
}) => {
  const usersSet = new Set(products.map(product => product.category?.user));
  const users = Array.from(usersSet);

  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
      >
        All
      </a>

      {users.map(user => (
        <a
          data-cy="FilterUser"
          href="#/"
          key={user?.id}
          // onChange={() => filterProductsByOwner(user?.id)}
        >
          {user?.name}
        </a>
      ))}
    </p>
  );
};
