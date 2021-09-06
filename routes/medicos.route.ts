import { RootRoute } from "./route";
import path from "path";
import express from 'express'
import MedicosController from './../controllers/medicos.controllers'
import MedicosMiddleware from "../controllers/medicos.middleware"

export class MedicosRoutes extends RootRoute {

  constructor(app: express.Application) {
    super(app, 'MedicosRoutes')
  }

  setupRoutes(): express.Application {

    this.app.route(path.join(this.prefix, 'medicos'))
      .get(MedicosController.listMedicos)
      .post(MedicosMiddleware.checkRequiredFields,
        MedicosController.addMedico)

    this.app.route(path.join(this.prefix, 'medicos/:crm'))
      .get(MedicosController.getMedicoByCRM)
      .patch(MedicosController.patchMedicoByCRM)
      .delete(MedicosController.deleteMedicoByCRM)

    return this.app
  }
}