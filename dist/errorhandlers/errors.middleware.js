"use strict";
/**
 * Middleware usado para gerenciar os erros que podem ocorrer durante a execução do backend
 */
Object.defineProperty(exports, "__esModule", { value: true });
const AppError = require('./../errorhandlers/appError');
/**
 * Funções de apoio para descrever os erros que podem ocorrer
 */
const handleCastErrorDB = (err) => {
    const message = `Valor inválido: ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const message = `Valor duplicado: ${JSON.stringify(err.keyValue)}`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Dados inválidos: ${errors.join('. ')}`;
    return new AppError(message, 400);
};
const showError = (err, res) => {
    if (err.isOperational) {
        // Sendo erro operacional, podemos informar ao usuário detalhes sobre o problema
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    // Se não for um erro operacional, informe somente o básico para não expôr detalhes sobre a implementação
    return res.status(500).json({
        status: 'error',
        message: 'Algo não funcionou como esperado',
    });
};
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; /* Default para INTERNAL SERVER ERROR */
    err.status = err.status || 'error'; /* Default para 'error' */
    // Tratamento de erros personalizado para informar ao usuário qual a falha que ocorreu
    let error = { ...err };
    if (error.reason?.code === 'ERR_ASSERTION') {
        error.isOperational = true;
        error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
        error.isOperational = true;
        error = handleDuplicateFieldsDB(error);
    }
    if (error._message?.indexOf('validation failed') >= 0) {
        error.isOperational = true;
        error = handleValidationErrorDB(error);
    }
    showError(error, res);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9lcnJvcmhhbmRsZXJzL2Vycm9ycy5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFHSCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtBQUV2RDs7R0FFRztBQUNILE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRTtJQUNyQyxNQUFNLE9BQU8sR0FBRyxtQkFBbUIsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDM0QsT0FBTyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFBO0FBRUQsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO0lBQzNDLE1BQU0sT0FBTyxHQUFHLG9CQUFvQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFBO0lBQ2xFLE9BQU8sSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQTtBQUVELE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRTtJQUMzQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNyRSxNQUFNLE9BQU8sR0FBRyxvQkFBb0IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBO0lBQ3ZELE9BQU8sSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQTtBQUVELE1BQU0sU0FBUyxHQUFHLENBQUMsR0FBYSxFQUFFLEdBQXFCLEVBQUUsRUFBRTtJQUN6RCxJQUFJLEdBQUcsQ0FBQyxhQUFhLEVBQUU7UUFDckIsZ0ZBQWdGO1FBQ2hGLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtZQUNsQixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87U0FDckIsQ0FBQyxDQUFBO0tBQ0g7SUFFRCx5R0FBeUc7SUFDekcsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMxQixNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSxrQ0FBa0M7S0FDNUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQVEsRUFBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEIsRUFBRSxFQUFFO0lBRXJHLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUEsQ0FBQyx3Q0FBd0M7SUFDL0UsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQSxDQUFLLDBCQUEwQjtJQUVqRSxzRkFBc0Y7SUFDdEYsSUFBSSxLQUFLLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRXRCLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssZUFBZSxFQUFFO1FBQzFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFBO1FBQzFCLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUNqQztJQUNELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7UUFDeEIsS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUE7UUFDMUIsS0FBSyxHQUFHLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ3ZDO0lBQ0QsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNyRCxLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQTtRQUMxQixLQUFLLEdBQUcsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDdkM7SUFFRCxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQSJ9