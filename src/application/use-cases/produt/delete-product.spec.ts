import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryProductRepository } from '../../../../test/repositories/in-memory-product-repository';
import { makeProduct } from '../../../../test/factories/make-product';
import { UniqueEntityId } from '../../../core/value-object/unique-entity-id';
import { DeleteProductUseCase } from './delete-product-use-case';

let sut: DeleteProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;

describe('delete product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new DeleteProductUseCase(inMemoryProductRepository);
  });

  it('should delete product by id', async () => {
    const newProduct = makeProduct({}, new UniqueEntityId('1'));
    inMemoryProductRepository.items.push(newProduct);

    await sut.execute({
      productId: '1'
    });

    expect(inMemoryProductRepository.items).toHaveLength(0);
  });
});
