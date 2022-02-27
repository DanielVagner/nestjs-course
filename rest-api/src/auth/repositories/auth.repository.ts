import { Injectable } from "@nestjs/common";
import { User } from "../../../../shared/course";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class AuthRepository {

    constructor(@InjectModel('User') private userModel: Model<User>) {

    }


    async addUser(user: Partial<User>): Promise<User> {

        const newCourse = new this.userModel(user);

        await newCourse.save()

        return newCourse.toObject({ versionKey: false });
    }

}