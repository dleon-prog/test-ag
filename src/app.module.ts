import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produtor } from './produtor-rural/produtor.entity';
import { ProdutorService } from './produtor-rural/produtor.service';
import { ProdutorController } from './produtor-rural/produtor-rural.controller';
import { ProdutorRepository } from './produtor-rural/produtor.repository';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'seu_usuario',
      password: 'sua_senha',
      database: 'seu_banco_de_dados',
      entities: [Produtor],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Produtor]),
  ],
  controllers: [ProdutorController],
  providers: [ProdutorService, ProdutorRepository],
})
export class AppModule {}
