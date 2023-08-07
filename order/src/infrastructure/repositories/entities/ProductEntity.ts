import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { OrderEntity } from './OrderEntity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', nullable: false })
  public name!: string;

  @Column({ type: 'int', nullable: false })
  public price!: number;

  @ManyToMany(() => OrderEntity, (order) => order.products, { nullable: true })
  public orders?: OrderEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
