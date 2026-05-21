import { AppError } from './../exception/index.ts';
import { Router, type Response } from 'express';

const router: Router = Router();

router.get('/account', async (_, res: Response) => {
    const produceError = true;
    const getUser = await fetch(`https://jsonplaceholder.typicode.com/${produceError || 'users'}`)
        .then((t) => { return t.json(); })
        .catch((error: Error) => {
            throw new AppError(String(error), 500);
        });

    res.json((getUser as []).pop()).status(200);
});

export default router;