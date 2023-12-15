import { Product } from '../../../domain/entities/product';
import { ProductRepository } from '../../repositories/product-repository';
import { UseCase } from '../use-case';

interface input {
  name: string;
}

interface output {
  products: Product[];
}

export class FatchProductByNameUseCase implements UseCase<input, output> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: input): Promise<output> {
    const products = await this.productRepository.findManyByName(data.name);

    return {
      products
    };
  }
}
