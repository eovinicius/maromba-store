import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterAdministratorUseCase } from './register-administrator-use-case';
import { FakePasswordEncoder } from '../../../../test/providers/fake-password-encoder';
import { InMemoryAdministratorRepository } from './../../../../test/repositories/in-memory-administrator-repository';

let sut: RegisterAdministratorUseCase;
let inMemoryAdministratorRepository: InMemoryAdministratorRepository;
let fakeEncoder: FakePasswordEncoder;

describe('register administrator', () => {
  beforeEach(() => {
    fakeEncoder = new FakePasswordEncoder();
    inMemoryAdministratorRepository = new InMemoryAdministratorRepository();
    sut = new RegisterAdministratorUseCase(inMemoryAdministratorRepository, fakeEncoder);
  });

  it('should register an administrator sucessufly', async () => {
    const { administrator } = await sut.execute({
      username: 'admin',
      password: 'admin'
    });

    expect(administrator.id).toBeDefined();
    expect(inMemoryAdministratorRepository.items[0]).toEqual(administrator);
  });
});
