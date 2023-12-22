import express from "express";
import cors from 'cors'
import OpenAI from "openai";

const PORT = process.env.PORT || 8080;

const app = express();
const openai = new OpenAI();

app.use(cors());
app.use(express.json());

async function genereateImage(prompt){
    const response = await openai.images.generate({model: 'dall-e-3', prompt, size: '1024x1024'});
    return response.data;
}

app.post('/api/v1/generateimage', async (req, res)=>{
    const { prompt } = req.body;
    const data = await genereateImage(prompt);
    return res.json(data);
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})