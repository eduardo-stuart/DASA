"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DASA ─ Desafio de Programação",
            version: "1.0.0",
            description: "Projeto backend desenvolvido usando as tecnologias Node.js, Express.js & MongoDB.",
            contact: {
                name: 'Eduardo Stuart',
                url: 'https://eduardostuart.pro.br',
            }
        },
        servers: [
            {
                url: `http://${HOST}:${PORT}`
            }
        ],
    },
    apis: [
        "./controllers/**.ts"
    ]
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlci5zZXR1cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9zd2FnZ2VyLnNldHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQXdDO0FBRXhDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQTtBQUM1QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUE7QUFFckMsTUFBTSxjQUFjLEdBQXlCO0lBQzNDLFVBQVUsRUFBRTtRQUNWLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSwrQkFBK0I7WUFDdEMsT0FBTyxFQUFFLE9BQU87WUFDaEIsV0FBVyxFQUFFLG1GQUFtRjtZQUNoRyxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsR0FBRyxFQUFFLDhCQUE4QjthQUNwQztTQUNGO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsR0FBRyxFQUFFLFVBQVUsSUFBSSxJQUFJLElBQUksRUFBRTthQUM5QjtTQUNGO0tBQ0Y7SUFDRCxJQUFJLEVBQUU7UUFDSixxQkFBcUI7S0FDdEI7Q0FDRixDQUFBO0FBRUQsa0JBQWUsSUFBQSx1QkFBWSxFQUFDLGNBQWMsQ0FBQyxDQUFBIn0=