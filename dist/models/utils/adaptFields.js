"use strict";
/**
 * Adapta os campos retornados pelo MongoDB:
 *   1) '_id': removido
 *   2) '__v': removido
 */
module.exports = (req, ret) => {
    delete ret._id;
    delete ret.__v;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRGaWVsZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9tb2RlbHMvdXRpbHMvYWRhcHRGaWVsZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFO0lBQ3RDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQTtJQUNkLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQTtBQUNoQixDQUFDLENBQUEifQ==