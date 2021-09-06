import express from 'express'
import mongoose from 'mongoose'

class PedidoMiddleware {

  async checkRequiredFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body &&
      req.body.paciente &&
      req.body.medico &&
      req.body.exames) {
      // Todos os campos exigidos estão presentes ─ dê continuidade à cadeia de middlewares
      next()
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'Nem todos os campos obrigatórios foram fornecidos'
      })
    }
  }

  // Testa se o ID passado é válido antes de realizar consultas no banco
  async checkIfIDIsValid(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      new mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
      return res.status(404).json({
        status: 'fail',
        message: `O ID fornecido (${req.params.id}) não é um ID válido`
      })
    }
    next()
  }
}

export default new PedidoMiddleware()