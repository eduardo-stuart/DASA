/**
 * Adapta os campos retornados pelo MongoDB:
 *   1) '_id': renomeado para 'id'
 *   2) '__v': removido
 */
module.exports = (req: any, ret: any) => {
  ret.id = ret._id
  delete ret._id
  delete ret.__v
}