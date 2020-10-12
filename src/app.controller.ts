import { Controller, Get, Header, HttpCode, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express'

interface User {
  name: string
  age: number
}

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get')
  @Header('Cache-Control', 'none')
  getHello(@Req() req: Request, @Res() res: Response): void {
    console.log(res);
    // res.send(this.appService.getHello())
    res.json({
      message: 'hello world'
    })
    // return this.appService.getHello();
  }

  @Post('login')
  // @HttpCode(201)
  @Header('Cache-Control', 'none')
  login(): User {
    return {
      name: 'yang',
      age: 18
    }
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect(@Query('version') version): object {
    console.log(version);
    if(version && +version === 5) {
      return {
        url: `https://nestjs.com/v${version}`
      }
    }
  }
}
