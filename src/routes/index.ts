import express from 'express';
import resizeImage from './api/resize';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('<h1>Image resizing application</h1>');  
});

routes.use('/resize', resizeImage);


export default routes;