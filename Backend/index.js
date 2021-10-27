import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai-api';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openAI = new OpenAI(OPENAI_API_KEY)


app.get('/test', (req, res) => {});

app.post('/', async(req, res) => {
    const gptResponse = await openAI.complete({
        engine: 'davinci',
        prompt: req.body.question,
        maxTokens: 5,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['\n', "testing"]
    });

    res.send(gptResponse.data.choices[0].text);

})


app.listen(4000, () =>
    console.log('Example app listening on port 4000!'),
);