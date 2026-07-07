import express from "express";
import cors from 'cors';

const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: ['http://localhost:5173'],
};
const app = express();

app.use(cors(corsOptions))

app.get('/api', (req, res) => {
    res.send('hello');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})