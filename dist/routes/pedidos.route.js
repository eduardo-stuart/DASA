"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosRoutes = void 0;
const route_1 = require("./route");
const path_1 = __importDefault(require("path"));
const pedidos_controllers_1 = __importDefault(require("./../controllers/pedidos.controllers"));
const pedidos_middleware_1 = __importDefault(require("./../controllers/pedidos.middleware"));
class PedidosRoutes extends route_1.RootRoute {
    constructor(app) {
        super(app, 'PedidosRoutes');
    }
    setupRoutes() {
        this.app.route(path_1.default.join(this.prefix, 'pedidos'))
            .get(pedidos_controllers_1.default.listPedidos)
            .post(pedidos_middleware_1.default.checkRequiredFields, pedidos_controllers_1.default.addPedido);
        this.app.route(path_1.default.join(this.prefix, 'pedidos/:id'))
            .all(pedidos_middleware_1.default.checkIfIDIsValid)
            .get(pedidos_controllers_1.default.getPedidoByID)
            .patch(pedidos_controllers_1.default.patchPedidoByID)
            .delete(pedidos_controllers_1.default.deletePedidoByID);
        return this.app;
    }
}
exports.PedidosRoutes = PedidosRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVkaWRvcy5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3JvdXRlcy9wZWRpZG9zLnJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxnREFBd0I7QUFFeEIsK0ZBQW9FO0FBQ3BFLDZGQUFtRTtBQUVuRSxNQUFhLGFBQWMsU0FBUSxpQkFBUztJQUUxQyxZQUFZLEdBQXdCO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUVELFdBQVc7UUFFVCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDOUMsR0FBRyxDQUFDLDZCQUFpQixDQUFDLFdBQVcsQ0FBQzthQUNsQyxJQUFJLENBQUMsNEJBQWlCLENBQUMsbUJBQW1CLEVBQ3pDLDZCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRWhDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQzthQUNsRCxHQUFHLENBQUMsNEJBQWlCLENBQUMsZ0JBQWdCLENBQUM7YUFDdkMsR0FBRyxDQUFDLDZCQUFpQixDQUFDLGFBQWEsQ0FBQzthQUNwQyxLQUFLLENBQUMsNkJBQWlCLENBQUMsZUFBZSxDQUFDO2FBQ3hDLE1BQU0sQ0FBQyw2QkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBRTdDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQTtJQUNqQixDQUFDO0NBQ0Y7QUFyQkQsc0NBcUJDIn0=