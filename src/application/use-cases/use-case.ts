export abstract class UseCase<input, output> {
  abstract execute(data: input): output | Promise<output>;
}
