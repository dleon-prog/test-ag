import * as path from 'path';
import * as fs from 'fs';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import { ProdutorController } from 'src/produtor-rural/produtor-rural.controller';
import { ProdutorService } from 'src/produtor-rural/produtor.service';
import { Produtor } from 'src/produtor-rural/produtor.entity';

describe('ProdutorController', () => {
  let controller: ProdutorController;
  let produtorService: ProdutorService;
  let app;
  let mockData: any;

  beforeAll(() => {
    const dadosMockPath = path.resolve(__dirname, '__mocks__', 'dados-mock.json');
    mockData = JSON.parse(fs.readFileSync(dadosMockPath, 'utf-8'));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutorController],
      providers: [
        ProdutorService,
        {
          provide: getRepositoryToken(Produtor),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProdutorController>(ProdutorController);
    produtorService = module.get<ProdutorService>(ProdutorService);
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new Produtor', async () => {
      const { produtorData, culturasPlantadas } = mockData;
      const mockProdutor = new Produtor();
      jest.spyOn(produtorService, 'create').mockResolvedValue(mockProdutor);

      const response = await request(app.getHttpServer())
        .post('/produtor')
        .send({ produtorData, culturasPlantadas })
        .expect(201);

      expect(response.body).toEqual(mockProdutor);
    });
  });

  describe('getAll', () => {
    it('should return an array of Produtor', async () => {
      const mockProdutores = [new Produtor(), new Produtor()];
      jest.spyOn(produtorService, 'findAll').mockResolvedValue(mockProdutores);

      const response = await request(app.getHttpServer())
        .get('/produtor')
        .expect(200);

      expect(response.body).toEqual(mockProdutores);
    });
  });

  describe('getById', () => {
    it('should return a Produtor by ID', async () => {
      const mockProdutor = new Produtor();
      jest.spyOn(produtorService, 'findById').mockResolvedValue(mockProdutor);

      const response = await request(app.getHttpServer())
        .get('/produtor/1')
        .expect(200);

      expect(response.body).toEqual(mockProdutor);
    });

    it('should return 404 Not Found when Produtor is not found', async () => {
      jest.spyOn(produtorService, 'findById').mockRejectedValue(new Error('Produtor não encontrado'));

      await request(app.getHttpServer())
        .get('/produtor/1')
        .expect(404);
    });
  });

  describe('update', () => {
    it('should update a Produtor by ID', async () => {
      const { produtorData, culturasPlantadas } = mockData;
      const mockProdutor = new Produtor();
      jest.spyOn(produtorService, 'update').mockResolvedValue(mockProdutor);

      const response = await request(app.getHttpServer())
        .put('/produtor/1')
        .send({ produtorData, culturasPlantadas })
        .expect(200);

      expect(response.body).toEqual(mockProdutor);
    });

    it('should return 404 Not Found when Produtor is not found', async () => {
      jest.spyOn(produtorService, 'update').mockRejectedValue(new Error('Produtor não encontrado'));

      await request(app.getHttpServer())
        .put('/produtor/1')
        .send({})
        .expect(404);
    });
  });

  describe('delete', () => {
    it('should delete a Produtor by ID', async () => {
      jest.spyOn(produtorService, 'delete').mockResolvedValue();

      await request(app.getHttpServer())
        .delete('/produtor/1')
        .expect(204);
    });

    it('should return 404 Not Found when Produtor is not found', async () => {
      jest.spyOn(produtorService, 'delete').mockRejectedValue(new Error('Produtor não encontrado'));

      await request(app.getHttpServer())
        .delete('/produtor/1')
        .expect(404);
    });
  });
});
