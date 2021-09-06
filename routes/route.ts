import express from 'express'

/**
 * Todas as demais rotas serão derivadas dessa classe,
 * que traz funcionalidades compartilhadas entre todas
 */

export abstract class RootRoute {
  // Mantém uma referência para a aplicação Express
  app: express.Application
  // Propriedade usada para depurar o código
  name: string
  prefix = process.env.ROUTES_PREFIX || '/api/'

  constructor(app: express.Application, name: string) {
    this.app = app
    this.name = name
    this.setupRoutes()
  }

  getName() {
    return this.name
  }

  // Usada pelas classes descendentes para configurar os endpoints
  abstract setupRoutes(): express.Application

}