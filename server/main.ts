import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModuleFactory } from './app';
import {LoggerModule} from './logger'
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();


async function runApp(): Promise<NestExpressApplication | void> {
  try{
    LoggerModule.info('development', 'NODE_ENV', null, undefined)
    // config
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(
      new AppModuleFactory(),
      {
        // logger: false,
        bodyParser: false
      }
    )
  }catch(err){
    console.log(err)
  }
}

runApp()