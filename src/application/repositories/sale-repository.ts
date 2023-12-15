import { Sale } from '../../domain/entities/sale';

export abstract class SaleRepository {
  abstract create(sale: Sale): Promise<void>;
  abstract findById(id: string): Promise<Sale | null>;
}
