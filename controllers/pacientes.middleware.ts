import express from 'express'

class PacienteMiddleware {

  async checkRequiredFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body &&
      req.body.nome &&
      req.body.nascimento &&
      req.body.endereco &&
      req.body.telefone &&
      req.body.email &&
      req.body.cpf) {
      // Todos os campos estão presentes ─ podemos seguir em frente
      next()
    } else {
      return res.status(400).json({
        status: 'fail',
        message: 'Nem todos os campos requeridos estão presentes'
      })
    }
  }

}

export default new PacienteMiddleware()