import {
    Controller,
    Post,
    Body,
    Param,
    Put,
    Delete,
    BadRequestException,
    Get,
    Query,
    ParseArrayPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user.Schema';
import { getLimit, getPage } from 'src/utils/recipeUtils';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    create(@Body() data: Partial<User>) {
        return this.userService.create(data);
    }

    @Post('login')
    async login(@Body() data: { email: string; password: string }) {
        const user = await this.userService.find(data.email, data.password);
        if (!user) {
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

    @Get('recommended/:userId')
    findRecommended(
        @Param('userId') userId: string,
        @Query('limit') limit: string,
    ) {
        const limitNumber = getLimit(limit); // Default to 10 if not provided
        return this.userService.findRecommended(userId, limitNumber);
    }

    @Get('recipes/:userId')
    findByUser(
        @Param('userId') userId: string,
        @Query('limit') limit: string,
        @Query('page') page: string,
    ) {
        const limitNumber = getLimit(limit);
        const pageNumber = getPage(page);
        return this.userService.findUserRecipes({
            userId,
            limit: limitNumber,
            page: pageNumber,
        });
    }

    @Get('/favorites/:userId')
    getFavoritesGroupedByCategory(
        @Param('userId') userId: string,
        @Query('limit') limit: string,
        @Query('page') page: string,

        @Query(
            'categories',
            new ParseArrayPipe({
                items: String,
                separator: ',', // split on commas
                optional: true, // so missing param doesn’t error
            }),
        )
        categories?: string[],
    ) {
        const limitNumber = getLimit(limit);
        const pageNumber = getPage(page);
        return this.userService.findFavoritesByCategories({
            userId,
            categories,
            limit: limitNumber,
            page: pageNumber,
        });
    }
}
