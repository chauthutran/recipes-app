import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.Schema';
import { PasswordService } from './PasswordService';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly passwordService: PasswordService,
    ) {}

    create(data: Partial<User>): Promise<User | null> {
        const created = new this.userModel(data);
        return created.save();
    }
    
    async find (email: string, plainTextPassword: string): Promise<Partial<User> | undefined> {
        
        const user = await this.userModel.findOne({ email });
        
        if (!user) return;
        
        const isValid = await this.passwordService.comparePasswords(plainTextPassword, user.password);
        
        if(!isValid) return;
        
        // Exclude password before returning user
        const { password, ...userData } = user.toObject();
        return isValid ? userData : undefined;
    }

    update(email: string, data: Partial<User>): Promise<User | null> {
        return this.userModel.findOneAndUpdate(
            { email }, // Filter by email
            { $set: data }, // Update fields
            { new: true }, // Return update document
        );
    }

    delete(email: string): Promise<User | null> {
        return this.userModel.findOneAndDelete({ email });
    }
}
