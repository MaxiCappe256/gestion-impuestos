import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PatentesService } from './patentes.service';
import { CreatePatenteDto } from './dto/create-patente.dto';
import { UpdatePatenteDto } from './dto/update-patente.dto';

@Controller('patentes')
export class PatentesController {
  constructor(private readonly patentesService: PatentesService) {}

  @Post()
  create(@Body() createPatenteDto: CreatePatenteDto) {
    return this.patentesService.create(createPatenteDto);
  }

  @Get()
  findAll() {
    return this.patentesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatenteDto: UpdatePatenteDto) {
    return this.patentesService.update(id, updatePatenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patentesService.remove(id);
  }
}
