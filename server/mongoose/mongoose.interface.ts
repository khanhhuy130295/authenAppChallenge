import {
    ConnectOptions,
    Schema
} from 'mongoose'

interface MongooseConfiguration {
    uris: string
    prefix?: string
    debug?: boolean
    connectionOptions?: ConnectOptions
}

interface MongooseModel {
    name: string,
    schema: Schema
}

export {
    MongooseConfiguration,
    MongooseModel
}