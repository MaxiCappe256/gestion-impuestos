import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Patente extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  domain: string;

  @Prop({ default: false })
  paid: boolean;
}

export const PatenteSchema = SchemaFactory.createForClass(Patente);
