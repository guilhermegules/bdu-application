import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'account' })
export class BankAccount {
  @PrimaryColumn({ name: 'account_number' })
  public accountNumber: string;

  @Column()
  public balance: number;

  @Column({
    name: 'create_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createDate: Date;

  @Column({ name: 'user_id', type: 'uuid' })
  public userId: string;
}
