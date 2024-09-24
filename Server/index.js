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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/manacher", async (req, res) => {
    try {
        const { text } = req.body;
        console.log('Sending POST request to Flask API at http://127.0.0.1:5000/manchesterAlg');

        const flaskResponse = await axios.post('http://127.0.0.1:5000/manchesterAlg', { text });

        const { startIndex, endIndex } = flaskResponse.data;

        res.json({ startIndex, endIndex });
    } catch (error) {
        console.error('Error in Flask request:', error.response ? error.response.status : error.message);
        res.status(500).json({ message: 'Failed to get a response from Flask API' });
    }
});

app.post("/longestCommonSubString", async (req, res) => {
    try {
        const { text1, text2 } = req.body;
        console.log('Sending POST request to Flask API at http://127.0.0.1:5000/longestCommonSubString');

        const flaskResponse = await axios.post('http://127.0.0.1:5000/longestCommonSubString', { text1, text2 });

        const { substringCoordinates1, substringCoordinates2 } = flaskResponse.data;

        res.json({ substringCoordinates1, substringCoordinates2 });
    } catch (error) {
        console.error('Error in Flask request:', error.response ? error.response.status : error.message);
        res.status(500).json({ message: 'Failed to get a response from Flask API' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
