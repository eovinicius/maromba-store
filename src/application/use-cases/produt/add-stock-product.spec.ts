import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryProductRepository } from '../../../../test/repositories/in-memory-product-repository';
import { AddStockProductUseCase } from './add-stock-product-use-case';
import { makeProduct } from '../../../../test/factories/make-product';
import { UniqueEntityId } from '../../../core/value-object/unique-entity-id';

let sut: AddStockProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;

describe('add stock product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new AddStockProductUseCase(inMemoryProductRepository);
  });

  it('should increase product stock with a specific quantity', async () => {
    const newProduct = makeProduct({}, new UniqueEntityId('1'));
    inMemoryProductRepository.items.push(newProduct);

    const { product } = await sut.execute({
      productId: '1',
      quantity: 10
    });

    expect(product.stock).toBe(10);
  });
});
