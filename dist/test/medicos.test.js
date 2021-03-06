"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server/server"));
require('./../db/mongoose.connection');
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const ENDPOINT = '/api/medicos/';
const novoMedico = {
    crm: '9999934ES',
    nome: 'TESTE'
};
describe('Seção: Médicos', function () {
    let request;
    before(function () {
        request = supertest_1.default.agent(server_1.default.getApp());
    });
    after(function (done) {
        server_1.default.pararServidor();
        done();
    });
    it('deveria permitir adicionar novo médico', async function () {
        const res = await request.post(ENDPOINT).send(novoMedico);
        (0, chai_1.expect)(res.status).to.equal(201);
        (0, chai_1.expect)(res.body).not.to.be.empty;
        (0, chai_1.expect)(res.body).to.be.an('object');
    });
    it('deveria permitir obter um GET em /api/medicos/ e ter um ou mais registros', async function () {
        const res = await request.get(ENDPOINT);
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body).not.to.be.empty;
        const data = res.body;
        (0, chai_1.expect)(data.results).to.be.greaterThan(0);
    });
    it('deveria retornar o registro do médico recém-criado', async function () {
        const res = await request.get(`${ENDPOINT}${novoMedico.crm}`);
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body).not.to.be.empty;
        (0, chai_1.expect)(res.body).to.be.an('object');
        const data = res.body.data;
        (0, chai_1.expect)(data.nome).to.be.equal(novoMedico.nome);
    });
    it('não deveria permitir adicionar um novo médico com um número repetido de CRM', async function () {
        const res = await request.post(ENDPOINT).send({
            crm: novoMedico.crm,
            nome: 'Pedro'
        });
        (0, chai_1.expect)(res.status).to.equal(400);
    });
    it('deveria retornar um erro caso façamos uma busca por um CRM não cadastrado', async function () {
        const res = await request.get(`${ENDPOINT}2398`);
        (0, chai_1.expect)(res.status).to.equal(404);
    });
    it('deveria permitir alterar alguns dados do médico recém-criado', async function () {
        const res = await request.patch(`${ENDPOINT}${novoMedico.crm}`).send({
            nome: 'TESTE 2',
            tipo_conselho: 'NENHUM'
        });
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body).not.to.be.empty;
        const data = res.body.data;
        (0, chai_1.expect)(data.nome).not.be.equal(novoMedico.nome);
    });
    it('deveria permitir apagar médico recém-criado', async function () {
        const res = await request.delete(`${ENDPOINT}${novoMedico.crm}`);
        (0, chai_1.expect)(res.status).to.equal(204);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWNvcy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdGVzdC9tZWRpY29zLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBcUM7QUFDckMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUE7QUFDdEMsMERBQWlDO0FBQ2pDLCtCQUE2QjtBQUU3QixNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUE7QUFFaEMsTUFBTSxVQUFVLEdBQUc7SUFDakIsR0FBRyxFQUFFLFdBQVc7SUFDaEIsSUFBSSxFQUFFLE9BQU87Q0FDZCxDQUFBO0FBRUQsUUFBUSxDQUFDLGdCQUFnQixFQUFFO0lBQ3pCLElBQUksT0FBaUMsQ0FBQTtJQUNyQyxNQUFNLENBQUM7UUFDTCxPQUFPLEdBQUcsbUJBQVMsQ0FBQyxLQUFLLENBQUMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQzVDLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLFVBQVUsSUFBSTtRQUNsQixnQkFBTSxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQ3RCLElBQUksRUFBRSxDQUFBO0lBQ1IsQ0FBQyxDQUFDLENBQUE7SUFHRixFQUFFLENBQUMsd0NBQXdDLEVBQUUsS0FBSztRQUNoRCxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRXpELElBQUEsYUFBTSxFQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2hDLElBQUEsYUFBTSxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUE7UUFDaEMsSUFBQSxhQUFNLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMs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