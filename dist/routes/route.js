"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRoute = void 0;
/**
 * Todas as demais rotas serão derivadas dessa classe,
 * que traz funcionalidades compartilhadas entre todas
 */
class RootRoute {
    constructor(app, name) {
        this.prefix = process.env.ROUTES_PREFIX || '/api/';
        this.app = app;
        this.name = name;
        this.setupRoutes();
    }
    getName() {
        return this.name;
    }
}
exports.RootRoute = RootRoute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yb3V0ZXMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUE7OztHQUdHO0FBRUgsTUFBc0IsU0FBUztJQU83QixZQUFZLEdBQXdCLEVBQUUsSUFBWTtRQUZsRCxXQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFBO1FBRzNDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ2xCLENBQUM7Q0FLRjtBQXBCRCw4QkFvQkMifQ==