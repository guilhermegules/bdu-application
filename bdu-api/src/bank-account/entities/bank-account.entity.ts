import { Column, Entity, PrimaryColumn } from 'typeorm';

import { ColumnNumericTransformer } from './../../core/transformers/column-numeric-transformer';

@Entity({ name: 'account' })
export class BankAccount {
  @PrimaryColumn({ name: 'account_number' })
  public accountNumber: string;

  @Column({
    type: 'decimal',
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  public balance: number;

  @Column({
    name: 'create_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createDate: Date;

  @Column({
    name: 'user_id',
    type: 'uuid',
    foreignKeyConstraintName: 'fk_user',
  })
  public userId: string;
}
