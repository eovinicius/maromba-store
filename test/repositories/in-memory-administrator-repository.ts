import { AdministratorRepository } from '../../src/application/repositories/administrator-repository';
import { Administrator } from '../../src/domain/entities/administrator';

export class InMemoryAdministratorRepository implements AdministratorRepository {
  public items: Administrator[] = [];

  async create(administrator: Administrator): Promise<void> {
    this.items.push(administrator);
  }

  async findByUsername(username: string): Promise<Administrator | null> {
    const item = this.items.find((item) => item.username === username);
    return item || null;
  }

  async findById(id: string): Promise<Administrator | null> {
    const item = this.items.find((item) => item.id.toString() === id);
    return item || null;
  }

  async save(administrator: Administrator): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === administrator.id.toString());
    this.items[itemIndex] = administrator;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);
    this.items.splice(itemIndex, 1);
  }
}
