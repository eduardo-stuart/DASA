/**
 * Classe usada para diferenciar os erros gerados nos endpoints dos demais erros que possam surgir na aplicação
 */
class AppError extends Error {

  statusCode: number
  status: string
  isOperational: boolean = true // Somente será TRUE quando o erro for gerado pelo meu código

  constructor(message: string, statusCode?: number) {

    super(message)

    // Valores default serão atribuídos caso a classe seja criada sem especificar um statusCode
    this.statusCode = statusCode || 400
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'

    Error.captureStackTrace(this, this.constructor)

  }
}

module.exports = AppError