import express from "express";
import cors from 'cors';
import router from "./routes/index.js";

const corsOptions = {
    origin: ['http://localhost:5173'],
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions))

app.use(router);

app.get('/api', (req, res) => {
    res.send('hello');
});

export default app;