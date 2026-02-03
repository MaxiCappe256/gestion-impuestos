import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateImpuestoDto {
  @IsString({ message: 'El nombre del impuesto es obligatorio' })
  name: string;

  @IsNumber({}, { message: 'El numero del impuesto es obligatorio' })
  number: number;

  @IsBoolean()
  @IsOptional()
  paid?: boolean;
}
