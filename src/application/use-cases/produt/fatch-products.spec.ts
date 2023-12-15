import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryProductRepository } from '../../../../test/repositories/in-memory-product-repository';
import { FatchProductsUseCase } from './fatch-products-use-case';
import { makeProduct } from '../../../../test/factories/make-product';

let sut: FatchProductsUseCase;
let inMemoryProductRepository: InMemoryProductRepository;

describe('fatch stock product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new FatchProductsUseCase(inMemoryProductRepository);
  });

  it('should be able to fatch products', async () => {
    const { products } = await sut.execute({ page: 1 });

    expect(products).toEqual([]);
  });

  it('should be able to fatch paginated products', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryProductRepository.items.push(makeProduct());
    }

    const { products } = await sut.execute({ page: 2 });

    expect(products).toHaveLength(2);
  });
});
