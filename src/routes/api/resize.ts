import express from 'express';
const resizeImage = express.Router();

resizeImage.get('/', (req, res) => {
    res.send('Time to resize!');  
});

export default resizeImage;