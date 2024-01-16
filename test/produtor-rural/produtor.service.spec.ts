import * as path from 'path';
import * as fs from 'fs';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produtor } from 'src/produtor-rural/produtor.entity';
import { ProdutorService } from 'src/produtor-rural/produtor.service';

describe('ProdutorService', () => {
  let service: ProdutorService
  let produtorRepository: Repository<Produtor>;
  let mockData: any;

  beforeAll(() => {
    const dadosMockPath = path.resolve(__dirname, '__mocks__', 'dados-mock.json');
    mockData = JSON.parse(fs.readFileSync(dadosMockPath, 'utf-8'));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutorService,
        {
          provide: getRepositoryToken(Produtor),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProdutorService>(ProdutorService);
    produtorRepository = module.get<Repository<Produtor>>(getRepositoryToken(Produtor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new Produtor', async () => {
      const { produtorData, culturasPlantadas } = mockData;
      const mockProdutor = new Produtor();
      jest.spyOn(produtorRepository, 'create').mockReturnValue(mockProdutor);
      jest.spyOn(produtorRepository, 'save').mockResolvedValue(mockProdutor);

      const result = await service.create(produtorData, culturasPlantadas);

      expect(result).toEqual(mockProdutor);
    });
  });

  describe('findAll', () => {
    it('should return an array of Produtor', async () => {
      const mockProdutores = [new Produtor(), new Produtor()];
      jest.spyOn(produtorRepository, 'find').mockResolvedValue(mockProdutores);

      const result = await service.findAll();

      expect(result).toEqual(mockProdutores);
    });
  });

  describe('findById', () => {
    it('should return a Produtor by ID', async () => {
      const mockProdutor = new Produtor();
      jest.spyOn(produtorRepository, 'findOne').mockResolvedValue(mockProdutor);

      const result = await service.findById(1);

      expect(result).toEqual(mockProdutor);
    });

    it('should throw NotFoundException when Produtor is not found', async () => {
      jest.spyOn(produtorRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrowError('Produtor não encontrado');
    });
  });

  describe('update', () => {
    it('should update a Produtor by ID', async () => {
      const { produtorData } = mockData;
      const mockProdutor = new Produtor();
      jest.spyOn(produtorRepository, 'findOne').mockResolvedValue(mockProdutor);
      jest.spyOn(produtorRepository, 'save').mockResolvedValue(mockProdutor);

      const result = await service.update(1, produtorData);

      expect(result).toEqual(mockProdutor);
    });

    it('should throw NotFoundException when Produtor is not found', async () => {
      jest.spyOn(produtorRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, {}, [])).rejects.toThrowError('Produtor não encontrado');
    });
  });

  describe('delete', () => {
    it('should delete a Produtor by ID', async () => {
      const mockProdutor = new Produtor();
      jest.spyOn(produtorRepository, 'findOne').mockResolvedValue(mockProdutor);

      await expect(service.delete(1)).resolves.not.toThrow();
    });

    it('should throw NotFoundException when Produtor is not found', async () => {
      jest.spyOn(produtorRepository, 'findOne').mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrowError('Produtor não encontrado');
    });
  });
});
