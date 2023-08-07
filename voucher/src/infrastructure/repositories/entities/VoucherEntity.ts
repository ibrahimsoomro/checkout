import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity("vouchers")
@Index(["code"], { unique: true })
export class VoucherEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int", unique: true, nullable: false })
  public orderId!: number;

  @Column({ type: "varchar", nullable: false })
  public code!: string;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
  public amount!: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
