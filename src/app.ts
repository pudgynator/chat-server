import express from "express";
import cors from 'cors';
import router from "./routes/index.js";

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions))

app.use(router);

app.get('/api', (_req, res) => {
    res.send('hello');
});

export default app;