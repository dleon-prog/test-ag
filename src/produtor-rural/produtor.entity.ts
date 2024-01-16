import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produtor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cpfCnpj: string;

  @Column()
  nomeProdutor: string;

  @Column()
  nomeFazenda: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  areaTotalHectares: number;

  @Column()
  areaAgricultavelHectares: number;

  @Column()
  areaVegetacaoHectares: number;

  @Column()
  areaUrbanizadaHectares: number;
}
