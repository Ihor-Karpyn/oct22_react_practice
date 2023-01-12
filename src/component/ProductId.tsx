import cn from 'classnames';
import { Product } from '../types/Product';

type Props = {
  product: Product;
};

export const ProductId: React.FC<Props> = ({ product }) => {
  const {
    id,
    name,
    category,
  } = product;

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        { id }
      </td>

      <td data-cy="ProductName">{ name }</td>
      <td data-cy="ProductCategory">
        {category?.icon}
        {' - '}
        {category?.title}
      </td>

      <td
        data-cy="ProductUser"
        className={cn({
          'has-text-link': category.owner.sex === 'm',
          'has-text-danger': category.owner.sex === 'f',
        })}
      >
        { category?.owner.name }
      </td>
    </tr>
  );
};
