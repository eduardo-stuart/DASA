"use strict";
/**
 * Classe usada para diferenciar os erros gerados nos endpoints dos demais erros que possam surgir na aplicação
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.isOperational = true; // Somente será TRUE quando o erro for gerado pelo meu código
        // Valores default serão atribuídos caso a classe seja criada sem especificar um statusCode
        this.statusCode = statusCode || 400;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9lcnJvcmhhbmRsZXJzL2FwcEVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRztBQUNILE1BQU0sUUFBUyxTQUFRLEtBQUs7SUFNMUIsWUFBWSxPQUFlLEVBQUUsVUFBbUI7UUFFOUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBSmhCLGtCQUFhLEdBQVksSUFBSSxDQUFBLENBQUMsNkRBQTZEO1FBTXpGLDJGQUEyRjtRQUMzRixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxHQUFHLENBQUE7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLFVBQVUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUE7UUFFaEUsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7SUFFakQsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUEifQ==