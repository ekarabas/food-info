// Backend for the purpose of hiding the API key
// https://www.youtube.com/watch?v=FcwfjMebjTU&t=26s
import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json(`Hello, API Key: ${process.env.API_KEY}`);
});

// Home page list of all the food elements
app.get("/foodlist", (req, res) => {
  try {
    fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/list?dataType=&pageSize=50&pageNumber=1&api_key=${process.env.API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        res.json(data);
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Individual food page list of nutrients, etc.
app.get("/foodpage", (req, res) => {
  try {
    fetch(
      `https://api.nal.usda.gov/fdc/v1/food/${req.query.fdcId}?api_key=${process.env.API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        res.json(data);
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Choose which port the backend is running on
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
