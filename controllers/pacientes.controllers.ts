import express from 'express'
const AppError = require('./../errorhandlers/appError')
const catchAsync = require('./../errorhandlers/catchAsync')

import Paciente from './../models/paciente.model'
import { PacientePost } from '../models/dtos/paciente.post.dto'
import { PacientePatch } from '../models/dtos/paciente.patch.dto'


class PacientesController {

  /**
   * @swagger
   * components:
   *  schemas:
   *    Paciente:
   *      type: object
   *      required:
   *        - cpf
   *        - nome
   *        - nascimento
   *        - endereco
   *        - telefone
   *        - email
   *      properties:
   *        cpf:
   *          type: string
   *          description: CPF do paciente
   *        nome:
   *          type: string
   *          description: Nome do paciente
   *        nascimento:
   *          type: string
   *          description: Data de nascimento do paciente; deve estar no formato AAAA-MM-DD
   *        sexo:
   *          type: string
   *          description: Gênero do paciente; pode somente assumir os valores MASCULINO, FEMININO ou OUTROS
   *        nome_da_mae:
   *          type: string
   *          description: Nome da mãe do paciente
   *        endereco:
   *          type: string
   *          description: Endereço do paciente
   *        telefone:
   *          type: string
   *          description: Telefone do paciente; suporta telefones fixos, celulares, números de outros estados ou países
   *        email:
   *          type: string
   *          description: E-mail de contato do paciente
   *        rg:
   *          type: string
   *          description: RG do paciente
   *      example:
   *        cpf: 12345678901
   *        nome: Eduardo
   *        nascimento: 2010-11-12
   *        sexo: MASCULINO
   *        nome_da_mae: Ana Beatriz
   *        endereco: Rua das Flores, 44
   *        telefone: +55 (21) 98989-8983
   *        email: none@moment.com
   *        rg: 123456789
   */

  /**
   * @swagger
   * tags:
   *  name: Pacientes
   *  description: Pacientes/clientes
   */

  /**
   * @swagger
   * /api/pacientes:
   *  get:
   *    summary: Retorna a lista completa de pacientes
   *    tags: [Pacientes]
   *    responses:
   *      200:
   *        description: A lista de pacientes
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
   *                  $ref: '#/components/schemas/Paciente'
   *      500:
   *        description: Ocorreu algum problema durante a captura da relação de pacientes
   */
  listPacientes = catchAsync(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const pacientes = await Paciente.find().exec()

    return res.status(200).json({
      status: 'success',
      results: pacientes.length,
      data: {
        pacientes
      }
    })
  })

  /**
   * @swagger
   * /api/pacientes/{cpf}:
   *  get:
   *    summary: Obtém um paciente usando sua identificação única (CPF)
   *    tags: [Pacientes]
   *    parameters:
   *      - in: path
   *        name: cpf
   *        schema:
   *          type: string
   *        required: true
   *        description: A identificação única do paciente
   *    responses:
   *      200:
   *        description: Retorna o paciente com a identificação solicitada
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Paciente'
   *      400:
   *        description: Algum dado fornecido não corresponde ao esperado
   *      404:
   *        description: Não foi possível encontrar nenhum paciente com essa identificação (CPF) na base de dados
   * 
   */
  getPacienteByCPF = catchAsync(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const paciente = await Paciente.findOne({ cpf: req.params.pacienteCPF }).exec()

    if (!paciente) return next(new AppError(`Paciente com CPF ${req.params.pacienteCPF} não encontrado`, 404))

    return res.status(200).json({
      status: 'success',
      data: paciente
    })

  })

  /**
   * @swagger
   * /api/pacientes:
   *  post:
   *    summary: Adiciona um novo paciente
   *    tags: [Pacientes]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Paciente'
   *    responses:
   *      201:
   *        description: O paciente foi adicionado com sucesso na base de dados
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
   *                  $ref: '#/components/schemas/Paciente'
   *      400:
   *        description: Um ou mais campos possuem dados duplicados
   *      500:
   *        description: Ocorreu um erro durante a inclusão do registro do paciente
   */
  addPaciente = catchAsync(async (req: express.Request, res: express.Response) => {
    const fields = this.filterFields<PacientePost>(req)
    const paciente = await Paciente.create(fields)
    res.status(201).json({
      status: 'success',
      data: {
        paciente
      }
    })
  })

  /**
   * @swagger
   * /api/pacientes/{cpf}:
   *  delete:
   *    summary: Remove o registro do paciente na base de dados
   *    tags: [Pacientes]
   *    parameters:
   *      - in: path
   *        name: cpf
   *        schema:
   *          type: string
   *        required: true
   *        description: A identificação única do paciente (CPF)
   *    responses:
   *      204:
   *        description: O paciente foi removido com sucesso
   *      400:
   *        description: Não foi encontrado um paciente com essa identificação (CPF)
   * 
   */
  deletePacienteByCPF = catchAsync(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const deleted = await Paciente.findOneAndDelete({ cpf: req.params.pacienteCPF }).exec()

    if (!deleted) {
      return next(new AppError(`Paciente com CPF ${req.params.pacienteCPF} não encontrado`, 404))
    }

    return res.status(204).send()
  })

  /**
   * @swagger
   * /api/pacientes/{cpf}:
   *  patch:
   *    summary: Atualiza as informações de um paciente
   *    tags: [Pacientes]
   *    parameters:
   *      - in: path
   *        name: cpf
   *        schema:
   *          type: string
   *        required: true
   *        description: A identificação única do paciente (CPF)
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Paciente'
   *    responses:
   *      200:
   *        description: As informações do paciente foram atualizadas com sucesso
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Paciente'
   *      404:
   *        description: O paciente não foi encontrado
   *      500:
   *        description: Ocorreu algum erro durante o procedimento
   */
  patchPacienteByCPF = catchAsync(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const fields = this.filterFields<PacientePatch>(req)

    // Por segurança, e para manter a integridade, não será permitido alterar o número de CPF
    if (fields.cpf) delete fields.cpf

    const paciente = await Paciente.findOneAndUpdate(
      { cpf: req.params.pacienteCPF },
      fields,
      { returnOriginal: false, runValidators: true }
    )

    if (!paciente) {
      return next(new AppError(`Paciente com CPF ${req.params.pacienteCPF} não encontrado`, 404))
    }

    return res.status(200).json({
      status: 'success',
      data: {
        paciente
      }
    })
  })

  filterFields<T>(req: express.Request): T {
    // Captura somente os campos que serão gravados no banco de dados
    const {
      nome,
      nascimento,
      sexo,
      nome_da_mae,
      endereco,
      telefone,
      email,
      cpf,
      rg
    } = req.body
    return { nome, nascimento, sexo, nome_da_mae, endereco, telefone, email, cpf, rg } as unknown as T
  }

}

export default new PacientesController()
