import dotenv from 'dotenv';

dotenv.config();

const list = process.env;
const env = {
    app: {
        PORT: list.APP_PORT || 3100,
        NAME: list.APP_NAME || 'ByeMoon37',
        AUTHOR: list.APP_AUTHOR || 'NODE-JS-EXPRESS-STARTER',
        VERSION: list.APP_VERSION || '1.0.0',
        NODE_ENV: list.NODE_ENV || 'development',
    },
    dev: {
        LIFECYCLE_EVENT: (list.pnpm_lifecycle_event || list.npm_lifecycle_event) || 'unknowed',
        USER_AGENT: (list.npm_config_user_agent || '').startsWith('pnpm') ? 'pnpm' :
            (list.npm_config_user_agent || '').startsWith('yarn') ? 'yarn' : 'npm'
    }
};

export { env };