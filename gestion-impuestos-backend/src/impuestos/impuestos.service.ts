import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateImpuestoDto } from 'src/impuestos/dto/create-impuesto.dto';
import { Impuesto } from 'src/impuestos/schemas/impuesto.schema';
import { UpdateImpuestoDto } from './dto/update-impuesto.dto';

@Injectable()
export class ImpuestosService {
  constructor(
    @InjectModel(Impuesto.name) private impuestoModel: Model<Impuesto>,
  ) {}

  async create(createImpuestoDto: CreateImpuestoDto) {
    const existe = await this.impuestoModel
      .findOne({
        number: createImpuestoDto.number,
      })
      .exec();

    if (existe)
      throw new ConflictException(
        `EL impuesto con numero ${createImpuestoDto.number} ya esta registrado`,
      );
    const nuevoImpuesto = new this.impuestoModel(createImpuestoDto);
    return await nuevoImpuesto.save();
  }

  async findAll() {
    return await this.impuestoModel.find().exec();
  }

  async update(id: string, updateImpuestoDto: UpdateImpuestoDto) {
    const impuestoActualizado = await this.impuestoModel
      .findByIdAndUpdate(id, updateImpuestoDto, { new: true })
      .exec();

    if (!impuestoActualizado)
      throw new NotFoundException('Impuesto no encontrado');

    return impuestoActualizado;
  }

  async remove(id: string) {
    const impuestoEliminado = await this.impuestoModel
      .findByIdAndDelete(id)
      .exec();

    if (!impuestoEliminado)
      throw new NotFoundException('Impuesto no encontrado');
  }
}
