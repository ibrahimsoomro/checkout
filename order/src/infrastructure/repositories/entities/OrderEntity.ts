import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from './ProductEntity';
import { OrderStatus } from '@application/dto/IOrder';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  public total!: number;

  @ManyToMany(() => ProductEntity, (product) => product.orders, { nullable: false })
  @JoinTable()
  public products!: ProductEntity[];

  @Column({ type: 'varchar', default: 'PENDING', nullable: false })
  public status!: OrderStatus;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
