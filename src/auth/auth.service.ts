// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/service/user.service';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../user/DTO/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByUsername(username);
        console.log(user, "USERRR")
        if (!user) {
            throw new Error('User not found.');
        }

        // const isPasswordMatch = await user.comparePassword(password);
        // if (isPasswordMatch) {
        //     return user;
        // }

        return user;
    }

    async login(user: User): Promise<any> {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const { username, email, password } = createUserDto;

        const user = new User();
        user._id = uuidv4(); // Generate a custom _id using UUID
        user.username = username;
        user.email = email;
        user.password = password;

        return this.usersService.create(user);
    }

    async findUserById(id: string): Promise<User | null> {
        return this.usersService.findById(id);
    }
}
