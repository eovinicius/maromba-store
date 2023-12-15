import { Entity } from '../../core/entities/entity';
import { Optional } from '../../core/types/optional';
import { UniqueEntityId } from '../../core/value-object/unique-entity-id';
import { Product } from './product';

export interface SaleProps {
  products: Product[];
  totalPrice: number;
  saleDate: Date;
}

export class Sale extends Entity<SaleProps> {
  constructor(props: Optional<SaleProps, 'saleDate'>, id?: UniqueEntityId) {
    super({
      ...props,
      totalPrice: 0,
      saleDate: props.saleDate ?? new Date(),
    }, id);

    this.calculateTotalPrice();
  }

  private calculateTotalPrice() {
    this.props.totalPrice = this.products.reduce((total, product) => total + product.salePrice, 0);
  }

  get products(): Product[] {
    return this.props.products;
  }

  get totalPrice(): number {
    return this.props.totalPrice;
  }

  get saleDate(): Date {
    return this.props.saleDate;
  }
}