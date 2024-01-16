import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cultura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

}
