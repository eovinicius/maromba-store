import { faker } from '@faker-js/faker';

import { Administrator, AdministratorProps } from '../../src/domain/entities/administrator';
import { UniqueEntityId } from '../../src/core/value-object/unique-entity-id';

export function makeAdministrator(override: Partial<AdministratorProps> = {}, id?: UniqueEntityId) {
  const administrator = new Administrator(
    {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      ...override
    },
    id
  );

  return administrator;
}
