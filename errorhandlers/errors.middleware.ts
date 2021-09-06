/**
 * Middleware usado para gerenciar os erros que podem ocorrer durante a execução do backend
 */

import express from 'express'
const AppError = require('./../errorhandlers/appError')

/**
 * Funções de apoio para descrever os erros que podem ocorrer
 */
const handleCastErrorDB = (err: any) => {
  const message = `Valor inválido: ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err: any) => {
  const message = `Valor duplicado: ${JSON.stringify(err.keyValue)}`
  return new AppError(message, 400)
}

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message)
  const message = `Dados inválidos: ${errors.join('. ')}`
  return new AppError(message, 400)
}

const showError = (err: AppError, res: express.Response) => {
  if (err.isOperational) {
    // Sendo erro operacional, podemos informar ao usuário detalhes sobre o problema
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  }

  // Se não for um erro operacional, informe somente o básico para não expôr detalhes sobre a implementação
  return res.status(500).json({
    status: 'error',
    message: 'Algo não funcionou como esperado',
  })
}

module.exports = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  err.statusCode = err.statusCode || 500 /* Default para INTERNAL SERVER ERROR */
  err.status = err.status || 'error'     /* Default para 'error' */

  // Tratamento de erros personalizado para informar ao usuário qual a falha que ocorreu
  let error = { ...err }

  if (error.reason?.code === 'ERR_ASSERTION') {
    error.isOperational = true
    error = handleCastErrorDB(error)
  }
  if (error.code === 11000) {
    error.isOperational = true
    error = handleDuplicateFieldsDB(error)
  }
  if (error._message?.indexOf('validation failed') >= 0) {
    error.isOperational = true
    error = handleValidationErrorDB(error)
  }

  showError(error, res)
}

