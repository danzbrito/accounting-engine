import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as winston from 'winston';
import moment from 'moment-timezone';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: process.env.SERVICE },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({
          dirname: join(__dirname, '../..', 'var/log/'),
          filename: 'debug.log',
          level: 'debug',
        }),
        new winston.transports.File({
          dirname: join(__dirname, '../..', 'var/log/'),
          filename: 'info.log',
          level: 'info',
        }),
        new winston.transports.File({
          dirname: join(__dirname, '../..', 'var/log/'),
          filename: 'warn.log',
          level: 'warn',
        }),
        new winston.transports.File({
          dirname: join(__dirname, '../..', 'var/log/'),
          filename: 'error.log',
          level: 'error',
        }),
      ],
    });
  }

  private getTimestamp() {
    return moment().tz(process?.env?.TZ || 'Asia/Jakarta').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  }

  info(data: any) {
    this.logger.info(
      JSON.stringify({
        '@timestamp': this.getTimestamp(),
        level: 'INFO',
        service: process.env.SERVICE,
        logging_service: data.logging_service,
        message: {
          logging_type: data.logging_type,
          client_id: data.client_id,
          payload: data.payload,
        },
        environment: process.env.ENVIRONMENT,
      }).replace(/\\/g, ' '),
    );
  }
  warn(data: any) {
    this.logger.warn(
      JSON.stringify({
        '@timestamp': this.getTimestamp(),
        level: 'WARN',
        service: process.env.SERVICE,
        logging_service: data.logging_service,
        message: {
          logging_type: data.logging_type,
          client_id: data.client_id,
          payload: data.payload,
        },
        environment: process.env.ENVIRONMENT,
      }).replace(/\\/g, ' '),
    );
  }
  error(data: any) {
    this.logger.error(
      JSON.stringify({
        '@timestamp': this.getTimestamp(),
        level: 'ERROR',
        service: process.env.SERVICE,
        logging_service: data.logging_service,
        message: {
          logging_type: data.logging_type,
          client_id: data.client_id,
          payload: data.payload,
        },
        environment: process.env.ENVIRONMENT,
      }).replace(/\\/g, ' '),
    );
  }
}
