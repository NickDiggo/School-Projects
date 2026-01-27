// // import pino, {type Logger} from 'pino'
// // import {headers} from 'next/headers'
// //
// // // Tijdens development wordt er gebruik gemaakt van hot module reloading (HMR), hierdoor kunnen er verschillende
// // // instanties van de logger aangemaakt worden.
// // // Aangezien de logger een IO stream opent, kan dit negatieve gevolgen hebben voor de performantie.
// // // Tijdens production is dit geen probleem omdat er dan geen HMR is.
// //
// // // Het globalThis object is gegarandeerd persistent doorheen verschillende hot module reloads.
// // // Door de logger in dit object te bewaren garanderen we dat er slechts één instantie aangemaakt wordt.
// // const globalForLogger = globalThis as unknown as {logger: Logger}
// //
// // export const logger =
// //   globalForLogger.logger ||
// //   pino({
// //     // Pino (en de meeste andere loggers), ondersteunen verschillende log-levels.
// //     // Info is het standaard niveau, maar we moeten dit natuurlijk kunnen overschrijven als we error, debug, trace, ...
// //     // logs willen zien.
// //     level: process.env.PINO_LOG_LEVEL || 'info',
// //   })
// //
// // // Controleer of er al een instantie van de logger aanwezig is en maak deze aan als dit niet nog niet het geval is.
// // if (process.env.NODE_ENV !== 'production') globalForLogger.logger = logger
// //
// // /**
// //  * Retrieve an instance of the Pino logger which includes the HTTP method, path and request id.
// //  */
// // export async function getLogger(): Promise<Logger> {
// //   try {
// //     const headerList = await headers()
// //     return logger.child({
// //       method: headerList.get('x-request-method'),
// //       pathname: headerList.get('x-request-path'),
// //       requestId: headerList.get('x-request-id'),
// //       sessionId: headerList.get('x-session-id'),
// //       userId: headerList.get('x-user-id'),
// //     })
// //   } catch (_error) {
// //     // Dit kan enkel fout gaan als het request uitgevoerd wordt buiten een request (en headers dus niet bestaat).
// //     logger.trace(_error)
// //     return logger
// //   }
// // }
//
// import pino, {type Logger} from 'pino'
// import {headers} from 'next/headers'
//
// // Singleton logger voor HMR in development
// const globalForLogger = globalThis as unknown as {logger: Logger}
//
// let logger: Logger
//
// if (process.env.NODE_ENV === 'production') {
//   // Node.js runtime: log naar bestand
//   try {
//     const fs = require('fs')
//     const path = require('path')
//
//     const logDir = path.join(process.cwd(), 'logs')
//     if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)
//
//     logger = pino(
//       {
//         level: process.env.PINO_LOG_LEVEL || 'info',
//       },
//       pino.destination(path.join(logDir, 'backend.log')),
//     )
//   } catch (err) {
//     console.warn('Could not configure file logging, fallback to console', err)
//     logger = pino({level: process.env.PINO_LOG_LEVEL || 'info'})
//   }
// } else {
//   // Development: log naar console
//   logger = pino({
//     level: process.env.PINO_LOG_LEVEL || 'info',
//   })
// }
//
// // Bewaar logger in globalThis zodat HMR geen nieuwe instantie maakt
// if (!globalForLogger.logger) globalForLogger.logger = logger
//
// /**
//  * Retrieve an instance of the Pino logger which includes HTTP/request context
//  */
// export async function getLogger(): Promise<Logger> {
//   try {
//     const headerList = await headers()
//     return logger.child({
//       method: headerList.get('x-request-method'),
//       pathname: headerList.get('x-request-path'),
//       requestId: headerList.get('x-request-id'),
//       sessionId: headerList.get('x-session-id'),
//       userId: headerList.get('x-user-id'),
//     })
//   } catch (err) {
//     logger.trace(err)
//     return logger
//   }
// }
//
// export {logger}

import pino, {type Logger} from 'pino'

// Singleton pattern
const globalForLogger = globalThis as unknown as {logger: Logger}

// Check of we in production draaien
const isProd = process.env.NODE_ENV === 'production'

// Configure logger
export const logger: Logger =
  globalForLogger.logger ||
  pino(
    {
      level: process.env.PINO_LOG_LEVEL || 'info',
    },
    isProd
      ? pino.destination('logs/backend.log') // productie -> naar bestand
      : undefined, // dev -> console
  )

if (!globalForLogger.logger) globalForLogger.logger = logger

/**
 * Child logger met request info
 */
import {headers} from 'next/headers'

export async function getLogger(): Promise<Logger> {
  try {
    const headerList = await headers()
    return logger.child({
      method: headerList.get('x-request-method'),
      pathname: headerList.get('x-request-path'),
      requestId: headerList.get('x-request-id'),
      sessionId: headerList.get('x-session-id'),
      userId: headerList.get('x-user-id'),
    })
  } catch (err) {
    logger.trace(err)
    return logger
  }
}
