import express from 'express'
const catchAsync = require('./../errorhandlers/catchAsync')
const AppError = require('./../errorhandlers/appError')

import Pedido from './../models/pedido.model'
import { PedidoPost } from './../models/dtos/pedido.post.dto'
import { PedidoPatch } from './../models/dtos/pedido.patch.dto'

class PedidosController {

  /**
   * @swagger
   * components:
   *  schemas:
   *    Pedido:
   *      type: object
   *      required:
   *        - paciente
   *        - medico
   *        - exames
   *      properties:
   *        id:
   *          type: string
   *          description: Identificador único desse pedido; é gerado automaticamente ao criar um novo pedido
   *        paciente:
   *          type: string
   *          description: CPF do paciente
   *        medico:
   *          type: string
   *          description: CRM do médico
   *        validade:
   *          type: Date
   *          description: Data de validade do pedido médico; por default, é a data corrente; deve usar o formato AAAA-MM-DD
   *        exames:
   *          type: [string]
   *          description: Relação de exames solicitados
   *      example:
   *        id: 93as9da88e309qda8
   *        paciente: 123.456.789-10
   *        medico: 123456/RJ
   *        validade: 2022-12-25
   *        exames: ['Exame de Sangue', 'Exame de Vista']
   */

  /**
   * @swagger
   * tags:
   *  name: Pedidos
   *  description: Relação de pedidos médicos
   */

  /**
  * @swagger
  * /api/pedidos:
  *  get:
  *    summary: Retorna a lista completa de pedidos cadastrados no sistema
  *    tags: [Pedidos]
  *    responses:
  *      200:
  *        description: A lista dos pedidos cadastrados no sistema
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                status:
  *                  type: string
  *                  description: Descreve o resultado da requisição; como o resultado foi bem-sucedido, retorna 'success'
  *                results:
  *                  type: number
  *                  default: 1
  *                  descripion: Retorna a quantidade de registros que foram encontrados
  *                data:
  *                  type: array
  *                items:
  *                  $ref: '#/components/schemas/Pedido'
  *      500:
  *       description: Ocorreu algum problema durante a captura da relação de pacientes
  */
  listPedidos = catchAsync(async (req: express.Request, res: express.Response) => {

    const pedidos = await Pedido.find().exec()

    return res.status(200).json({
      status: 'success',
      results: pedidos.length,
      data: {
        pedidos
      }
    })
  })

  /**
  * @swagger
  * /api/pedidos/{id}:
  *  get:
  *    summary: Obtém o registro de um pedido através do seu ID
  *    tags: [Pedidos]
  *    parameters:
  *      - in: path
  *        name: id
  *        schema:
  *          type: string
  *        required: true
  *        description: O ID do pedido
  *    responses:
   *      200:
   *        description: As informações sobre o pedido
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Pedido'
  *      400:
  *        description: Algum dado fornecido não corresponde ao esperado
  *      404:
  *        description: Não foi possível encontrar nenhum pedido com esse ID na base de dados
  * 
  */
  getPedidoByID = catchAsync(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const pedido = await Pedido.findOne({ _id: req.params.id }).exec()

    if (!pedido) {
      return next(new AppError(`Pedido com ID ${req.params.id} não encontrado`, 404))
    }

    res.status(200).json({
      status: 'success',
      data: pedido
    })

  })

  /**
   * @swagger
   * /api/pedidos:
   *  post:
   *    summary: Adiciona um novo pedido
   *    tags: [Pedidos]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Pedido'
   *    responses:
   *      201:
   *        description: O pedido foi adicionado com sucesso na base de dados
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  default: success
   *                  description: Descreve o resultado da operação
   *                data:
   *                   $ref: '#/components/schemas/Pedido'
   *      400:
   *        description: Um ou mais campos possuem dados duplicados
   *      500:
   *        description: Ocorreu um erro durante a inclusão do registro do paciente
   */
  addPedido = catchAsync(async (req: express.Request, res: express.Response) => {
    const fields = this.filterFields<PedidoPost>(req)
    const pedido = await Pedido.create(fields)
    res.status(201).json({
      status: 'success',
      data: {
        pedido
      }
    })
  })

  /**
   * @swagger
   * /api/pedidos/{id}:
   *  delete:
   *    summary: Remove o pedido com o ID especificado da base de dados
   *    tags: [Pedidos]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: O ID do pedido
   *    responses:
   *      204:
   *        description: Os dados do pedido foram removidos com sucesso
   *      400:
   *        description: Não foi encontrado um pedido com essa identificação (ID)
   * 
   */
  deletePedidoByID = catchAsync(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const deleted = await Pedido.findOneAndDelete({ _id: req.params.id }).exec()

    if (!deleted) {
      return next(new AppError(`Pedido com ID ${req.params.crm} não encontrado`, 404))
    }

    return res.status(204).send()
  })

  /**
   * @swagger
   * /api/pedidos/{id}:
   *  patch:
   *    summary: Atualiza as informações de um pedido
   *    tags: [Pedidos]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: O ID do pedido
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Pedido'
   *    responses:
   *      200:
   *        description: As informações do pedido foram atualizadas com sucesso
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Pedido'
   *      404:
   *        description: O pedido não foi encontrado
   *      500:
   *        description: Ocorreu algum erro durante o procedimento
   */
  patchPedidoByID = catchAsync(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const fields = this.filterFields<PedidoPatch>(req)

    const pedido = await Pedido.findOneAndUpdate(
      { _id: req.params.id },
      fields,
      { returnOriginal: false, runValidators: true }
    )

    if (!pedido) {
      return next(new AppError(`Pedido com ID ${req.params.crm} não encontrado`, 404))
    }

    return res.status(200).json({
      status: 'success',
      data: {
        pedido
      }
    })
  })


  filterFields<T>(req: express.Request): T {
    // Captura somente os campos que serão gravados no banco de dados
    const {
      paciente,
      medico,
      validade,
      exames
    } = req.body
    return { paciente, medico, validade, exames } as unknown as T
  }

}

export default new PedidosController()