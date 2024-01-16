import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produtor } from './produtor.entity';
import { ValidationService } from '../shared/validation.service';
import { Cultura } from './cultura.entity';

@Injectable()
export class ProdutorService {
  constructor(
    @InjectRepository(Produtor)
    private produtorRepository: Repository<Produtor>,
    private validacaoService: ValidationService,
  ) {}

  async findAll(): Promise<Produtor[]> {
    return await this.produtorRepository.find();
  }

  async findById(id: number): Promise<Produtor> {
    const produtor = await this.produtorRepository.findOneBy({ id: id });
    if (!produtor) {
      throw new NotFoundException('Produtor não encontrado');
    }
    return produtor;
  }

  async create(
    produtorData: Partial<Produtor>,
    culturasPlantadas: Cultura[],
  ): Promise<Produtor> {
    const {
      cpfCnpj,
      areaTotalHectares,
      areaAgricultavelHectares,
      areaUrbanizadaHectares,
    } = produtorData;

    if (cpfCnpj) {
      if (
        cpfCnpj.length === 11 &&
        !this.validacaoService.validateCpf(cpfCnpj)
      ) {
        throw new NotFoundException('CPF inválido');
      } else if (
        cpfCnpj.length === 14 &&
        !this.validacaoService.validateCnpj(cpfCnpj)
      ) {
        throw new NotFoundException('CNPJ inválido');
      }
    }

    if (
      areaTotalHectares &&
      areaAgricultavelHectares &&
      areaUrbanizadaHectares
    ) {
      const somaAreaAgricultavelUrbanizada =
        areaAgricultavelHectares + areaUrbanizadaHectares;

      if (somaAreaAgricultavelUrbanizada > areaTotalHectares) {
        throw new NotFoundException(
          'A soma da área agrícola e urbanizada não pode ser maior que a área total da fazenda',
        );
      }
    }

    const produtor = this.produtorRepository.create({
      ...produtorData,
      culturasPlantadas,
    });
    return await this.produtorRepository.save(produtor);
  }

  async update(id: number, produtorData: Partial<Produtor>): Promise<Produtor> {
    await this.produtorRepository.update(id, produtorData);
    return await this.produtorRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.produtorRepository.delete(id);
  }

  async getTotalFazendas(): Promise<number> {
    return this.produtorRepository.count();
  }

  async getTotalArea(): Promise<number> {
    const fazendas = await this.produtorRepository.find();
    return fazendas.reduce(
      (total, fazenda) => total + fazenda.areaTotalHectares,
      0,
    );
  }
}
