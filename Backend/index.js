import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get('/', (req, res) => {
    console.log("this shit works")
});


app.listen(3001, () =>
    console.log('Example app listening on port 3000!'),
);