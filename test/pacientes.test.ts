import server from '../server/server'
require('./../db/mongoose.connection')
import supertest from 'supertest'
import { expect } from 'chai'

const ENDPOINT = '/api/pacientes/'

const novo = {
  cpf: '99911199955',
  nome: 'PACIENTE-TESTE',
  nascimento: '1999-01-01',
  endereco: 'Rua das Acácias',
  telefone: '984498984',
  email: 'none@moment.ok'
}

describe('Seção: Pacientes', function () {
  let request: supertest.SuperAgentTest
  before(function () {
    request = supertest.agent(server.getApp())
  })

  after(function (done) {
    server.pararServidor()
    done()
  })


  it('deveria permitir adicionar novo paciente', async function () {
    const res = await request.post(ENDPOINT).send(novo)

    expect(res.status).to.equal(201)
    expect(res.body).not.to.be.empty
    expect(res.body).to.be.an('object')
  })

  it('deveria permitir obter um GET em /api/pacientes/ e ter um ou mais registros', async function () {
    const res = await request.get(ENDPOINT)

    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    const data = res.body
    expect(data.results).to.be.greaterThan(0)
  })

  it('deveria retornar o registro do paciente recém-criado', async function () {
    const res = await request.get(`${ENDPOINT}${novo.cpf}`)

    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    expect(res.body).to.be.an('object')
    const data = res.body.data
    expect(data.nome).to.be.equal(novo.nome)
  })

  it('não deveria permitir adicionar um novo paciete com um número repetido de CPF', async function () {
    const res = await request.post(ENDPOINT).send(novo)
    expect(res.status).to.equal(400)
  })

  it('deveria retornar um erro caso façamos uma busca por um CPF não cadastrado', async function () {
    const res = await request.get(`${ENDPOINT}2398`)
    expect(res.status).to.equal(404)
  })

  it('deveria permitir alterar alguns dados do paciente recém-criado', async function () {
    const res = await request.patch(`${ENDPOINT}${novo.cpf}`).send({
      nome: 'SARADO'
    })
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    const data = res.body.data
    expect(data.nome).not.be.equal(novo.nome)
  })

  it('deveria permitir apagar paciente recém-criado', async function () {
    const res = await request.delete(`${ENDPOINT}${novo.cpf}`)
    expect(res.status).to.equal(204)
  })


})