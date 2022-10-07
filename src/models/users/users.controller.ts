import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
import { User } from './schema/user.schema';

@Controller('/api/v1/users')
export class UsersController {
    constructor(
        private readonly userServerice: UsersService,
        private jwtService: JwtService,
    ) { }

    @Post('/signup')
    async signUp(@Res() response, @Body() user: User) {
        const newUser = await this.userServerice.signUp(user);
        return response.status(HttpStatus.CREATED).json({
            newUser
        })
    }

    @Post('/signin')
    async signIn(@Res() response, @Body() user: User) {
        const token = await this.userServerice.signIn(user, this.jwtService)
        return response.status(HttpStatus.OK).json(token);
    }
}
