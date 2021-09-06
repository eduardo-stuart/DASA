"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:mongoose-connection');
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 27017;
const DB_NAME = process.env.DB_NAME || 'dasa-db';
const RETRY_IN = 10; // Aguarda dez segundos para tentar se conectar novamente
class MongooseConnection {
    constructor() {
        this.retries = 0;
        this.mongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        };
        this.tryToConnect = () => {
            log('MongoDB: iniciando conexão...');
            mongoose_1.default
                .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, this.mongooseOptions)
                .then(() => log(`MongoDB: conectado com sucesso!`))
                .catch(err => {
                log(`MongoDB: falha em tentar conexão... (tentativa #${++this.retries} em ${RETRY_IN} segundos): `, err);
                setTimeout(this.tryToConnect, RETRY_IN * 1000);
            });
        };
        this.tryToConnect();
    }
    getMongoose() {
        return mongoose_1.default;
    }
}
exports.default = new MongooseConnection();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2UuY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2RiL21vbmdvb3NlLmNvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBK0I7QUFDL0Isa0RBQXlCO0FBRXpCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyx5QkFBeUIsQ0FBQyxDQUFBO0FBRTdELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQTtBQUNsRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUE7QUFDcEQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFBO0FBRWhELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQSxDQUFDLHlEQUF5RDtBQUU3RSxNQUFNLGtCQUFrQjtJQVN0QjtRQVJRLFlBQU8sR0FBRyxDQUFDLENBQUE7UUFFWCxvQkFBZSxHQUFHO1lBQ3hCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsd0JBQXdCLEVBQUUsS0FBSztTQUNoQyxDQUFBO1FBVUQsaUJBQVksR0FBRyxHQUFHLEVBQUU7WUFDbEIsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUE7WUFDcEMsa0JBQVE7aUJBQ0wsT0FBTyxDQUFDLGFBQWEsT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDO2lCQUMzRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7aUJBQ2xELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDWCxHQUFHLENBQUMsbURBQW1ELEVBQUUsSUFBSSxDQUFDLE9BQU8sT0FBTyxRQUFRLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDeEcsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFBO1lBQ2hELENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFBO1FBaEJDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sa0JBQVEsQ0FBQTtJQUNqQixDQUFDO0NBWUY7QUFFRCxrQkFBZSxJQUFJLGtCQUFrQixFQUFFLENBQUEifQ==