import { Product } from '../../../domain/entities/product';
import { ProductRepository } from '../../repositories/product-repository';
import { UseCase } from '../use-case';

interface input {
  productId: string;
  quantity: number;
}

interface output {
  product: Product;
}

export class AddStockProductUseCase implements UseCase<input, output> {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(data: input): Promise<output> {
    const product = await this.productRepository.findById(data.productId);

    if (!product) {
      throw new Error('Product not found');
    }

    product.addStock(data.quantity);

    this.productRepository.save(product);

    return {
      product
    };
  }
}
