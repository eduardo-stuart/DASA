"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacientesRoutes = void 0;
const route_1 = require("./route");
const path_1 = __importDefault(require("path"));
const pacientes_controllers_1 = __importDefault(require("./../controllers/pacientes.controllers"));
const pacientes_middleware_1 = __importDefault(require("./../controllers/pacientes.middleware"));
class PacientesRoutes extends route_1.RootRoute {
    constructor(app) {
        super(app, 'PacientesRoutes');
    }
    setupRoutes() {
        this.app.route(path_1.default.join(this.prefix, 'pacientes'))
            .get(pacientes_controllers_1.default.listPacientes)
            .post(pacientes_middleware_1.default.checkRequiredFields, pacientes_controllers_1.default.addPaciente);
        this.app.route(path_1.default.join(this.prefix, 'pacientes/:pacienteCPF'))
            .get(pacientes_controllers_1.default.getPacienteByCPF)
            .patch(pacientes_controllers_1.default.patchPacienteByCPF)
            .delete(pacientes_controllers_1.default.deletePacienteByCPF);
        return this.app;
    }
}
exports.PacientesRoutes = PacientesRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFjaWVudGVzLnJvdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcm91dGVzL3BhY2llbnRlcy5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtQ0FBbUM7QUFDbkMsZ0RBQXVCO0FBRXZCLG1HQUF3RTtBQUN4RSxpR0FBdUU7QUFFdkUsTUFBYSxlQUFnQixTQUFRLGlCQUFTO0lBRTVDLFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFFRCxXQUFXO1FBRVQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQ2hELEdBQUcsQ0FBQywrQkFBbUIsQ0FBQyxhQUFhLENBQUM7YUFDdEMsSUFBSSxDQUFDLDhCQUFtQixDQUFDLG1CQUFtQixFQUFFLCtCQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBR2pGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO2FBQzdELEdBQUcsQ0FBQywrQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQzthQUN6QyxLQUFLLENBQUMsK0JBQW1CLENBQUMsa0JBQWtCLENBQUM7YUFDN0MsTUFBTSxDQUFDLCtCQUFtQixDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFFbEQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFBO0lBRWpCLENBQUM7Q0FFRjtBQXRCRCwwQ0FzQkMifQ==