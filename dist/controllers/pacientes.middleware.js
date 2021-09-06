"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PacienteMiddleware {
    async checkRequiredFields(req, res, next) {
        if (req.body &&
            req.body.nome &&
            req.body.nascimento &&
            req.body.endereco &&
            req.body.telefone &&
            req.body.email &&
            req.body.cpf) {
            // Todos os campos estão presentes ─ podemos seguir em frente
            next();
        }
        else {
            return res.status(400).json({
                status: 'fail',
                message: 'Nem todos os campos requeridos estão presentes'
            });
        }
    }
}
exports.default = new PacienteMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFjaWVudGVzLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy9wYWNpZW50ZXMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sa0JBQWtCO0lBRXRCLEtBQUssQ0FBQyxtQkFBbUIsQ0FDdkIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7UUFFMUIsSUFBSSxHQUFHLENBQUMsSUFBSTtZQUNWLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFDakIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQ2pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSztZQUNkLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2QsNkRBQTZEO1lBQzdELElBQUksRUFBRSxDQUFBO1NBQ1A7YUFBTTtZQUNMLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRSxnREFBZ0Q7YUFDMUQsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0NBRUY7QUFFRCxrQkFBZSxJQUFJLGtCQUFrQixFQUFFLENBQUEifQ==