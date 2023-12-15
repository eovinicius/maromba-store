import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterAdministratorUseCase } from './register-administrator-use-case';
import { FakePasswordEncoder } from '../../../../test/providers/fake-password-encoder';
import { InMemoryAdministratorRepository } from './../../../../test/repositories/in-memory-administrator-repository';
import { AuthenticateAdministratorUseCase } from './authenticate-administrator-use-case';
import { makeAdministrator } from '../../../../test/factories/make-administrator';

let sut: AuthenticateAdministratorUseCase;
let inMemoryAdministratorRepository: InMemoryAdministratorRepository;
let fakeEncoder: FakePasswordEncoder;

describe('authenticate administrator', () => {
  beforeEach(() => {
    fakeEncoder = new FakePasswordEncoder();
    inMemoryAdministratorRepository = new InMemoryAdministratorRepository();
    sut = new AuthenticateAdministratorUseCase(inMemoryAdministratorRepository, fakeEncoder);
  });

  it('should be able to authenticate a administrator', async () => {
    const newAdministrator = makeAdministrator({
      username: 'admin',
      password: await fakeEncoder.hash('admin')
    });
    inMemoryAdministratorRepository.items.push(newAdministrator);

    const { administrator } = await sut.execute({
      username: 'admin',
      password: 'admin'
    });

    expect(administrator).toEqual(newAdministrator);
  });
});
