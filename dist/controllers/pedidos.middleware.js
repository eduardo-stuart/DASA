"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class PedidoMiddleware {
    async checkRequiredFields(req, res, next) {
        if (req.body &&
            req.body.paciente &&
            req.body.medico &&
            req.body.exames) {
            // Todos os campos exigidos estão presentes ─ dê continuidade à cadeia de middlewares
            next();
        }
        else {
            res.status(400).json({
                status: 'fail',
                message: 'Nem todos os campos obrigatórios foram fornecidos'
            });
        }
    }
    // Testa se o ID passado é válido antes de realizar consultas no banco
    async checkIfIDIsValid(req, res, next) {
        try {
            new mongoose_1.default.Types.ObjectId(req.params.id);
        }
        catch (err) {
            return res.status(404).json({
                status: 'fail',
                message: `O ID fornecido (${req.params.id}) não é um ID válido`
            });
        }
        next();
    }
}
exports.default = new PedidoMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVkaWRvcy5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvcGVkaWRvcy5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esd0RBQStCO0FBRS9CLE1BQU0sZ0JBQWdCO0lBRXBCLEtBQUssQ0FBQyxtQkFBbUIsQ0FDdkIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7UUFFMUIsSUFBSSxHQUFHLENBQUMsSUFBSTtZQUNWLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNqQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDZixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNqQixxRkFBcUY7WUFDckYsSUFBSSxFQUFFLENBQUE7U0FDUDthQUFNO1lBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRSxtREFBbUQ7YUFDN0QsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBRUQsc0VBQXNFO0lBQ3RFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FDcEIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7UUFFMUIsSUFBSTtZQUNGLElBQUksa0JBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDM0M7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRSxtQkFBbUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLHNCQUFzQjthQUNoRSxDQUFDLENBQUE7U0FDSDtRQUNELElBQUksRUFBRSxDQUFBO0lBQ1IsQ0FBQztDQUNGO0FBRUQsa0JBQWUsSUFBSSxnQkFBZ0IsRUFBRSxDQUFBIn0=