"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = require('./../errorhandlers/catchAsync');
const AppError = require('./../errorhandlers/appError');
const pedido_model_1 = __importDefault(require("./../models/pedido.model"));
class PedidosController {
    constructor() {
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
        this.listPedidos = catchAsync(async (req, res) => {
            const pedidos = await pedido_model_1.default.find().exec();
            return res.status(200).json({
                status: 'success',
                results: pedidos.length,
                data: {
                    pedidos
                }
            });
        });
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
        this.getPedidoByID = catchAsync(async (req, res, next) => {
            const pedido = await pedido_model_1.default.findOne({ _id: req.params.id }).exec();
            if (!pedido) {
                return next(new AppError(`Pedido com ID ${req.params.id} não encontrado`, 404));
            }
            res.status(200).json({
                status: 'success',
                data: pedido
            });
        });
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
        this.addPedido = catchAsync(async (req, res) => {
            const fields = this.filterFields(req);
            const pedido = await pedido_model_1.default.create(fields);
            res.status(201).json({
                status: 'success',
                data: {
                    pedido
                }
            });
        });
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
        this.deletePedidoByID = catchAsync(async (req, res, next) => {
            const deleted = await pedido_model_1.default.findOneAndDelete({ _id: req.params.id }).exec();
            if (!deleted) {
                return next(new AppError(`Pedido com ID ${req.params.crm} não encontrado`, 404));
            }
            return res.status(204).send();
        });
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
        this.patchPedidoByID = catchAsync(async (req, res, next) => {
            const fields = this.filterFields(req);
            const pedido = await pedido_model_1.default.findOneAndUpdate({ _id: req.params.id }, fields, { returnOriginal: false, runValidators: true });
            if (!pedido) {
                return next(new AppError(`Pedido com ID ${req.params.crm} não encontrado`, 404));
            }
            return res.status(200).json({
                status: 'success',
                data: {
                    pedido
                }
            });
        });
    }
    filterFields(req) {
        // Captura somente os campos que serão gravados no banco de dados
        const { paciente, medico, validade, exames } = req.body;
        return { paciente, medico, validade, exames };
    }
}
exports.default = new PedidosController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVkaWRvcy5jb250cm9sbGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL3BlZGlkb3MuY29udHJvbGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQTtBQUMzRCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtBQUV2RCw0RUFBNkM7QUFJN0MsTUFBTSxpQkFBaUI7SUFBdkI7UUFFRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQ0c7UUFFSDs7Ozs7V0FLRztRQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUEyQkU7UUFDRixnQkFBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsR0FBb0IsRUFBRSxHQUFxQixFQUFFLEVBQUU7WUFFN0UsTUFBTSxPQUFPLEdBQUcsTUFBTSxzQkFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO1lBRTFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU07Z0JBQ3ZCLElBQUksRUFBRTtvQkFDSixPQUFPO2lCQUNSO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXlCRTtRQUNGLGtCQUFhLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEIsRUFBRSxFQUFFO1lBQzNHLE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO1lBRWxFLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO2FBQ2hGO1lBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixJQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQTtRQUVKLENBQUMsQ0FBQyxDQUFBO1FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQThCRztRQUNILGNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO1lBQzNFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQWEsR0FBRyxDQUFDLENBQUE7WUFDakQsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMxQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLElBQUksRUFBRTtvQkFDSixNQUFNO2lCQUNQO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW1CRztRQUNILHFCQUFnQixHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUM5RyxNQUFNLE9BQU8sR0FBRyxNQUFNLHNCQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO1lBRTVFLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO2FBQ2pGO1lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQy9CLENBQUMsQ0FBQyxDQUFBO1FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQThCRztRQUNILG9CQUFlLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEIsRUFBRSxFQUFFO1lBQzdHLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQWMsR0FBRyxDQUFDLENBQUE7WUFFbEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBTSxDQUFDLGdCQUFnQixDQUMxQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUN0QixNQUFNLEVBQ04sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FDL0MsQ0FBQTtZQUVELElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO2FBQ2pGO1lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLElBQUksRUFBRTtvQkFDSixNQUFNO2lCQUNQO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFjSixDQUFDO0lBWEMsWUFBWSxDQUFJLEdBQW9CO1FBQ2xDLGlFQUFpRTtRQUNqRSxNQUFNLEVBQ0osUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNQLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUNaLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQWtCLENBQUE7SUFDL0QsQ0FBQztDQUVGO0FBRUQsa0JBQWUsSUFBSSxpQkFBaUIsRUFBRSxDQUFBIn0=