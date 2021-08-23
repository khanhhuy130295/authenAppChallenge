import { Module } from '@nestjs/common';
import { AppController } from './app.controller'
import { AppService } from './app.service'

export class AppModuleFactory {
  private static instance: new () => {}
  /**
   *
   */
  constructor() {
    if (!AppModuleFactory.instance) {
      @Module({

        providers: [AppService],
        controllers: [AppController]
      })
      class AppModule {
        constructor() {
          console.log('run app module! ')
        }
      }
      AppModuleFactory.instance = AppModule

    }
    return AppModuleFactory.instance
  }
}