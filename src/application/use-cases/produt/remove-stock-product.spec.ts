import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryProductRepository } from '../../../../test/repositories/in-memory-product-repository';
import { RemoveStockProductUseCase } from './remove-stock-product-use-case';
import { makeProduct } from '../../../../test/factories/make-product';
import { UniqueEntityId } from '../../../core/value-object/unique-entity-id';

let sut: RemoveStockProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;

describe('remove stock product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new RemoveStockProductUseCase(inMemoryProductRepository);
  });

  it('should remove product stock with a specific quantity', async () => {
    const newProduct = makeProduct(
      {
        stock: 10
      },
      new UniqueEntityId('1')
    );
    inMemoryProductRepository.items.push(newProduct);

    const { product } = await sut.execute({
      productId: '1',
      quantity: 2
    });

    expect(product.stock).toBe(8);
  });
});
