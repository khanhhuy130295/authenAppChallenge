
export interface GoogleConfiguration {
    issuerURL: string
    apiURL: string
    webhookURL: string
    appID: string
    appSecret: string
    loginScope: string
    installScope: string
    webhookVerifyToken: string
    embedded?: boolean
}