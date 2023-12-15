import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryProductRepository } from '../../../../test/repositories/in-memory-product-repository';
import { RegisterProductUseCase } from './register-product-use-case';

let sut: RegisterProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;

describe('register product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new RegisterProductUseCase(inMemoryProductRepository);
  });

  it('should register an product sucessufly', async () => {
    const { product } = await sut.execute({
      name: 'any_name',
      costPrice: 100.0,
      salePrice: 120.0
    });

    expect(product.id).toBeDefined();
    expect(product.stock).toBe(0);
    expect(inMemoryProductRepository.items[0]).toEqual(product);
  });

  it('should register a product by defining an initial stock', async () => {
    const { product } = await sut.execute({
      name: 'any_name',
      costPrice: 100.0,
      salePrice: 120.0,
      stock: 50
    });

    expect(product.id).toBeDefined();
    expect(product.stock).toBe(50);
    expect(inMemoryProductRepository.items[0]).toEqual(product);
  });
});
