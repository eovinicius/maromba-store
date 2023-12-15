import { Administrator } from '../../../domain/entities/administrator';
import { PasswordEncoder } from '../../providers/password-encoder';
import { AdministratorRepository } from '../../repositories/administrator-repository';
import { UseCase } from '../use-case';

interface input {
  username: string;
  password: string;
}

interface output {
  administrator: Administrator;
}

export class AuthenticateAdministratorUseCase implements UseCase<input, output> {
  constructor(private readonly administratorRepository: AdministratorRepository, private readonly passwordEncoder: PasswordEncoder) {}

  async execute(data: input): Promise<output> {
    const administrator = await this.administratorRepository.findByUsername(data.username);

    if (!administrator) {
      throw new Error('username or password invalid');
    }

    const passwordIsValid = await this.passwordEncoder.compare(data.password, administrator.password);

    if (!passwordIsValid) {
      throw new Error('username or password invalid');
    }

    if (!administrator.isActivated) {
      throw new Error('administrator is not activated');
    }

    return {
      administrator
    };
  }
}
