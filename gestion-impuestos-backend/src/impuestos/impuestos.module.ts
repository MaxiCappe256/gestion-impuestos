import { Module } from '@nestjs/common';
import { ImpuestosController } from './impuestos.controller';
import { ImpuestosService } from './impuestos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Impuesto, ImpuestoSchema } from './schemas/impuesto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Impuesto.name, schema: ImpuestoSchema },
    ]),
  ],
  controllers: [ImpuestosController],
  providers: [ImpuestosService],
})
export class ImpuestosModule {}
