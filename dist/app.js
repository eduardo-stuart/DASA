"use strict";
/**
 * DASA ─ Desafio de Programação
 *
 * Projeto desenvolvido por Eduardo Stuart <https://eduardostuart.pro.br>
 * Iniciado no dia 04/09/2021
 * Finalizado em 06/09/2021
 *
 * Mais detalhes sobre o projeto podem ser encontrados no seguinte endereço:
 * https://github.com/eduardo-stuart/DASA
 *
 * 2021
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*************************************************************************
 * ERROR HANDLING
 * Se ocorrer uma exceção que não for tratada pelo código, encerra o processo
 */
require('./errorhandlers/unhandledExceptionHandler');
/*************************************************************************
 * SERVIDOR
*/
const server_1 = __importDefault(require("./server/server"));
/*************************************************************************
 * BANCO DE DADOS
 * Para esse projeto, está sendo usado o MongoDB, rodando em uma imagem docker
*/
require('./db/mongoose.connection');
/*************************************************************************
 * TUDO PRONTO!
*/
exports.default = server_1.default.iniciarServidor();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7R0FXRzs7Ozs7QUFFSDs7O0dBR0c7QUFDSCxPQUFPLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtBQUVwRDs7RUFFRTtBQUNGLDZEQUFvQztBQUVwQzs7O0VBR0U7QUFDRixPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtBQUVuQzs7RUFFRTtBQUVGLGtCQUFlLGdCQUFNLENBQUMsZUFBZSxFQUFFLENBQUEifQ==