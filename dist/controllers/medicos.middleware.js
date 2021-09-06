"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MedicoMiddleware {
    async checkRequiredFields(req, res, next) {
        if (req.body &&
            req.body.crm &&
            req.body.nome) {
            // Todos os campos estão presentes ─ podemos seguir em frente
            next();
        }
        else {
            res.status(400).json({
                status: 'fail',
                message: 'Nem todos os campos requeridos foram fornecidos'
            });
        }
    }
}
exports.default = new MedicoMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWNvcy5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvbWVkaWNvcy5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxnQkFBZ0I7SUFFcEIsS0FBSyxDQUFDLG1CQUFtQixDQUN2QixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjtRQUUxQixJQUFJLEdBQUcsQ0FBQyxJQUFJO1lBQ1YsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQ1osR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZiw2REFBNkQ7WUFDN0QsSUFBSSxFQUFFLENBQUE7U0FDUDthQUFNO1lBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRSxpREFBaUQ7YUFDM0QsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLGdCQUFnQixFQUFFLENBQUEifQ==