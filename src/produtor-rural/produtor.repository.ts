import { EntityRepository, Repository } from 'typeorm';
import { Produtor } from './produtor.entity';

@EntityRepository(Produtor)
export class ProdutorRepository extends Repository<Produtor> {}
