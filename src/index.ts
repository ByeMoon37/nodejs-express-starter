import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { RequestHandler, type Application } from 'express';
import responseTime from 'response-time';
import pinoHttp from 'pino-http';
import pc from 'picocolors';
import cors from 'cors';

import router from './routes/index.ts';
import middlewares from './exception/index.ts';
import { env } from './config/env.ts';
import { customLogConfig } from './config/index.ts';
import { configCors } from './config/index.ts';


const app: Application = express();
const loggerMiddleware: RequestHandler = pinoHttp(customLogConfig);

app.use(cors(configCors));
app.use(bodyParser.json());
app.use(responseTime());
app.use(cookieParser());
app.use(loggerMiddleware);

app.use('/api', router);
app.get('/api/health', (_, res) => { res.send('OK'); });

/**
*
* Here are your middlewares that manipulate or read: (err,req,res,next)
* Note for beginners: Middleware always comes after the routes have been
*             initialized (in this case, the ErrorHandler). 
*/
app.use([middlewares.ErrorHandler]);

/**
* I added a series of logs to make it more organized,
*      and to give it a bit of a NextJS feel.
*/
app.listen(env.app.PORT, async () => {
    console.clear();
    console.debug(`> ${env.app.NAME}@${env.app.VERSION}`);
    console.debug(`> ${env.dev.USER_AGENT} run ${env.dev.LIFECYCLE_EVENT}`);
    console.debug(pc.bold('\n\x1b[35m ಄ NODEJS-EXPRESS-STARTER'));
    console.debug(pc.white(`- Local:       http://localhost:${env.app.PORT}`));
    console.debug('\n');
});