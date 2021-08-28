import {
    LOGGER,
    LoggerModule
} from '../logger'
import { AppConfiguration, Configuration } from './app.interface';


export class AppConfig {
    private static dir: string = 'configs';
    private static instance: AppConfig
    private constructor(public env:string, public file: string, public appConfig: Configuration) {
        this.env = env;
        this.file = file;
        this.appConfig = appConfig;   
    }

    private static envMapping: Record<string, {env: string, configFile: string}> = {
        development: {
            env: 'development',
            configFile: 'develop.config'
          },
          staging: {
            env: 'staging',
            configFile: 'staging.config'
          },
          production: {
            env: 'production',
            configFile: 'production.config'
          },
          test: {
            env: 'test',
            configFile: 'develop.config'
          }
    }

    public static load(): AppConfig {
        let loadedFile = null;
        const env: string  = process.env.NODE_ENV  || AppConfig.envMapping.development.env;
        try{
            if(!AppConfig.instance && !loadedFile){
                const file: string = AppConfig.envMapping[env].configFile
                loadedFile = require(`../${AppConfig.dir}/${file}`);
                if(!loadedFile){
                    throw new Error(`Can't find module './${AppConfig.dir}/${file}'`);
                }
                const appConfig: Configuration = loadedFile.appConfig;
                AppConfig.instance = new AppConfig(env, file, appConfig);
                //add cron name
            }
            return AppConfig.instance
        } catch (err) {
            if(!AppConfig.instance && !loadedFile){
                const file: string = 'default.config';
                loadedFile = require(`../${AppConfig.dir}/${file}`);
                const appConfig: Configuration = loadedFile.appConfig;
                AppConfig.instance = new AppConfig(env, file, appConfig)
                //add cron name
                LoggerModule.error(err.message, err, 'load config', null, AppConfig.instance.logger())
            }
            return AppConfig.instance
        }
    }

    //#region public scope
    public logger() {
        return this.appConfig.logger
    }

    public mongoose() {
        return this.appConfig.mongoose
    }

    public app = (key?: string) => {
        return key ? this.appConfig?.app?.[key] : this.appConfig.app
    }

    public retry() {
        return this.appConfig.retry
    }
    //#endregion
}