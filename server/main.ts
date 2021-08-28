import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModuleFactory, AppConfig } from './app';
import {LoggerModule} from './logger'


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
    await app.listen(3000)
    return app
  } catch (err) {
    LoggerModule.error(err.message, err, 'runApp')
    // console.log(err)
  }
}

runApp()