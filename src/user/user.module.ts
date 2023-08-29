import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from "../schemas/user.schema";
import {UsersService} from "./service/user.service";
import {UserController} from "./controller/user.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UsersService],
    controllers:[UserController],
    exports: [UsersService],
})
export class UsersModule {}
