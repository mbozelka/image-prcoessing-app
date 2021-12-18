import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/api', routes);

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).json({ message: err.message });
});  

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
