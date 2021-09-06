import mongoose from 'mongoose'
const adaptFieldsWithID = require('./utils/adaptFieldsWithID')

const PedidosModel = new mongoose.Schema({
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
    validate: [(val: any) => val.length > 0, 'Para criar um pedido, é preciso que tenha sido solicitado pelo menos um exame']
  }
})

PedidosModel.set('toObject', {
  transform: adaptFieldsWithID
})

PedidosModel.set('toJSON', {
  transform: adaptFieldsWithID
})

const Pedido = mongoose.model('Pedido', PedidosModel)

export default Pedido