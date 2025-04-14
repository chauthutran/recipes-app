import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.Schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
    
    create (data: Partial<User>) {
        const created = new this.userModel(data);
        return created.save();
    }
    
    update (email: string, data: Partial<User>) {
        return this.userModel.findOneAndUpdate(
            { email }, // Filter by email
            { $set: data }, // Update fields
            { new: true }, // Return update document
        );
    }
    
    delete (email: string) {
        return this.userModel.findOneAndDelete({ email });
    }
}
