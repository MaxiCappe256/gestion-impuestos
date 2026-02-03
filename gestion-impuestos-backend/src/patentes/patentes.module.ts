import { Module } from '@nestjs/common';
import { PatentesController } from './patentes.controller';
import { PatentesService } from './patentes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Patente, PatenteSchema } from './schemas/patente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patente.name, schema: PatenteSchema }]),
  ],
  controllers: [PatentesController],
  providers: [PatentesService],
})
export class PatentesModule {}
