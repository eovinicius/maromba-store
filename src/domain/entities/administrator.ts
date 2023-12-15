import { Entity } from '../../core/entities/entity';
import { Optional } from '../../core/types/optional';
import { UniqueEntityId } from '../../core/value-object/unique-entity-id';

export interface AdministratorProps {
  username: string;
  password: string;
  isActivated: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export class Administrator extends Entity<AdministratorProps> {
  constructor(props: Optional<AdministratorProps, 'isActivated' | 'createdAt'>, id?: UniqueEntityId) {
    super(
      {
        ...props,
        isActivated: props.isActivated ?? true,
        createdAt: props.createdAt ?? new Date()
      },
      id
    );
  }

  activate(): void {
    this.props.isActivated = true;

    this.toTouch();
  }

  deactivate(): void {
    this.props.isActivated = false;
    this.toTouch();
  }

  toTouch() {
    this.props.updatedAt = new Date();
  }

  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  get isActivated(): boolean {
    return this.props.isActivated;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
