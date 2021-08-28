import {
     Module,
     Global, 
     Inject,
     DynamicModule
} from '@nestjs/common';
import { 
    connect,
    set,
    connection,
    model as createModel,
    Schema 
} from 'mongoose';
import {
    LOGGER,
    LoggerService
} from '../logger'
import {
    MongooseConfiguration, MongooseModel
} from './mongoose.interface'

@Global()
@Module({})
export class MongooseModule {
    private static isInitialize: boolean;
    private static logger: LoggerService;
    private static config: MongooseConfiguration;
    private static models = new Map()
    
    constructor(@Inject(LOGGER) private readonly loggerService: LoggerService) {
        if(!MongooseModule.logger){
            MongooseModule.logger = this.loggerService
        }
    }

    public static register (config: MongooseConfiguration): DynamicModule {
        const mongooseURL = new URL (config.uris);
        const logURL: string = `${mongooseURL.protocol}//${mongooseURL.host}${mongooseURL.pathname}`

        if(!MongooseModule.isInitialize){
            connect(config.uris, config.connectionOptions || {}).catch(err => console.log(err))
            
            // set debug mode
            config.debug ? set('debug', { shell:config.debug,  color: config.debug }) : null

            connection.on('open', ()=> MongooseModule.logger.info(logURL, 'MongooseConnected'))
            connection.on('reconnected', ()=> MongooseModule.logger.info(logURL, 'MongooseReconnected'))
            connection.on('disconnected', ()=> MongooseModule.logger.warn(logURL, 'MongooseDisconnected'))
            connection.on('close', ()=> MongooseModule.logger.warn(logURL, 'MongooseClose'))
            MongooseModule.config = config
        }
        MongooseModule.isInitialize = true

        return {
            module: MongooseModule
        }
    }

    public static useSchema(models: MongooseModel[]): DynamicModule {
        const _providers = models.map(model => ({
            provide: model.name,
            useFactory: ()=> {
                const collectionPrefix = MongooseModule.config.prefix;
                const modelName = collectionPrefix ? collectionPrefix + '_' + model.name : model.name;
                let _schema: Schema
                if(!MongooseModule.models.has(modelName)){
                    _schema = model.schema;
                    MongooseModule.models.set(modelName, _schema)
                }else{
                    _schema = MongooseModule.models.get(modelName)
                }
                
                return createModel(modelName, _schema)
            }
        }))
        return {
            module: MongooseModule,
            providers: _providers,
            exports: _providers
        }
    }
}
