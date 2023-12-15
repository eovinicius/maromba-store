import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryProductRepository } from '../../../../test/repositories/in-memory-product-repository';
import { makeProduct } from '../../../../test/factories/make-product';
import { UniqueEntityId } from '../../../core/value-object/unique-entity-id';
import { EditProductUseCase } from './edit-product-use-case';

let sut: EditProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;

describe('edit product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new EditProductUseCase(inMemoryProductRepository);
  });

  it('should edit product sucessufly', async () => {
    const newProduct = makeProduct({}, new UniqueEntityId('1'));
    inMemoryProductRepository.items.push(newProduct);

    const { product } = await sut.execute({
      name: 'new name',
      costPrice: 10,
      salePrice: 20,
      productId: '1'
    });

    expect(product.name).toBe('new name');
    expect(product.costPrice).toBe(10);
    expect(product.salePrice).toBe(20);
  });
});
