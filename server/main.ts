import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModuleFactory, AppConfig } from './app';
import {LoggerModule} from './logger';
import {join} from 'path';

async function runApp(): Promise<NestExpressApplication | void> {
  try {
    const { env, file, appConfig} = AppConfig.load()
    LoggerModule.info(env, 'NODE_ENV', null, appConfig.logger)
    LoggerModule.info(file, 'Configuration', null, appConfig.logger)
    const isDev: boolean = env === 'development'

    const {
      port,
      host = ''
    } = appConfig.app
    
    // config
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(
      new AppModuleFactory(appConfig),
      {
        // logger: false,
        bodyParser: false
      }
    )

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '.', 'views'));
    app.setViewEngine('hbs');

    await app.listen(3000)
    return app
  } catch (err: any) {
    LoggerModule.error(err.message, err, 'runApp')
    // console.log(err)
  }
}

runApp()