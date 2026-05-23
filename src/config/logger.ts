import pino from 'pino';

import fs from 'fs';
import path from 'path';

import kleur from 'kleur';

import type {
  Request,
  Response,
} from 'express';

import { env } from './env.ts';

import { AuditEvent } from '../utils/index.ts';

const logsDir = path.join(
  process.cwd(),
  '.logs'
);

const logFolders = [
  logsDir,

  path.join(logsDir, 'events'),

  path.join(logsDir, 'errors'),

  path.join(logsDir, 'warns'),

  path.join(logsDir, 'info'),

  path.join(logsDir, 'debug'),
];

for (const folder of logFolders) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, {
      recursive: true,
    });
  }
}

const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',

      level: 'debug',

      options: {
        colorize: true,

        singleLine: false,

        translateTime: 'HH:MM:ss',

        ignore:
          'pid,hostname,reqId,responseTime',
      },
    },

    {
      target: 'pino/file',

      level: 'debug',

      options: {
        destination: path.join(
          logsDir,
          'app.log'
        ),

        mkdir: true,
      },
    },

    {
      target: 'pino/file',

      level: 'info',

      options: {
        destination: path.join(
          logsDir,
          'info',
          'info.log'
        ),

        mkdir: true,
      },
    },

    {
      target: 'pino/file',

      level: 'warn',

      options: {
        destination: path.join(
          logsDir,
          'warns',
          'warn.log'
        ),

        mkdir: true,
      },
    },

    {
      target: 'pino/file',

      level: 'error',

      options: {
        destination: path.join(
          logsDir,
          'errors',
          'error.log'
        ),

        mkdir: true,
      },
    },

    {
      target: 'pino/file',

      level: 'debug',

      options: {
        destination: path.join(
          logsDir,
          'debug',
          'debug.log'
        ),

        mkdir: true,
      },
    },
  ],
});

const baseLogger = pino(
  {
    level:
      env.app.NODE_ENV === 'production'
        ? 'info'
        : 'debug',

    timestamp:
      pino.stdTimeFunctions.isoTime,

    base: undefined,
  },

  transport
);

const eventLogger = pino(
  {
    level: 'info',

    timestamp:
      pino.stdTimeFunctions.isoTime,

    base: undefined,
  },

  pino.transport({
    targets: [
      {
        target: 'pino-pretty',

        level: 'info',

        options: {
          colorize: true,

          singleLine: false,

          translateTime: 'HH:MM:ss',
        },
      },

      {
        target: 'pino/file',

        level: 'info',

        options: {
          destination: path.join(
            logsDir,
            'events',
            'events.log'
          ),

          mkdir: true,
        },
      },
    ],
  })
);

export const logger = Object.assign(
  baseLogger,

  {
    event(
      audit: AuditEvent,

      level:
        | 'info'
        | 'warn'
        | 'error'
        | 'debug' = 'info'
    ) {
      const payload = JSON.stringify(
        {
          ...audit.toJSON(),
        },

        null,

        2
      );

      eventLogger[level](
        `${kleur.cyan(
          `[${audit.service}]`
        )} ` +
        `${kleur.green(
          `[${audit.environment}]`
        )} ` +
        `${kleur.magenta(
          audit.event
        )}\n${payload}`
      );
    },
  }
);

function statusColor(status: number) {
  if (status >= 500) {
    return kleur
      .bgRed()
      .black(` ${status} `);
  }

  if (status >= 400) {
    return kleur
      .bgYellow()
      .black(` ${status} `);
  }

  return kleur
    .bgGreen()
    .black(` ${status} `);
}

export const customLogConfig = {
  logger,

  quietReqLogger: true,

  autoLogging: {
    ignore: () => false,
  },

  customLogLevel(
    _req: Request,

    res: Response,

    err?: Error
  ) {
    if (
      res.statusCode >= 500 ||
      err
    ) {
      return 'error';
    }

    if (res.statusCode >= 400) {
      return 'warn';
    }

    return 'info';
  },

  customSuccessMessage(
    req: Request,

    res: Response & {
      responseTime?: number;
    }
  ) {
    const responseTime =
      res.responseTime || 0;

    return (
      `${kleur.cyan(req.method)} ` +
      `${req.url} ` +
      `${statusColor(
        res.statusCode
      )} ` +
      `${kleur.gray(
        `(${responseTime}ms)`
      )}`
    );
  },

  customErrorMessage(
    req: Request,

    res: Response & {
      responseTime?: number;
    },

    error: Error
  ) {
    const responseTime =
      res.responseTime || 0;

    return (
      `${kleur.cyan(req.method)} ` +
      `${req.url} ` +
      `${statusColor(
        res.statusCode
      )} ` +
      `${kleur.gray(
        `(${responseTime}ms)`
      )} ` +
      `${kleur.red(error.message)}`
    );
  },

  serializers: {
    req() {
      return undefined;
    },

    res() {
      return undefined;
    },
  },

  customProps() {
    return {};
  },
};