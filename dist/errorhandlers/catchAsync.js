"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0Y2hBc3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2Vycm9yaGFuZGxlcnMvY2F0Y2hBc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUErRixFQUFFLEVBQUU7SUFFbkgsT0FBTyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQixFQUFFLEVBQUU7UUFDakYsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2xDLENBQUMsQ0FBQTtBQUVILENBQUMsQ0FBQSJ9