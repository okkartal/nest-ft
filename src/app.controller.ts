import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('X-API-KEY', 'THIS IS YOUR FIRST API KEY')
  getHello(): string {
    return this.appService.getHello();
  }
} 

