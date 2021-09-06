import { RootRoute } from "./route"
import path from "path";
import express from 'express'
import PedidosController from './../controllers/pedidos.controllers'
import PedidosMiddleware from './../controllers/pedidos.middleware'

export class PedidosRoutes extends RootRoute {

  constructor(app: express.Application) {
    super(app, 'PedidosRoutes')
  }

  setupRoutes(): express.Application {

    this.app.route(path.join(this.prefix, 'pedidos'))
      .get(PedidosController.listPedidos)
      .post(PedidosMiddleware.checkRequiredFields,
        PedidosController.addPedido)

    this.app.route(path.join(this.prefix, 'pedidos/:id'))
      .all(PedidosMiddleware.checkIfIDIsValid)
      .get(PedidosController.getPedidoByID)
      .patch(PedidosController.patchPedidoByID)
      .delete(PedidosController.deletePedidoByID)

    return this.app
  }
}