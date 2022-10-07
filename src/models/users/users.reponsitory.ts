import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SignUpDto } from "./dto/user.dto";
import { User, UserDocument } from "./schema/user.schema";

export class UserReponsitory {
    constructor(@InjectModel(User.name)
    private readonly reponsitory: Model<UserDocument>) { }

    _findByEmail(email: string) {
        return this.reponsitory.findOne({ email }).exec();
    }

    signUp(data: SignUpDto) {
        const newUser = new this.reponsitory(data);
        return newUser.save();
    }
} 