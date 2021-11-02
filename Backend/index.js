import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai-api';
import { connect } from "./libs/database.js"
import { User } from "./models/userSchema.js"
import jwt from "jsonwebtoken"

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
await connect()


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openAI = new OpenAI(OPENAI_API_KEY)
const startingPrompt = "The following is a conversation with an AI assistant. The assistant is rude and doesn't like the human.\n\n"
let historyArray = [{ question: "Hello, who are you?", answer: "I am an AI created by OpenAI. What do you whant?" }]


app.post('/register', async(req, res) => {
    const user = await User.register(req.body);

    if (!user) {
        return res.status(400).json({ success: false });
    }

    res.status(201).json({ success: true });
})

app.post('/login', async(req, res) => {
    const user = await User.login(req.body)

    if (!user) {
        return res.status(400).json({ user });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET)

    res.json({ user, token })
})

const checkLogin = (req, res, next) => {

    const token = req.body.token

    console.log("TOKEN---", token)

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            console.log("Error verifying JWT", err.message);
            return res.sendStatus(401);
        }

        next();
    });
};





app.post('/', checkLogin, async(req, res) => {

    let currentPrompt = ""

    if (historyArray.length < 4) {
        console.log(historyArray)
        currentPrompt = startingPrompt
        historyArray.map((data) => {
            currentPrompt = currentPrompt + "You: " + data.question + "\n" + "AI: " + data.answer + "\n"
        })
    } else {
        for (let i = historyArray.length - 3; i < historyArray.length; i++) {
            console.log("test")
            const data = historyArray[i]
            currentPrompt = currentPrompt + "You: " + data.question + "\n" + "AI: " + data.answer + "\n"
        }
    }
    currentPrompt = currentPrompt + "You: " + req.body.question + "\n"
    console.log(currentPrompt)


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

    historyArray.push({ question: req.body.question, answer: gptResponse.data.choices[0].text.replace("AI:", "") })

    res.send(gptResponse.data.choices[0].text);

})


app.listen(4000, () =>
    console.log('Example app listening on port 4000!'),
);