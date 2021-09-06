"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdaptFields = require('./utils/adaptFields');
const MedicosModel = new mongoose_1.default.Schema({
    crm: {
        type: String,
        required: [true, 'Por favor, informe o CRM do médico'],
        unique: [true, 'Esse número de CRM já se encontra registrado na base de dados']
    },
    nome: {
        type: String,
        required: [true, 'Por favor, informe o nome do médico']
    },
    estado_conselho: String,
    tipo_conselho: String,
});
MedicosModel.set('toObject', {
    transform: AdaptFields
});
MedicosModel.set('toJSON', {
    transform: AdaptFields
});
const Medico = mongoose_1.default.model('Medico', MedicosModel);
exports.default = Medico;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWNvLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbW9kZWxzL21lZGljby5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUErQjtBQUMvQixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUVsRCxNQUFNLFlBQVksR0FBRyxJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLG9DQUFvQyxDQUFDO1FBQ3RELE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSwrREFBK0QsQ0FBQztLQUNoRjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLHFDQUFxQyxDQUFDO0tBQ3hEO0lBQ0QsZUFBZSxFQUFFLE1BQU07SUFDdkIsYUFBYSxFQUFFLE1BQU07Q0FDdEIsQ0FBQyxDQUFBO0FBRUYsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7SUFDM0IsU0FBUyxFQUFFLFdBQVc7Q0FDdkIsQ0FBQyxDQUFBO0FBRUYsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7SUFDekIsU0FBUyxFQUFFLFdBQVc7Q0FDdkIsQ0FBQyxDQUFBO0FBRUYsTUFBTSxNQUFNLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFBO0FBRXJELGtCQUFlLE1BQU0sQ0FBQSJ9