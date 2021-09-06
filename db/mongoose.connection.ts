import mongoose from 'mongoose'
import debug from 'debug'

const log: debug.IDebugger = debug('app:mongoose-connection')

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = Number(process.env.DB_PORT) || 27017
const DB_NAME = process.env.DB_NAME || 'dasa-db'

const RETRY_IN = 10 // Aguarda dez segundos para tentar se conectar novamente

class MongooseConnection {
  private retries = 0

  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  }

  constructor() {
    this.tryToConnect()
  }

  getMongoose() {
    return mongoose
  }

  tryToConnect = () => {
    log('MongoDB: iniciando conexão...')
    mongoose
      .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, this.mongooseOptions)
      .then(() => log(`MongoDB: conectado com sucesso!`))
      .catch(err => {
        log(`MongoDB: falha em tentar conexão... (tentativa #${++this.retries} em ${RETRY_IN} segundos): `, err)
        setTimeout(this.tryToConnect, RETRY_IN * 1000)
      })
  }
}

export default new MongooseConnection()