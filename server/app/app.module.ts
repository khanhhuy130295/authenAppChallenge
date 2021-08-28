import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Configuration} from './app.interface';
import { MongooseModule } from '../mongoose';
import { LoggerModule } from '../logger';
import {ImportedModule} from './app.subModule'
export class AppModuleFactory {
  private static instance: new () => {}
  constructor(appConfig: Configuration) {
    if (!AppModuleFactory.instance) {
      const appModules = []
      if(appConfig.mongoose) {
        appModules.push(MongooseModule.register(appConfig.mongoose))
      }
      if(appConfig.logger){
        appModules.push(LoggerModule.register(appConfig.logger))
      }
      if(appConfig.redis){
        //todo
      }
      if(appConfig.google){
        //todo
      }
      if(appConfig.session){
        //todo
      }
      @Module({
        imports: [
          ...appModules,
          ConfigModule.forRoot({
            isGlobal: true,
            load: [()=>({
              ...appConfig
            })]
          }),
          ...ImportedModule
        ],
        providers: [AppService],
        controllers: [AppController]
      })
      class AppModule {
      }
      AppModuleFactory.instance = AppModule

    }
    return AppModuleFactory.instance
  }
}