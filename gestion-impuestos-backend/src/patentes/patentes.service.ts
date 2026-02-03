import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Patente } from './schemas/patente.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePatenteDto } from './dto/create-patente.dto';
import { UpdatePatenteDto } from './dto/update-patente.dto';

@Injectable()
export class PatentesService {
  constructor(
    @InjectModel(Patente.name) private patentesModel: Model<Patente>,
  ) {}

  async create(createPatenteDto: CreatePatenteDto) {
    // 1. replace(/[^a-zA-Z0-9]/g, '') quita espacios, guiones, puntos, etc.
    const dominioLimpio = createPatenteDto.domain
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase();

    createPatenteDto.domain = dominioLimpio;

    const existe = await this.patentesModel
      .findOne({
        domain: createPatenteDto.domain,
      })
      .exec();

    if (existe)
      throw new ConflictException(
        `La patente con dominio ${createPatenteDto.domain} ya esta registrada`,
      );

    const nuevaPatente = new this.patentesModel(createPatenteDto);

    return await nuevaPatente.save();
  }

  async findAll() {
    return this.patentesModel.find().exec();
  }

  async update(id: string, updatePatenteDto: UpdatePatenteDto) {
    const patenteActualizada = await this.patentesModel.findByIdAndUpdate(
      id,
      updatePatenteDto,
    );

    if (!patenteActualizada)
      throw new NotFoundException('Patente no encontrada');

    return patenteActualizada;
  }

  async remove(id: string) {
    const patenteEliminada = await this.patentesModel.findByIdAndDelete(id);

    if (!patenteEliminada) throw new NotFoundException('Patente no encontrada');

    return patenteEliminada;
  }
}
