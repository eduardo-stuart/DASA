import { RootRoute } from './route'
import path from 'path'
import express from 'express'
import PacientesController from './../controllers/pacientes.controllers'
import PacientesMiddleware from './../controllers/pacientes.middleware'

export class PacientesRoutes extends RootRoute {

  constructor(app: express.Application) {
    super(app, 'PacientesRoutes')
  }

  setupRoutes(): express.Application {

    this.app.route(path.join(this.prefix, 'pacientes'))
      .get(PacientesController.listPacientes)
      .post(PacientesMiddleware.checkRequiredFields, PacientesController.addPaciente)


    this.app.route(path.join(this.prefix, 'pacientes/:pacienteCPF'))
      .get(PacientesController.getPacienteByCPF)
      .patch(PacientesController.patchPacienteByCPF)
      .delete(PacientesController.deletePacienteByCPF)

    return this.app

  }

}
