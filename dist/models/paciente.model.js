"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdaptFields = require('./utils/adaptFields');
const PacientesModel = new mongoose_1.default.Schema({
    cpf: {
        type: String,
        required: [true, 'Por favor, informe o CPF do paciente'],
        unique: [true, 'Esse CPF já se encontra cadastrado no sistema'],
        match: [/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/, 'Por favor, informe um CPF válido']
    },
    nome: {
        type: String,
        required: [true, 'Por favor, informe o nome do paciente']
    },
    nascimento: {
        type: Date,
        default: Date.now(),
        required: [true, 'Por favor, informe a data de nascimento do paciente']
    },
    sexo: {
        type: String,
        enum: ['MASCULINO', 'FEMININO', 'OUTRO'],
        default: 'OUTRO',
        message: '{VALUE}: valor não suportado'
    },
    nome_da_mae: String,
    endereco: {
        type: String,
        required: [true, 'Por favor, informe o endereço do paciente']
    },
    telefone: {
        type: String,
        required: [true, 'Por favor, informe o número de telefone do paciente'],
        match: [/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
            'Por favor, informe um número de telefone válido'],
    },
    email: {
        type: String,
        required: [true, 'Por favor, informe o e-mail do paciente'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Por favor, informe um e-mail válido'],
    },
    rg: {
        type: String,
        match: [/(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/, 'Por favor, informe um RG válido']
    }
});
PacientesModel.set('toObject', {
    transform: AdaptFields
});
PacientesModel.set('toJSON', {
    transform: AdaptFields
});
const Paciente = mongoose_1.default.model('Paciente', PacientesModel);
exports.default = Paciente;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFjaWVudGUubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9tb2RlbHMvcGFjaWVudGUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBK0I7QUFDL0IsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUE7QUFFbEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztJQUN6QyxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxzQ0FBc0MsQ0FBQztRQUN4RCxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsK0NBQStDLENBQUM7UUFDL0QsS0FBSyxFQUFFLENBQUMsaUNBQWlDLEVBQUUsa0NBQWtDLENBQUM7S0FDL0U7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSx1Q0FBdUMsQ0FBQztLQUMxRDtJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDbkIsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLHFEQUFxRCxDQUFDO0tBQ3hFO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQztRQUN4QyxPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsOEJBQThCO0tBQ3hDO0lBQ0QsV0FBVyxFQUFFLE1BQU07SUFDbkIsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsMkNBQTJDLENBQUM7S0FDOUQ7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxxREFBcUQsQ0FBQztRQUN2RSxLQUFLLEVBQUUsQ0FBQyxzRkFBc0Y7WUFDNUYsaURBQWlELENBQUM7S0FDckQ7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSx5Q0FBeUMsQ0FBQztRQUMzRCxLQUFLLEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRSxxQ0FBcUMsQ0FBQztLQUN0RjtJQUNELEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osS0FBSyxFQUFFLENBQUMsNENBQTRDLEVBQUUsaUNBQWlDLENBQUM7S0FDekY7Q0FDRixDQUFDLENBQUE7QUFFRixjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtJQUM3QixTQUFTLEVBQUUsV0FBVztDQUN2QixDQUFDLENBQUE7QUFFRixjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtJQUMzQixTQUFTLEVBQUUsV0FBVztDQUN2QixDQUFDLENBQUE7QUFFRixNQUFNLFFBQVEsR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUE7QUFFM0Qsa0JBQWUsUUFBUSxDQUFBIn0=