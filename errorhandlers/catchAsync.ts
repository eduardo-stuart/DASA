/**
 * Caso ocorra um erro durante uma operação assíncrona, o gerenciador global de erros vai entrar em operação 
 */
import express from 'express'

module.exports = (func: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any>) => {

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    func(req, res, next).catch(next)
  }

}