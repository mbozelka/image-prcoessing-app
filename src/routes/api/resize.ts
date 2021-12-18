import express from 'express';
import { Request, Response, NextFunction } from 'express';

const resizeImage = express.Router();
const requiredParams = ['imageName', 'width', 'height'];
const excpectedExtensions = ['jpg', 'jpeg', 'png'];

const validParamsKeys = (keys: string[], requiredParams: string[]) => {

    if (keys.length !== requiredParams.length) {
        return false;
    }

    let validParams = true;
    keys.forEach(key => {
        const valid = requiredParams.includes(key);

        if (!valid) validParams = valid;
    });

    return validParams;
};

const validImageName = (val: string, excpectedExtensions: string[]) => {
    const name = val.split('.');

    return name.length === 2 && excpectedExtensions.includes(name[1]);
};

const isInt = (val: string) => {
    const num = parseFloat(val);
    return !isNaN(Number(val)) && (num| 0) === num;
};

const imageLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log('Log resizing request');
    next();
};

const imageParamValidation = (req: Request, res: Response, next: NextFunction) => {
    const params = req.query;
    const paramKeys = Object.keys(params);

    // check for correct parameter keys
    if (!validParamsKeys(paramKeys, requiredParams)) {
        throw new Error('Incorrect paramaters');
    } 

    // check param values meet minimum requirments
    for (const key of paramKeys) {
        const val = params[key];
        let error = false;

        if (key === 'imageName' && typeof val === 'string') {
            error = !validImageName(val, excpectedExtensions);
        } else if (typeof val === 'string') {
            error = !isInt(val);
        } else {
            error = true;
        }

        if (error) {
            throw new Error('Incorrect paramaters values');
        }
    }

    next();
};

const imageResize = (req: Request, res: Response, next: NextFunction) => {
    console.log('resize image');
    next();
};

const resizeMiddleware = [
    imageLogger,
    imageParamValidation,
    imageResize
];

resizeImage.use(resizeMiddleware);

resizeImage.get('/', (req, res) => {
    res.send('Image resized');
});

export default resizeImage;
