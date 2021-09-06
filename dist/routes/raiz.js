"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Raiz = void 0;
const route_1 = require("./route");
const path_1 = __importDefault(require("path"));
/**
 * Classe criada para redirecionar os visitantes para a seção de documentação
 * caso acessem uma rota ou endereço inválidos
 */
class Raiz extends route_1.RootRoute {
    constructor(app) {
        super(app, 'RaizRoute');
    }
    redirectToDocumentation(req, res) {
        res.redirect(path_1.default.join('/', 'api', 'docs'));
    }
    setupRoutes() {
        this.app.all('*', this.redirectToDocumentation);
        return this.app;
    }
}
exports.Raiz = Raiz;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFpei5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3JvdXRlcy9yYWl6LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUFvQztBQUNwQyxnREFBd0I7QUFHeEI7OztHQUdHO0FBQ0gsTUFBYSxJQUFLLFNBQVEsaUJBQVM7SUFFakMsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pCLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ2pFLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDN0MsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUE7UUFDL0MsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFBO0lBQ2pCLENBQUM7Q0FDRjtBQWRELG9CQWNDIn0=