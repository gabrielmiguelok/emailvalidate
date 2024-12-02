const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Verificar si está en el servidor
const isServer = typeof window === 'undefined';

let logger = null;

if (isServer) {
  // Definir el formato para los logs
  const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  });

  // Crear el logger
  logger = createLogger({
    level: process.env.LOG_LEVEL || 'info', // 'info' para obtener información útil en desarrollo local
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      logFormat
    ),
    transports: [
      // Consola con colores si no es producción
      new transports.Console({
        format: combine(
          colorize({ all: process.env.NODE_ENV !== 'production' }),
          logFormat
        ),
      }),
    ],
  });
}

// Exportar el logger, asegurando que no falle en el cliente
module.exports = isServer
  ? logger
  : {
      info: () => {},
      debug: () => {},
      warn: () => {},
      error: () => {},
    };
