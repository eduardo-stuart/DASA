import debug from 'debug'
const log: debug.IDebugger = debug('app: uncaughtException')

const universalUncaughtException = () => {
  process.on('uncaughtException', err => {
    console.log('Encontrada uma exceção não tratada. Encerrando o sistema...')
    log(err.name, err.message)
    process.exit(1)
  })
}

module.exports = universalUncaughtException()