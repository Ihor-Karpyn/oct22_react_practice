import { Product } from '../types/Product';

type Props = {
  products: Product[],
};

export const ProductList: React.FC<Props> = ({ products }) => (
  <div className="box table-container">
    {products.length === 0
      ? (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      )
      : (
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
            {products.map(product => (
              <tr data-cy="Product" key={product.id}>
                <td className="has-text-weight-bold" data-cy="ProductId">
                  {product.id}
                </td>

                <td data-cy="ProductName">{product.name}</td>
                {product.category && (
                  <td data-cy="ProductCategory">
                    {`${product.category.icon} - ${product.category.title}`}
                  </td>
                )}
                {product.category?.user && (
                  <td
                    data-cy="ProductUser"
                    className={`${product.category.user.sex === 'm'
                      ? 'has-text-link'
                      : 'has-text-danger'
                    }`}
                  >
                    {product.category.user.name}
                  </td>
                )}

              </tr>
            ))}
          </tbody>
        </table>
      )}
  </div>
);
