/**
 * Adapta os campos retornados pelo MongoDB:
 *   1) '_id': removido
 *   2) '__v': removido
 */
module.exports = (req: any, ret: any) => {
  delete ret._id
  delete ret.__v
}