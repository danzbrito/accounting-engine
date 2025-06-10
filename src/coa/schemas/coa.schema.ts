import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CoaDocument = HydratedDocument<Coa>;

export enum AccountType {
  NOMINAL = 'NOMINAL',
  REAL = 'REAL',
}

@Schema({ timestamps: true })
export class Coa {
    @Prop({ required: true, unique: true, index: true })
    accountID: string;

    @Prop({ required: true, unique: true, index: true })
    accountCode: string;

    @Prop({ required: true })
    accountName: string;

    @Prop({ enum: AccountType, required: true })
    accountType: string;

    @Prop({ required: true })
    accountGroupCode: string;

    @Prop({ required: true })
    accountGroupName: string;

    @Prop({ required: true })
    normalAccount: string;

    @Prop({ required: true })
    description: string;

    @Prop({ default: false })
    isActive: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Coa' })
    parent?: CoaDocument;
}
export const CoaSchema = SchemaFactory.createForClass(Coa);