import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { UserReponsitory } from './users.reponsitory';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
    constructor(
        private readonly userReponsitory: UserReponsitory
    ) { }

    async signUp(user: User): Promise<User> {
        const { fullname, email, password } = user
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const reqBody = {
            fullname,
            email,
            password: hash
        };
        return this.userReponsitory.signUp(reqBody);
    }

    async signIn(user: User, jwt: JwtService): Promise<any> {
        const { email } = user
        const foundUser = await this.userReponsitory._findByEmail(email);
        if (foundUser) {
            const { password } = foundUser;
            if (bcrypt.compare(user.password, password)) {
                const payload = {
                    email
                };
                const token = await jwt.sign(payload);
                return {
                    token
                };
            }
            return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
        }
        return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED);
    }
}
