import {
    Configuration
} from '../app'


export const appConfig: Configuration = {
    app: {
        name: 'baseApp-NestJS',
        port: 3000,
        domain: 'http://localhost:3000',
        logo: '',
        host: '127.0.0.1',
        tunnel: ''
    },
    logger: {
        color: true,
        timestamp: true,
        multiline: false,
        depth: 5,
        showHidden: false
    },
    initDefault: {
        setting: false,
        user: false
    },
    mailer:{
        from: '',
        service: ''
    },
    //#region system
    mongoose: {
        uris:'mongodb://127.0.0.1:27017/marketplace',
        prefix: 'baseApp',
        debug: false,
        connectionOptions: {
            autoCreate: true,
            localPort:27017,
            localAddress:'',
            auth:{
                username: '',
                password: ''
            },
            autoIndex: true,
            loadBalanced: false,
            monitorCommands: true,
            maxPoolSize: 100,
            connectTimeoutMS: 3 * 60 * 60 * 1000
        }
    },
    redis: {
        url: 'redis://127.0.0.1:6379/2',
        prefix: 'baseApp_',
        db: 2
    },
    //#endregion 
    
    //#region openID login
    google: {
        apiURL: '',
        appID: '',
        appSecret: '',
        installScope: '',
        issuerURL: '',
        loginScope: '',
        webhookURL: '',
        webhookVerifyToken: '',
        embedded: true
    },
    //#endregion

    retry:{
        delay: 2.5 *1000,
        retries: 3
    },
    session: {
        resave: false,
        saveUninitialized: false,
        secret: 'secret',
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    },
    timestamp: {

    },


}
