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

/*************************************************************************
 * ERROR HANDLING
 * Se ocorrer uma exceção que não for tratada pelo código, encerra o processo
 */
require('./errorhandlers/unhandledExceptionHandler')

/*************************************************************************
 * SERVIDOR
*/
import Server from './server/server'

/*************************************************************************
 * BANCO DE DADOS
 * Para esse projeto, está sendo usado o MongoDB, rodando em uma imagem docker
*/
require('./db/mongoose.connection')

/*************************************************************************
 * TUDO PRONTO!
*/

export default Server.iniciarServidor()

