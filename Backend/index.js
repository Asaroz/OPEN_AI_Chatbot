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
const startingPrompt ="The following is a conversation with an AI assistant. The assistant is rude and doesn't like the human.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. What do you whant?\nHuman: "
let currentPrompt = ""


app.get('/test', (req, res) => {});

app.post('/', async(req, res) => {

    console.log(req.body)

    if(!currentPrompt){
        currentPrompt = startingPrompt+req.body.question+"\nAI:"
    }

    const gptResponse = await openAI.complete({
        engine: 'davinci',
        prompt: currentPrompt,
        maxTokens: 100,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0.6,
        frequencyPenalty: 0,
        stop: ["\n", " Human:", " AI:"]
    });

    res.send(gptResponse.data.choices[0].text);

})


app.listen(4000, () =>
    console.log('Example app listening on port 4000!'),
);