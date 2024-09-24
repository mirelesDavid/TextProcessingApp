import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; 
import axios from "axios";
import { config } from 'dotenv';

config();
const app = express();
const port = 8000;

app.use(cors({
  origin: 'http://localhost:3000' 
}));

app.post("/manchester", async (req, res) => {
    try {
        console.log('Sending POST request to Flask API at http://127.0.0.1:5000/manchesterAlg');
        const flaskResponse = await axios.post('http://127.0.0.1:5000/manchesterAlg');
        
        const responseMessage = {
            title: flaskResponse.data,  
        };
        res.json(responseMessage);
    } catch (error) {
        console.error('Error in Flask request:', error.response ? error.response.status : error.message);
        res.status(500).json({ message: 'Failed to get a response from Flask API' });
    }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
