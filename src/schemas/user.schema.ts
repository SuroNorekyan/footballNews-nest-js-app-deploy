import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ type: Types.ObjectId })
    _id: Types.ObjectId;

    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true, select: false })
    password: string;

    async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}

export const UserSchema = SchemaFactory.createForClass(User);
