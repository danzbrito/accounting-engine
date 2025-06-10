import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AccountGroupDocument = HydratedDocument<AccountGroup>;

@Schema({ timestamps: true })
export class AccountGroup {
    @Prop({ required: true, unique: true, index: true })
    accountGroupID: string;

    @Prop({ required: true, unique: true, index: true })
    accountGroupCode: string;

    @Prop({ required: true })
    accountGroupName: string;

    @Prop({ required: true })
    description: string;

    @Prop({ default: false })
    isActive: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AccountGroup' })
    parent?: AccountGroupDocument;
}
export const AccountGroupSchema = SchemaFactory.createForClass(AccountGroup);