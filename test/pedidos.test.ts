import server from '../server/server'
require('./../db/mongoose.connection')
import supertest from 'supertest'
import { expect } from 'chai'

const ENDPOINT = '/api/pedidos/'

let ID_NOVO = ''
const novo = {
  paciente: '433443443',
  medico: '4243424',
  validade: '2021-01-22',
  exames: [
    'Vista',
    'Sangue',
    'Resistência'
  ]
}

describe('Seção: Pedidos', function () {
  let request: supertest.SuperAgentTest
  before(function () {
    request = supertest.agent(server.getApp())
  })

  after(function (done) {
    server.pararServidor()
    done()
  })


  it('deveria permitir adicionar novo pedido', async function () {
    const res = await request.post(ENDPOINT).send(novo)
    expect(res.status).to.equal(201)
    expect(res.body).not.to.be.empty
    expect(res.body).to.be.an('object')
    ID_NOVO = res.body.data.pedido.id
    expect(ID_NOVO).not.equal('')
  })

  it('deveria permitir obter um GET em /api/pedidos/ e ter um ou mais registros', async function () {
    const res = await request.get(ENDPOINT)
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    const data = res.body
    expect(data.results).to.be.greaterThan(0)
  })

  it('deveria retornar o registro do paciente recém-criado', async function () {
    const res = await request.get(`${ENDPOINT}${ID_NOVO}`)
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    expect(res.body).to.be.an('object')
    const data = res.body.data
    expect(data.paciente).to.be.equal(novo.paciente)
  })


  it('deveria retornar um erro caso façamos uma busca por um ID não cadastrado', async function () {
    const res = await request.get(`${ENDPOINT}2398`)
    expect(res.status).to.equal(404)
  })

  it('deveria permitir alterar alguns dados do pedido recém-criado', async function () {
    const res = await request.patch(`${ENDPOINT}${ID_NOVO}`).send({
      validade: '2022-12-25'
    })
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    const data = res.body.data
    expect(data.validade).not.be.equal(novo.validade)
  })

  it('deveria permitir apagar pedido recém-criado', async function () {
    const res = await request.delete(`${ENDPOINT}${ID_NOVO}`)
    expect(res.status).to.equal(204)
  })


})