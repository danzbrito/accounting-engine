import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TransactionBoxDocument = HydratedDocument<TransactionBox>;

@Schema({ timestamps: true })
export class TransactionBox {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    trxRefID: string;

    @Prop({ required: true })
    trxRefNo: string;

    @Prop({ required: true, type: mongoose.Schema.Types.Date })
    requestTime: string;

    @Prop({ required: true, type: Object })
    data: string;
}

export const TransactionBoxSchema =
    SchemaFactory.createForClass(TransactionBox);
