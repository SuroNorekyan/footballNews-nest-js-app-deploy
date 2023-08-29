// user/controller/user.controller.ts
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { UsersService } from '../service/user.service';
import { User } from '../../schemas/user.schema';
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('user')
export class UserController {
    constructor(private usersService: UsersService) {}

    // This endpoint is protected with the LocalAuthGuard
    // Only authenticated users with a valid access token can access it
    @UseGuards(JwtAuthGuard)
    @Get()
    async getProfile(@Request() req): Promise<User> {
        // The user object is available in the request object after successful authentication
        // You can directly return it, or use it to fetch the user's profile from the database
        const userId = req.user._id; // Assuming your user object has _id property
        return this.usersService.findById(userId);
    }
}
