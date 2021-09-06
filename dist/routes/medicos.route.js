"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicosRoutes = void 0;
const route_1 = require("./route");
const path_1 = __importDefault(require("path"));
const medicos_controllers_1 = __importDefault(require("./../controllers/medicos.controllers"));
const medicos_middleware_1 = __importDefault(require("../controllers/medicos.middleware"));
class MedicosRoutes extends route_1.RootRoute {
    constructor(app) {
        super(app, 'MedicosRoutes');
    }
    setupRoutes() {
        this.app.route(path_1.default.join(this.prefix, 'medicos'))
            .get(medicos_controllers_1.default.listMedicos)
            .post(medicos_middleware_1.default.checkRequiredFields, medicos_controllers_1.default.addMedico);
        this.app.route(path_1.default.join(this.prefix, 'medicos/:crm'))
            .get(medicos_controllers_1.default.getMedicoByCRM)
            .patch(medicos_controllers_1.default.patchMedicoByCRM)
            .delete(medicos_controllers_1.default.deleteMedicoByCRM);
        return this.app;
    }
}
exports.MedicosRoutes = MedicosRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWNvcy5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3JvdXRlcy9tZWRpY29zLnJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUFvQztBQUNwQyxnREFBd0I7QUFFeEIsK0ZBQW9FO0FBQ3BFLDJGQUFpRTtBQUVqRSxNQUFhLGFBQWMsU0FBUSxpQkFBUztJQUUxQyxZQUFZLEdBQXdCO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUVELFdBQVc7UUFFVCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDOUMsR0FBRyxDQUFDLDZCQUFpQixDQUFDLFdBQVcsQ0FBQzthQUNsQyxJQUFJLENBQUMsNEJBQWlCLENBQUMsbUJBQW1CLEVBQ3pDLDZCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRWhDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQzthQUNuRCxHQUFHLENBQUMsNkJBQWlCLENBQUMsY0FBYyxDQUFDO2FBQ3JDLEtBQUssQ0FBQyw2QkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQzthQUN6QyxNQUFNLENBQUMsNkJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUU5QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUE7SUFDakIsQ0FBQztDQUNGO0FBcEJELHNDQW9CQyJ9