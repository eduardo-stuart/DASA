import express from 'express'
const catchAsync = require('./../errorhandlers/catchAsync')
const AppError = require('./../errorhandlers/appError')

import Medico from './../models/medico.model'
import { MedicoPost } from '../models/dtos/medico.post.dto'
import { MedicoPatch } from '../models/dtos/medico.patch.dto'

class MedicosController {

  /**
   * @swagger
   * components:
   *  schemas:
   *    Medico:
   *      type: object
   *      required:
   *        - crm
   *        - nome
   *      properties:
   *        crm:
   *          type: string
   *          description: CRM do médico
   *        nome:
   *          type: string
   *          description: Nome do médico
   *        estado_conselho:
   *          type: string
   *          description: Estado do conselho em que o médico está registrado
   *        tipo_conselho:
   *          type: string
   *          description: Tipo do conselho em que o médico está registrado
   *      example:
   *        crm: 123456/RJ
   *        nome: Pedro Assis
   *        estado_conselho: Rio de Janeiro
   *        tipo_conselho: N/A
   */

  /**
   * @swagger
   * tags:
   *  name: Medicos
   *  description: Médicos cadastrados
   * 
   */

  /**
   * @swagger
   * /api/medicos:
   *  get:
   *    summary: Retorna a lista completa de médicos cadastrados no sistema
   *    tags: [Medicos]
   *    responses:
   *      200:
   *        description: A lista dos médicos cadastrados no sistema
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
   *                  $ref: '#/components/schemas/Medico'
   *      500:
   *       description: Ocorreu algum problema durante a captura da relação de médicos
   */
  listMedicos = catchAsync(async (req: express.Request, res: express.Response) => {

    const medicos = await Medico.find().exec()

    return res.status(200).json({
      status: 'success',
      results: medicos.length,
      data: {
        medicos
      }
    })
  })

  /**
  * @swagger
  * /api/medicos/{crm}:
  *  get:
  *    summary: Obtém o registro de um médico através do seu CRM
  *    tags: [Medicos]
  *    parameters:
  *      - in: path
  *        name: crm
  *        schema:
  *          type: string
  *        required: true
  *        description: O CRM do médico
  *    responses:
   *      200:
   *        description: As informações do médico
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Medico'
  *      400:
  *        description: Algum dado fornecido não corresponde ao esperado
  *      404:
  *        description: Não foi possível encontrar nenhum médico com esse CRM na base de dados
  * 
  */
  getMedicoByCRM = catchAsync(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const medico = await Medico.findOne({ crm: req.params.crm }).exec()

    if (!medico) {
      return next(new AppError(`Médico com CRM ${req.params.crm} não encontrado`, 404))
    }

    res.status(200).json({
      status: 'success',
      data: medico
    })
  })

  /**
   * @swagger
   * /api/medicos:
   *  post:
   *    summary: Adiciona um novo médico
   *    tags: [Medicos]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Medico'
   *    responses:
   *      201:
   *        description: O médico foi adicionado com sucesso na base de dados
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
   *                   $ref: '#/components/schemas/Medico'
   *      400:
   *        description: Um ou mais campos possuem dados duplicados
   *      500:
   *        description: Ocorreu um erro durante a inclusão do registro do médico
   */
  addMedico = catchAsync(async (req: express.Request, res: express.Response) => {
    const fields = this.filterFields<MedicoPost>(req)
    const medico = await Medico.create(fields)
    res.status(201).json({
      status: 'success',
      data: {
        medico
      }
    })
  })

  /**
   * @swagger
   * /api/medicos/{crm}:
   *  delete:
   *    summary: Remove o registro do médico da base de dados
   *    tags: [Medicos]
   *    parameters:
   *      - in: path
   *        name: crm
   *        schema:
   *          type: string
   *        required: true
   *        description: O registro do médico (CRM)
   *    responses:
   *      204:
   *        description: Os dados do médico foram removidos com sucesso
   *      400:
   *        description: Não foi encontrado um médico com essa identificação (CRM)
   * 
   */
  deleteMedicoByCRM = catchAsync(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const deleted = await Medico.findOneAndDelete({ crm: req.params.crm }).exec()

    if (!deleted) {
      return next(new AppError(`Médico com CRM ${req.params.crm} não encontrado`, 404))
    }

    return res.status(204).send()
  })


  /**
   * @swagger
   * /api/medicos/{crm}:
   *  patch:
   *    summary: Atualiza as informações de um médico
   *    tags: [Medicos]
   *    parameters:
   *      - in: path
   *        name: crm
   *        schema:
   *          type: string
   *        required: true
   *        description: O registro do médico (CRM)
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Medico'
   *    responses:
   *      200:
   *        description: As informações do médico foram atualizadas com sucesso
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Medico'
   *      404:
   *        description: O médico não foi encontrado
   *      500:
   *        description: Ocorreu algum erro durante o procedimento
   */
  patchMedicoByCRM = catchAsync(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const fields = this.filterFields<MedicoPatch>(req)

    // Não deixe alterar o CRM!
    if (fields.crm) delete fields.crm

    const medico = await Medico.findOneAndUpdate(
      { crm: req.params.crm },
      fields,
      { returnOriginal: false, runValidators: true }
    )

    if (!medico) {
      return next(new AppError(`Médico com CRM ${req.params.crm} não encontrado`, 404))
    }

    return res.status(200).json({
      status: 'success',
      data: {
        medico
      }
    })
  })

  filterFields<T>(req: express.Request): T {
    // Captura somente os campos que serão gravados no banco de dados
    const {
      crm,
      nome,
      estado_conselho,
      tipo_conselho
    } = req.body
    return { crm, nome, estado_conselho, tipo_conselho } as unknown as T
  }

}

export default new MedicosController()