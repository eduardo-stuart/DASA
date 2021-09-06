import server from '../server/server'
require('./../db/mongoose.connection')
import supertest from 'supertest'
import { expect } from 'chai'

const ENDPOINT = '/api/medicos/'

const novoMedico = {
  crm: '9999934ES',
  nome: 'TESTE'
}

describe('Seção: Médicos', function () {
  let request: supertest.SuperAgentTest
  before(function () {
    request = supertest.agent(server.getApp())
  })

  after(function (done) {
    server.pararServidor()
    done()
  })


  it('deveria permitir adicionar novo médico', async function () {
    const res = await request.post(ENDPOINT).send(novoMedico)

    expect(res.status).to.equal(201)
    expect(res.body).not.to.be.empty
    expect(res.body).to.be.an('object')
  })

  it('deveria permitir obter um GET em /api/medicos/ e ter um ou mais registros', async function () {
    const res = await request.get(ENDPOINT)

    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    const data = res.body
    expect(data.results).to.be.greaterThan(0)
  })

  it('deveria retornar o registro do médico recém-criado', async function () {
    const res = await request.get(`${ENDPOINT}${novoMedico.crm}`)
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    expect(res.body).to.be.an('object')
    const data = res.body.data
    expect(data.nome).to.be.equal(novoMedico.nome)
  })

  it('não deveria permitir adicionar um novo médico com um número repetido de CRM', async function () {
    const res = await request.post(ENDPOINT).send({
      crm: novoMedico.crm,
      nome: 'Pedro'
    })
    expect(res.status).to.equal(400)
  })

  it('deveria retornar um erro caso façamos uma busca por um CRM não cadastrado', async function () {
    const res = await request.get(`${ENDPOINT}2398`)
    expect(res.status).to.equal(404)
  })

  it('deveria permitir alterar alguns dados do médico recém-criado', async function () {
    const res = await request.patch(`${ENDPOINT}${novoMedico.crm}`).send({
      nome: 'TESTE 2',
      tipo_conselho: 'NENHUM'
    })
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    const data = res.body.data
    expect(data.nome).not.be.equal(novoMedico.nome)

  })

  it('deveria permitir apagar médico recém-criado', async function () {
    const res = await request.delete(`${ENDPOINT}${novoMedico.crm}`)
    expect(res.status).to.equal(204)

  })


})