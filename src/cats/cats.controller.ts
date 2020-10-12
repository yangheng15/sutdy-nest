import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCatDto } from './dao';

@Controller('cats')
export class CatsController {

    @Post()
    getHello(@Body() {name, age}: CreateCatDto): string {
        return `hello ${name} is ${age}`
    }
}
