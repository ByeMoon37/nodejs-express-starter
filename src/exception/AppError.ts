// BASED IN: 
// https://medium.com/@herbertmoroni/from-net-to-node-js-mastering-express-error-handling-3dcd57f08b84

class AppError extends Error {
    statusCode: number;
    status: 'fail' | 'error';

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
};

export { AppError };