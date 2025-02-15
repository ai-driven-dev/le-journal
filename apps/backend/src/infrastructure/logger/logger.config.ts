import * as winston from 'winston';

const loggerConfig = {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ms, ...meta }) => {
          const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
          return `${timestamp} [${level}] ${message} ${metaString} ${ms}`;
        }),
      ),
    }),
  ],
};

export const winstonConfig: winston.LoggerOptions = {
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'error' : 'debug'),
  format: loggerConfig.format,
  transports: loggerConfig.transports,
};
