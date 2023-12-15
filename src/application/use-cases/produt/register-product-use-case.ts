import { Product } from '../../../domain/entities/product';
import { ProductRepository } from '../../repositories/product-repository';
import { UseCase } from '../use-case';

interface input {
  name: string;
  costPrice: number;
  salePrice: number;
  stock?: number;
}

interface output {
  product: Product;
}

export class RegisterProductUseCase implements UseCase<input, output> {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(data: input): Promise<output> {
    const product = new Product(data);
    this.productRepository.create(product);

    return {
      product
    };
  }
}
