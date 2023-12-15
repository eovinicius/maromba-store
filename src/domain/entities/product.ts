import { Entity } from '../../core/entities/entity';
import { Optional } from '../../core/types/optional';
import { UniqueEntityId } from '../../core/value-object/unique-entity-id';

export interface ProductProps {
  name: string;
  costPrice: number;
  salePrice: number;
  stock: number;
}

export class Product extends Entity<ProductProps> {
  constructor(props: Optional<ProductProps, 'stock'>, id?: UniqueEntityId) {
    super(
      {
        ...props,
        stock: props.stock ?? 0
      },
      id
    );
  }

  addStock(quantity: number): void {
    this.props.stock += quantity;
  }

  removeStock(quantity: number): void {
    this.props.stock -= quantity;
  }

  get name(): string {
    return this.props.name;
  }

  get costPrice(): number {
    return this.props.costPrice;
  }

  get salePrice(): number {
    return this.props.salePrice;
  }

  get stock(): number {
    return this.props.stock;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set costPrice(costPrice: number) {
    this.props.costPrice = costPrice;
  } 

  set salePrice(salePrice: number) {
    this.props.salePrice = salePrice;
  }
}
