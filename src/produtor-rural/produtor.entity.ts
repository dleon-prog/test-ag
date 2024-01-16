import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Cultura } from './cultura.entity';

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

  @ManyToMany(() => Cultura)
  @JoinTable()
  culturasPlantadas: Cultura[];
}
