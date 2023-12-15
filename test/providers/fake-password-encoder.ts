import { PasswordEncoder } from '../../src/application/providers/password-encoder';

export class FakePasswordEncoder implements PasswordEncoder {
  async hash(value: string): Promise<string> {
    return value.concat('-hashed');
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return value.concat('-hashed') === hash;
  }
}
