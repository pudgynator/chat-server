import express from "express";
import cors from 'cors';
import router from "./routes/index.js";

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', process.env.CLIENT_URL!],
    credentials: true,
}))

app.use(express.json());

app.use(router);

app.get('/api', (_req, res) => {
    res.send('hello');
});

export default app;