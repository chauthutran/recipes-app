import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
    async hashPassword (plainTextPassword: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(plainTextPassword, saltRounds);
    }
    
    async comparePasswords (plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(plainTextPassword, hashedPassword);
        }
        catch(err) {
            console.error('Error comparing passwords:', err);
        }
        
        return false;
    }
}