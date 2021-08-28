import {
    SessionOptions
} from 'express-session'
import {
    LoggerConfiguration
} from '../logger'
import {
    MongooseConfiguration
} from '../mongoose'
import {
    RedisConfiguration
} from '../redis'
import {
    GoogleConfiguration
} from '../google'

export interface Configuration {
    app: AppConfiguration,
    logger?: LoggerConfiguration,
    session?: SessionOptions,
    mailer?: MailerService,
    initDefault?: InitDefault,
    timestamp?: TimestampConfiguration,
    retry?: RetryConfiguration,
    mongoose?: MongooseConfiguration,
    redis?: RedisConfiguration,
    google?: GoogleConfiguration
}


export interface AppConfiguration {
    name: string,
    port: number,
    domain: string,
    logo: string,
    host?: string,
    tunnel?: string
}

export interface InitDefault {
    user: boolean,
    setting: boolean
}

export interface RetryConfiguration {
    retries: number,
    delay: number
}

export interface TimestampConfiguration {

}


export interface MailerService {
    from: string,
    service: string
}

export interface CloudinaryServier {
    
}

export interface RedirectResponse {
    url: string,
    statusCode?: number
}

export interface ErrorResponse {
    error : {
        path: string,
        timestamp: string,
        error_message: string
    }
}

export interface ServerResponse<T> {
    is_success: boolean
    message_code?: string
    data?: T | ErrorResponse
  }
  
  export type APIResponse<T> = {
    [key in keyof T]: T[keyof T]
  } & ServerResponse<T>
  