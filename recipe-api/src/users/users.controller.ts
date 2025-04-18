import { Controller, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user.Schema';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    create(@Body() data: Partial<User>) {
        return this.userService.create(data);
    }

    @Post('login')
    async login(@Body() data: {email: string, password: string}) {
        const user = await this.userService.find(data.email, data.password);
        if(!user) {
            throw new BadRequestException('Invalid email or password');
        }
        
        return user;
    }
    
    @Put()
    update(@Param('email') email: string, @Body() data: Partial<User>) {
        return this.userService.update(email, data);
    }

    @Delete()
    delete(@Param('email') email: string) {
        return this.userService.delete(email);
    }
}
