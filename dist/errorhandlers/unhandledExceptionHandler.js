"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app: uncaughtException');
const universalUncaughtException = () => {
    process.on('uncaughtException', err => {
        console.log('Encontrada uma exceção não tratada. Encerrando o sistema...');
        log(err.name, err.message);
        process.exit(1);
    });
};
module.exports = universalUncaughtException();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5oYW5kbGVkRXhjZXB0aW9uSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2Vycm9yaGFuZGxlcnMvdW5oYW5kbGVkRXhjZXB0aW9uSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUF5QjtBQUN6QixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsd0JBQXdCLENBQUMsQ0FBQTtBQUU1RCxNQUFNLDBCQUEwQixHQUFHLEdBQUcsRUFBRTtJQUN0QyxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxFQUFFO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkRBQTZELENBQUMsQ0FBQTtRQUMxRSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLEVBQUUsQ0FBQSJ9