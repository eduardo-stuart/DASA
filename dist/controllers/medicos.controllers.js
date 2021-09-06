"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = require('./../errorhandlers/catchAsync');
const AppError = require('./../errorhandlers/appError');
const medico_model_1 = __importDefault(require("./../models/medico.model"));
class MedicosController {
    constructor() {
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
        this.listMedicos = catchAsync(async (req, res) => {
            const medicos = await medico_model_1.default.find().exec();
            return res.status(200).json({
                status: 'success',
                results: medicos.length,
                data: {
                    medicos
                }
            });
        });
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
        this.getMedicoByCRM = catchAsync(async (req, res, next) => {
            const medico = await medico_model_1.default.findOne({ crm: req.params.crm }).exec();
            if (!medico) {
                return next(new AppError(`Médico com CRM ${req.params.crm} não encontrado`, 404));
            }
            res.status(200).json({
                status: 'success',
                data: medico
            });
        });
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
        this.addMedico = catchAsync(async (req, res) => {
            const fields = this.filterFields(req);
            const medico = await medico_model_1.default.create(fields);
            res.status(201).json({
                status: 'success',
                data: {
                    medico
                }
            });
        });
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
        this.deleteMedicoByCRM = catchAsync(async (req, res, next) => {
            const deleted = await medico_model_1.default.findOneAndDelete({ crm: req.params.crm }).exec();
            if (!deleted) {
                return next(new AppError(`Médico com CRM ${req.params.crm} não encontrado`, 404));
            }
            return res.status(204).send();
        });
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
        this.patchMedicoByCRM = catchAsync(async (req, res, next) => {
            const fields = this.filterFields(req);
            // Não deixe alterar o CRM!
            if (fields.crm)
                delete fields.crm;
            const medico = await medico_model_1.default.findOneAndUpdate({ crm: req.params.crm }, fields, { returnOriginal: false, runValidators: true });
            if (!medico) {
                return next(new AppError(`Médico com CRM ${req.params.crm} não encontrado`, 404));
            }
            return res.status(200).json({
                status: 'success',
                data: {
                    medico
                }
            });
        });
    }
    filterFields(req) {
        // Captura somente os campos que serão gravados no banco de dados
        const { crm, nome, estado_conselho, tipo_conselho } = req.body;
        return { crm, nome, estado_conselho, tipo_conselho };
    }
}
exports.default = new MedicosController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWNvcy5jb250cm9sbGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL21lZGljb3MuY29udHJvbGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQTtBQUMzRCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtBQUV2RCw0RUFBNkM7QUFJN0MsTUFBTSxpQkFBaUI7SUFBdkI7UUFFRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBMkJHO1FBRUg7Ozs7OztXQU1HO1FBRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQTJCRztRQUNILGdCQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsRUFBRTtZQUU3RSxNQUFNLE9BQU8sR0FBRyxNQUFNLHNCQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7WUFFMUMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTTtnQkFDdkIsSUFBSSxFQUFFO29CQUNKLE9BQU87aUJBQ1I7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtRQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBeUJFO1FBQ0YsbUJBQWMsR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQixFQUFFLEVBQUU7WUFDNUcsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7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