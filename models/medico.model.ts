import mongoose from 'mongoose'
const AdaptFields = require('./utils/adaptFields')

const MedicosModel = new mongoose.Schema({
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
})

MedicosModel.set('toObject', {
  transform: AdaptFields
})

MedicosModel.set('toJSON', {
  transform: AdaptFields
})

const Medico = mongoose.model('Medico', MedicosModel)

export default Medico