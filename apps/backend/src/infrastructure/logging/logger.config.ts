import * as winston from 'winston';

const logFormat = winston.format.printf(({ timestamp, level, message, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

const transports: winston.transport[] = [
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
];

if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.File({
      filename: 'logs/debug.log',
      level: 'debug',
    }),
    new winston.transports.Console(),
  );
}

export const winstonConfig: winston.LoggerOptions = {
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'error' : 'debug'),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat,
  ),
  transports,
};
