"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adaptFieldsWithID = require('./utils/adaptFieldsWithID');
const PedidosModel = new mongoose_1.default.Schema({
    paciente: {
        type: String,
        required: [true, 'Para formalizar um pedido, é necessário informar o CPF do paciente cadastrado no sistema']
    },
    medico: {
        type: String,
        required: [true, 'Para formalizar um pedido, é necessário informar o número de registro (CRM) do médico ']
    },
    validade: {
        type: Date,
        default: Date.now()
    },
    exames: {
        type: [String],
        required: [true, 'Para criar um pedido, é preciso incluir ao menos um exame'],
        validate: [(val) => val.length > 0, 'Para criar um pedido, é preciso que tenha sido solicitado pelo menos um exame']
    }
});
PedidosModel.set('toObject', {
    transform: adaptFieldsWithID
});
PedidosModel.set('toJSON', {
    transform: adaptFieldsWithID
});
const Pedido = mongoose_1.default.model('Pedido', PedidosModel);
exports.default = Pedido;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVkaWRvLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbW9kZWxzL3BlZGlkby5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUErQjtBQUMvQixNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0FBRTlELE1BQU0sWUFBWSxHQUFHLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUM7SUFDdkMsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsMEZBQTBGLENBQUM7S0FDN0c7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSx3RkFBd0YsQ0FBQztLQUMzRztJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7S0FDcEI7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDZCxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsMkRBQTJELENBQUM7UUFDN0UsUUFBUSxFQUFFLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLCtFQUErRSxDQUFDO0tBQzFIO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7SUFDM0IsU0FBUyxFQUFFLGlCQUFpQjtDQUM3QixDQUFDLENBQUE7QUFFRixZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtJQUN6QixTQUFTLEVBQUUsaUJBQWlCO0NBQzdCLENBQUMsQ0FBQTtBQUVGLE1BQU0sTUFBTSxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQTtBQUVyRCxrQkFBZSxNQUFNLENBQUEifQ==