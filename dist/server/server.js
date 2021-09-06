"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// FRAMEWORK
const express_1 = __importDefault(require("express"));
// EXTRAS
const path_1 = __importDefault(require("path"));
// DEBUG
const debug_1 = __importDefault(require("debug"));
// ERROS
const AppError = require('./../errorhandlers/appError');
const GlobalErrorHandler = require('./../errorhandlers/errors.middleware');
// WINSTON (LOGS):
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
// SWAGGER (documentaão)
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_setup_1 = __importDefault(require("./swagger.setup"));
// CORS: nesta etapa inicial, vai estar liberado para todos
const cors_1 = __importDefault(require("cors"));
const raiz_1 = require("../routes/raiz");
const pacientes_route_1 = require("./../routes/pacientes.route");
const medicos_route_1 = require("./../routes/medicos.route");
const pedidos_route_1 = require("./../routes/pedidos.route");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = Number(process.env.PORT) || 3000;
        this.HOST = process.env.HOST || 'localhost';
        this.routes = [];
        this.log = (0, debug_1.default)('APP: server');
        this.isRunning = false;
        // Retorna express.Application
        this.getApp = () => this.app;
        this.configuracaoInicial();
        this.configuracaoLogs();
        this.configuracaoRotas();
        this.configuracaoErrorHandling();
    }
    configuracaoInicial() {
        this.log('Configuração inicial...');
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
    }
    configuracaoLogs() {
        this.log('Configurando suporte avançado de logs & documentação');
        const winstonOptions = {
            transports: [new winston.transports.Console()],
            format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
        };
        if (!process.env.DEBUG) {
            winstonOptions.meta = false;
            // Se estivermos testando, vamos reduzir ao máximo a interação do Winston com o terminal
            if (typeof global.it === 'function') {
                winstonOptions.level = 'http';
            }
        }
        this.app.use(expressWinston.logger(winstonOptions));
        const apiDocs = path_1.default.join(process.env.ROUTES_PREFIX || '/api/', 'docs');
        this.app.use(apiDocs, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_setup_1.default));
    }
    configuracaoRotas() {
        this.log('Iniciando rotas...');
        this.routes.push(new pacientes_route_1.PacientesRoutes(this.app));
        this.routes.push(new medicos_route_1.MedicosRoutes(this.app));
        this.routes.push(new pedidos_route_1.PedidosRoutes(this.app));
        this.routes.push(new raiz_1.Raiz(this.app));
    }
    configuracaoErrorHandling() {
        // Erro exibido para o cliente caso acesse um endereço não existente
        this.app.use((req, res, next) => {
            next(new AppError(`Não foi possível encontrar ${req.originalUrl.toUpperCase()}`, 404));
        });
        this.app.use(GlobalErrorHandler);
    }
    iniciarServidor() {
        if (this.isRunning) {
            console.log(`Servidor está operando na porta ${this.PORT}`);
        }
        else {
            this.log('Iniciando servidor...');
            this.server = this.app.listen(this.PORT, this.HOST, () => {
                const mensagem = `Servidor em operação na porta ${this.PORT}`;
                this.log(mensagem);
                console.log(mensagem);
                this.isRunning = true;
            });
        }
        return this.server;
    }
    pararServidor() {
        if (!this.isRunning) {
            this.log('Servidor não está em operação...');
        }
        else {
            this.log('Encerrando servidor...');
            this.server.close(() => {
                this.log('Servidor encerrado');
                this.isRunning = false;
            });
        }
    }
}
exports.default = new Server();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VydmVyL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxZQUFZO0FBQ1osc0RBQTZCO0FBRTdCLFNBQVM7QUFDVCxnREFBdUI7QUFFdkIsUUFBUTtBQUNSLGtEQUF5QjtBQUV6QixRQUFRO0FBQ1IsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUE7QUFDdkQsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtBQUUxRSxrQkFBa0I7QUFDbEIsaURBQWtDO0FBQ2xDLGdFQUFpRDtBQUVqRCx3QkFBd0I7QUFDeEIsNEVBQTBDO0FBQzFDLG9FQUEwQztBQUUxQywyREFBMkQ7QUFDM0QsZ0RBQXVCO0FBSXZCLHlDQUFxQztBQUNyQyxpRUFBNkQ7QUFDN0QsNkRBQXlEO0FBQ3pELDZEQUF5RDtBQUV6RCxNQUFNLE1BQU07SUFVVjtRQVJBLFFBQUcsR0FBd0IsSUFBQSxpQkFBTyxHQUFFLENBQUE7UUFFcEMsU0FBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQTtRQUN2QyxTQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFBO1FBQ3RDLFdBQU0sR0FBcUIsRUFBRSxDQUFBO1FBQzdCLFFBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsYUFBYSxDQUFDLENBQUE7UUFDM0MsY0FBUyxHQUFZLEtBQUssQ0FBQTtRQXFGMUIsOEJBQThCO1FBQzlCLFdBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFBO1FBbkZyQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtRQUMxQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN2QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtRQUN4QixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUNsQyxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQTtRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsY0FBSSxHQUFFLENBQUMsQ0FBQTtJQUN0QixDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzREFBc0QsQ0FBQyxDQUFBO1FBRWhFLE1BQU0sY0FBYyxHQUFpQztZQUNuRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUNyQixPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUN2QztTQUNGLENBQUE7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDdEIsY0FBYyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUE7WUFDM0Isd0ZBQXdGO1lBQ3hGLElBQUksT0FBTyxNQUFNLENBQUMsRUFBRSxLQUFLLFVBQVUsRUFBRTtnQkFDbkMsY0FBYyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUE7YUFDOUI7U0FDRjtRQUVELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUVuRCxNQUFNLE9BQU8sR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsNEJBQVMsQ0FBQyxLQUFLLEVBQUUsNEJBQVMsQ0FBQyxLQUFLLENBQUMsdUJBQVksQ0FBQyxDQUFDLENBQUE7SUFDdkUsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksNkJBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0lBRUQseUJBQXlCO1FBQ3ZCLG9FQUFvRTtRQUNwRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQixFQUFFLEVBQUU7WUFDdkYsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLDhCQUE4QixHQUFHLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUN4RixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7U0FDNUQ7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtZQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ3ZELE1BQU0sUUFBUSxHQUFHLGlDQUFpQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQzdELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO1lBQ3ZCLENBQUMsQ0FBQyxDQUFBO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDcEIsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUE7U0FDN0M7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtnQkFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUE7WUFDeEIsQ0FBQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7Q0FLRjtBQUVELGtCQUFlLElBQUksTUFBTSxFQUFFLENBQUEifQ==