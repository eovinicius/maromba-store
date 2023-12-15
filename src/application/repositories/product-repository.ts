import { PaginationParams } from '../../core/repositories/pagination-params';
import { Product } from '../../domain/entities/product';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findMany(params: PaginationParams): Promise<Product[]>;
  abstract save(product: Product): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
