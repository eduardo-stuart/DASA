"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError = require('./../errorhandlers/appError');
const catchAsync = require('./../errorhandlers/catchAsync');
const paciente_model_1 = __importDefault(require("./../models/paciente.model"));
class PacientesController {
    constructor() {
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
        this.listPacientes = catchAsync(async (req, res, next) => {
            const pacientes = await paciente_model_1.default.find().exec();
            return res.status(200).json({
                status: 'success',
                results: pacientes.length,
                data: {
                    pacientes
                }
            });
        });
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
        this.getPacienteByCPF = catchAsync(async (req, res, next) => {
            const paciente = await paciente_model_1.default.findOne({ cpf: req.params.pacienteCPF }).exec();
            if (!paciente)
                return next(new AppError(`Paciente com CPF ${req.params.pacienteCPF} não encontrado`, 404));
            return res.status(200).json({
                status: 'success',
                data: paciente
            });
        });
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
        this.addPaciente = catchAsync(async (req, res) => {
            const fields = this.filterFields(req);
            const paciente = await paciente_model_1.default.create(fields);
            res.status(201).json({
                status: 'success',
                data: {
                    paciente
                }
            });
        });
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
        this.deletePacienteByCPF = catchAsync(async (req, res, next) => {
            const deleted = await paciente_model_1.default.findOneAndDelete({ cpf: req.params.pacienteCPF }).exec();
            if (!deleted) {
                return next(new AppError(`Paciente com CPF ${req.params.pacienteCPF} não encontrado`, 404));
            }
            return res.status(204).send();
        });
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
        this.patchPacienteByCPF = catchAsync(async (req, res, next) => {
            const fields = this.filterFields(req);
            // Por segurança, e para manter a integridade, não será permitido alterar o número de CPF
            if (fields.cpf)
                delete fields.cpf;
            const paciente = await paciente_model_1.default.findOneAndUpdate({ cpf: req.params.pacienteCPF }, fields, { returnOriginal: false, runValidators: true });
            if (!paciente) {
                return next(new AppError(`Paciente com CPF ${req.params.pacienteCPF} não encontrado`, 404));
            }
            return res.status(200).json({
                status: 'success',
                data: {
                    paciente
                }
            });
        });
    }
    filterFields(req) {
        // Captura somente os campos que serão gravados no banco de dados
        const { nome, nascimento, sexo, nome_da_mae, endereco, telefone, email, cpf, rg } = req.body;
        return { nome, nascimento, sexo, nome_da_mae, endereco, telefone, email, cpf, rg };
    }
}
exports.default = new PacientesController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFjaWVudGVzLmNvbnRyb2xsZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvcGFjaWVudGVzLmNvbnRyb2xsZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUE7QUFDdkQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUE7QUFFM0QsZ0ZBQWlEO0FBS2pELE1BQU0sbUJBQW1CO0lBQXpCO1FBRUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW1ERztRQUVIOzs7OztXQUtHO1FBRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQTJCRztRQUNILGtCQUFhLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEIsRUFBRSxFQUFFO1lBRTNHLE1BQU0sU0FBUyxHQUFHLE1BQU0sd0JBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUU5QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUMxQixNQUFNLEVBQUUsU0FBUztnQkFDakIsT0FBTyxFQUFFLFNBQVMsQ0FBQyxNQUFNO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0osU0FBUztpQkFDVjthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO1FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0F5Qkc7UUFDSCxxQkFBZ0IsR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQixFQUFFLEVBQUU7WUFFOUcsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxD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