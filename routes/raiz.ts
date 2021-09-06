import { RootRoute } from "./route";
import path from "path";
import express from 'express'

/**
 * Classe criada para redirecionar os visitantes para a seção de documentação
 * caso acessem uma rota ou endereço inválidos
 */
export class Raiz extends RootRoute {

  constructor(app: express.Application) {
    super(app, 'RaizRoute')
  }

  redirectToDocumentation(req: express.Request, res: express.Response) {
    res.redirect(path.join('/', 'api', 'docs'))
  }

  setupRoutes(): express.Application {
    this.app.all('*', this.redirectToDocumentation)
    return this.app
  }
}

