import express from "express";
import cors from 'cors';

const corsOptions = {
    origin: ['http://localhost:5173'],
};

const app = express();

app.use(cors(corsOptions))

app.get('/api', (req, res) => {
    res.send('hello');
});

export default app;