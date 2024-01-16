import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProdutorService } from './produtor.service';
import { Produtor } from './produtor.entity';
import { Cultura } from './cultura.entity';

@Controller('produtor')
export class ProdutorController {
  constructor(private readonly produtorService: ProdutorService) {}

  @Post()
  async create(@Body() produtorData: Partial<Produtor>, @Body('culturasPlantadas') culturasPlantadas: Cultura[]): Promise<Produtor> {
    return this.produtorService.create(produtorData, culturasPlantadas);
  }

  @Get()
  async getAll(): Promise<Produtor[]> {
    return this.produtorService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Produtor> {
    return this.produtorService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() produtorData: Partial<Produtor>, @Body('culturasPlantadas') culturasPlantadas: Cultura[]): Promise<Produtor> {
    return this.produtorService.update(id, produtorData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.produtorService.delete(id);
  }

  @Get('total-fazendas')
  async getCount(): Promise<{ totalFazendas: number }> {
    const totalFazendas = await this.produtorService.getTotalFazendas();
    return { totalFazendas };
  }

  @Get('total-area')
  async getTotalArea(): Promise<{ totalAreaHectares: number }> {
    const totalAreaHectares = await this.produtorService.getTotalArea();
    return { totalAreaHectares };
  }
}
