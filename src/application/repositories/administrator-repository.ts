import { Administrator } from '../../domain/entities/administrator';

export abstract class AdministratorRepository {
  abstract create(administrator: Administrator): Promise<void>;
  abstract findByUsername(email: string): Promise<Administrator | null>;
  abstract findById(id: string): Promise<Administrator | null>;
  abstract save(administrator: Administrator): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
