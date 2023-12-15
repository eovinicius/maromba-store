import { PasswordEncoder } from '../../providers/password-encoder';
import { AdministratorRepository } from '../../repositories/administrator-repository';
import { UseCase } from '../use-case';
import { Administrator } from './../../../domain/entities/administrator';

interface input {
  username: string;
  password: string;
}

interface output {
  administrator: Administrator;
}

export class RegisterAdministratorUseCase implements UseCase<input, output> {
  constructor(private readonly administratorRepository: AdministratorRepository, private readonly passwordEncoder: PasswordEncoder) {}

  async execute(data: input): Promise<output> {
    const administratorAlreadyExists = await this.administratorRepository.findByUsername(data.username);

    if (administratorAlreadyExists) {
      throw new Error('Administrator already exists');
    }

    const password = await this.passwordEncoder.hash(data.password);

    const administrator = new Administrator({
      username: data.username,
      password
    });

    await this.administratorRepository.create(administrator);

    return { administrator };
  }
}
