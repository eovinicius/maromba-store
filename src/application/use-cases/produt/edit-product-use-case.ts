import { Product } from '../../../domain/entities/product';
import { ProductRepository } from '../../repositories/product-repository';
import { UseCase } from '../use-case';

interface input {
  productId: string;
  name?: string;
  costPrice?: number;
  salePrice?: number;
}

interface output {
  product: Product;
}

export class EditProductUseCase implements UseCase<input, output> {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: input): Promise<output> {
    const product = await this.productRepository.findById(data.productId);

    if (!product) {
      throw new Error('Product not found');
    }

    product.name = data.name ?? product.name;
    product.costPrice = data.costPrice ?? product.costPrice;
    product.salePrice = data.salePrice ?? product.salePrice;

    await this.productRepository.save(product);

    return {
      product
    };
  }
}
