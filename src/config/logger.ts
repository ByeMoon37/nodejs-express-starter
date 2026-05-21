import pino from 'pino';
import fs from 'fs';
import path from 'path';

import kleur from 'kleur';

import { env } from './env.ts';
import { Request, Response } from 'express';

const logsDir = path.join(process.cwd(), '.logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',

      level: 'info',

      options: {
        colorize: true,

        singleLine: true,

        translateTime: 'HH:MM:ss',

        ignore: 'pid,hostname,reqId,responseTime',
      },
    },

    {
      target: 'pino/file',

      level: 'info',

      options: {
        destination: path.join(logsDir, 'app.log'),

        mkdir: true,
      },
    },
  ],
});

const logger = pino(
  {
    level: env.app.NODE_ENV === 'production' ? 'info' : 'debug',

    timestamp: pino.stdTimeFunctions.isoTime,
  },

  transport
);

function statusColor(status: number) {
  if (status >= 500) {
    return kleur.bgRed().black(` ${status} `);
  }

  if (status >= 400) {
    return kleur.bgYellow().black(` ${status} `);
  }

  return kleur.bgGreen().black(` ${status} `);
}

const customLogConfig = {
  logger,

  quietReqLogger: true,

  autoLogging: {
    ignore: () => false
  },

  customLogLevel(_req: Request, res: Response, err?: Error) {
    if (res.statusCode >= 500 || err) {
      return 'error';
    }

    if (res.statusCode >= 400) {
      return 'warn';
    }

    return 'info';
  },

  customSuccessMessage(req: Request, res: Response & { responseTime?: string }) {
    const responseTime = res.responseTime || 0;

    return (
      `${req.method} ${req.url} ` +
      `${statusColor(res.statusCode)} ` +
      `${kleur.gray(`(${responseTime}ms)`)}`
    );
  },

  customErrorMessage(req: Request, res: Response & { responseTime?: string }, error: Error) {
    const responseTime = res.responseTime || 0;

    return (
      `${req.method} ${req.url} ` +
      `${statusColor(res.statusCode)} ` +
      `${kleur.gray(`(${responseTime}ms)`)} ` +
      `${kleur.red(error.message)}`
    );
  },

  serializers: {
    req() {
      return undefined;
    },

    res() {
      return undefined;
    }
  },

  customProps() {
    return {};
  }
};

export { logger, customLogConfig };