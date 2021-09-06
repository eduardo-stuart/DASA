"use strict";
/**
 * Adapta os campos retornados pelo MongoDB:
 *   1) '_id': renomeado para 'id'
 *   2) '__v': removido
 */
module.exports = (req, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRGaWVsZHNXaXRoSUQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9tb2RlbHMvdXRpbHMvYWRhcHRGaWVsZHNXaXRoSUQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFO0lBQ3RDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQTtJQUNoQixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUE7SUFDZCxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUE7QUFDaEIsQ0FBQyxDQUFBIn0=