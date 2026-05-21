/**
* Define all your API web-routes
* 
* Recommendation:
* Separate routes into files defined according to their category.
* For example:
* a set of routes related to authentication, or those that all begin with `api/auth/`,
* would be better organized (and more so) into a single file like`auth.routes.ts OR
* authRoutes.ts OR auth-routes.ts`.
* 
*/

import { Router } from 'express';
import AuthRoutes from './auth.routes.ts';

const router: Router = Router();

/**
* Personal recommendation:
* use a special prefix for each route type based on its category,
* as explained earlier, for Example: `app.use('/auth/', authRouter)`
*/
router.use('/auth', AuthRoutes);

export default router;