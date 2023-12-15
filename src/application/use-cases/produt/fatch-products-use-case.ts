import { Product } from '../../../domain/entities/product';
import { ProductRepository } from '../../repositories/product-repository';
import { UseCase } from '../use-case';

interface input {
  page: number;
}

interface output {
  products: Product[];
}

export class FatchProductsUseCase implements UseCase<input, output> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: input): Promise<output> {
    const products = await this.productRepository.findMany({ page: data.page });

    return {
      products
    };
  }
}
