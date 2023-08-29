// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {User, UserDocument} from "../../schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(user: User): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const createdUser = new this.userModel({ ...user, password: hashedPassword });
        return createdUser.save();
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await this.userModel.findOne({ username }).select('+password').exec();
        return user ? user.toObject() : null; // Make sure the user is converted to a plain object
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }
}
