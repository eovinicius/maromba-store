import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryProductRepository } from '../../../../test/repositories/in-memory-product-repository';
import { makeProduct } from '../../../../test/factories/make-product';
import { FatchProductByNameUseCase } from './fatch-product-by-name-use-case';
import { W } from 'vitest/dist/reporters-OH1c16Kq';

let sut: FatchProductByNameUseCase;
let inMemoryProductRepository: InMemoryProductRepository;

describe('fatch stock product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new FatchProductByNameUseCase(inMemoryProductRepository);
  });

  it('should be able to fatch product by name', async () => {
    const product = makeProduct({
      name: 'whey protein'
    });
    inMemoryProductRepository.items.push(product);

    const { products } = await sut.execute({ name: 'whey protein' });

    expect(products).toEqual([product]);
  });

  it('should be able to identify several products by name', async () => {
    for (let i = 0; i < 3; i++) {
      const product = makeProduct({
        name: 'creatina'
      });
      inMemoryProductRepository.items.push(product);
    }

    const { products } = await sut.execute({ name: 'creatina' });

    expect(products).toHaveLength(3);
  });

  it('should be able to search for a product just by the initial', async () => {
    const product = makeProduct({
      name: 'whey protein'
    });

    inMemoryProductRepository.items.push(product);

    const { products } = await sut.execute({ name: 'w' });

    expect(products).toEqual([product]);
  });
});
