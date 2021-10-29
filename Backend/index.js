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
const startingPrompt ="The following is a conversation with an AI assistant. The assistant is rude and doesn't like the human.\n\n"
let historyArray = [{question: "Hello, who are you?", answer:"I am an AI created by OpenAI. What do you whant?" }]


app.get('/test', (req, res) => {});

app.post('/', async(req, res) => {
    console.log(req.body)
    let currentPrompt = ""
    console.log(historyArray.length)
    if (historyArray.length < 4){
        console.log(historyArray)
        currentPrompt = startingPrompt
        historyArray.map((data)=>{
            currentPrompt = currentPrompt + "You: " +data.question +"\n" +"AI: " +data.answer +"\n"
        })
    }else{
        for(let i=historyArray.length - 3;i<historyArray.length;i++){
            data= historyArray[i]
            currentPrompt = currentPrompt + "You: " + data.question +"\n" +"AI: " +data.answer +"\n"
        }
    }
    currentPrompt = currentPrompt + "You: " + req.body.question +"\n"
    console.log(currentPrompt)
    // if(!currentPrompt){
    //     currentPrompt = startingPrompt+req.body.question+"\nAI:"
    // }else{
    //     currentPrompt = currentPrompt+"\nYou:" +req.body.question+"\nAI:"
    // }

    const gptResponse = await openAI.complete({
        engine: 'davinci',
        prompt: currentPrompt,
        maxTokens: 100,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0.6,
        frequencyPenalty: 0,
        stop: ["\n", " Human:"]
    });
    console.log("_______")
    console.log(gptResponse.data.choices[0].text)

    historyArray.push({question:req.body.question,answer:gptResponse.data.choices[0].text})

    res.send(gptResponse.data.choices[0].text);

})


app.listen(4000, () =>
    console.log('Example app listening on port 4000!'),
);