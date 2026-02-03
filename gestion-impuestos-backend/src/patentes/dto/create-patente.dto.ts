import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePatenteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La patente es obligatoria' })
  domain: string;

  @IsBoolean()
  @IsOptional()
  paid?: boolean;
}
