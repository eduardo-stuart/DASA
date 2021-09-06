import mongoose from 'mongoose'
const AdaptFields = require('./utils/adaptFields')

const PacientesModel = new mongoose.Schema({
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
})

PacientesModel.set('toObject', {
  transform: AdaptFields
})

PacientesModel.set('toJSON', {
  transform: AdaptFields
})

const Paciente = mongoose.model('Paciente', PacientesModel)

export default Paciente
