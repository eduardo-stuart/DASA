import express from 'express'

class MedicoMiddleware {

  async checkRequiredFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body &&
      req.body.crm &&
      req.body.nome) {
      // Todos os campos estão presentes ─ podemos seguir em frente
      next()
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'Nem todos os campos requeridos foram fornecidos'
      })
    }
  }
}

export default new MedicoMiddleware()