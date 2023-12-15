import { error } from 'console';
import { ProductRepository } from '../../repositories/product-repository';
import { UseCase } from '../use-case';

interface input {
  productId: string;
}
interface output {}

export class DeleteProductUseCase implements UseCase<input, output> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: input): Promise<output> {
    const product = await this.productRepository.findById(data.productId);

    if (!product) {
      throw new Error('product alreary exists');
    }

    await this.productRepository.delete(data.productId);

    return {};
  }
}
