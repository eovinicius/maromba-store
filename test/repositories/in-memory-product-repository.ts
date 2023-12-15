import { ProductRepository } from '../../src/application/repositories/product-repository';
import { PaginationParams } from '../../src/core/repositories/pagination-params';
import { Product } from '../../src/domain/entities/product';

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = [];

  async create(product: Product): Promise<void> {
    this.items.push(product);
  }

  async findById(id: string): Promise<Product | null> {
    const item = this.items.find((item) => item.id.toString() === id);
    return item || null;
  }

  async findMany({ page }: PaginationParams): Promise<Product[]> {
    return this.items.slice((page - 1) * 20, page * 20);
  }

  async findManyByName(name: string): Promise<Product[]> {
    const lowerCaseName = name.toLowerCase();

    return this.items.filter((item) => item.name.toLowerCase().startsWith(lowerCaseName));
  }

  async save(product: Product): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === product.id.toString());
    this.items[itemIndex] = product;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toValue() === id);
    this.items.splice(itemIndex, 1);
  }
}
