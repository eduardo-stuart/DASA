// FRAMEWORK
import express from 'express'

// EXTRAS
import path from 'path'

// DEBUG
import debug from 'debug'

// ERROS
const AppError = require('./../errorhandlers/appError')
const GlobalErrorHandler = require('./../errorhandlers/errors.middleware')

// WINSTON (LOGS):
import * as winston from 'winston'
import * as expressWinston from 'express-winston'

// SWAGGER (documentaão)
import swaggerUI from 'swagger-ui-express'
import swaggerSpecs from './swagger.setup'

// CORS: nesta etapa inicial, vai estar liberado para todos
import cors from 'cors'

// ROTAS
import { RootRoute } from '../routes/route'
import { Raiz } from '../routes/raiz'
import { PacientesRoutes } from './../routes/pacientes.route'
import { MedicosRoutes } from './../routes/medicos.route'
import { PedidosRoutes } from './../routes/pedidos.route'

class Server {

  app: express.Application = express()
  server: any
  PORT = Number(process.env.PORT) || 3000
  HOST = process.env.HOST || 'localhost'
  routes: Array<RootRoute> = []
  log: debug.IDebugger = debug('APP: server')
  isRunning: boolean = false

  constructor() {
    this.configuracaoInicial()
    this.configuracaoLogs()
    this.configuracaoRotas()
    this.configuracaoErrorHandling()
  }

  configuracaoInicial() {
    this.log('Configuração inicial...')
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())
  }

  configuracaoLogs() {
    this.log('Configurando suporte avançado de logs & documentação')

    const winstonOptions: expressWinston.LoggerOptions = {
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
      ),
    }

    if (!process.env.DEBUG) {
      winstonOptions.meta = false
      // Se estivermos testando, vamos reduzir ao máximo a interação do Winston com o terminal
      if (typeof global.it === 'function') {
        winstonOptions.level = 'http'
      }
    }

    this.app.use(expressWinston.logger(winstonOptions))

    const apiDocs = path.join(process.env.ROUTES_PREFIX || '/api/', 'docs')
    this.app.use(apiDocs, swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
  }

  configuracaoRotas() {
    this.log('Iniciando rotas...')
    this.routes.push(new PacientesRoutes(this.app))
    this.routes.push(new MedicosRoutes(this.app))
    this.routes.push(new PedidosRoutes(this.app))
    this.routes.push(new Raiz(this.app))
  }

  configuracaoErrorHandling() {
    // Erro exibido para o cliente caso acesse um endereço não existente
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      next(new AppError(`Não foi possível encontrar ${req.originalUrl.toUpperCase()}`, 404))
    })
    this.app.use(GlobalErrorHandler)
  }

  iniciarServidor() {
    if (this.isRunning) {
      console.log(`Servidor está operando na porta ${this.PORT}`)
    } else {
      this.log('Iniciando servidor...')
      this.server = this.app.listen(this.PORT, this.HOST, () => {
        const mensagem = `Servidor em operação na porta ${this.PORT}`
        this.log(mensagem)
        console.log(mensagem)
        this.isRunning = true
      })
    }
    return this.server
  }

  pararServidor() {
    if (!this.isRunning) {
      this.log('Servidor não está em operação...')
    } else {
      this.log('Encerrando servidor...')
      this.server.close(() => {
        this.log('Servidor encerrado')
        this.isRunning = false
      })
    }
  }

  // Retorna express.Application
  getApp = () => this.app

}

export default new Server()