import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Impuesto extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  number: number;

  @Prop({ default: false })
  paid: boolean;
}

export const ImpuestoSchema = SchemaFactory.createForClass(Impuesto);
