// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import {User} from "../schemas/user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any): Promise<User> {
        // Here, you can fetch user data based on the payload information (e.g., user ID)
        // For example, you could use the user ID from the payload to fetch the corresponding user from the database
        // The 'payload' variable contains the decoded JWT token information
        return this.authService.findUserById(payload.sub);
    }
}
