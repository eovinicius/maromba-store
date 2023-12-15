import { faker } from '@faker-js/faker';


import { UniqueEntityId } from '../../src/core/value-object/unique-entity-id';
import { Product, ProductProps } from '../../src/domain/entities/product';

export function makeProduct(override: Partial<ProductProps> = {}, id?: UniqueEntityId) {
  const product = new Product(
    {
      name: faker.commerce.productName(),
      costPrice: parseInt(faker.commerce.price()),
      salePrice: parseInt(faker.commerce.price()),
      ...override
    },
    id
  );

  return product;
}
