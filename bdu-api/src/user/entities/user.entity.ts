import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  public id: string;

  @Column({ length: 255 })
  public name: string;

  @Column({ length: 150 })
  public email: string;

  @Column({ length: 14 })
  public cellphone: string;

  @Column({ length: 11 })
  public cpf: string;

  @Column({ length: 32 })
  public password: string;
}
