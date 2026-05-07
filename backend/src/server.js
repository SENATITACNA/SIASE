const express = require("express");
const cors = require("cors");
const db = require("./src/config/db");

const app = express();

app.use(cors());
app.use(express.json());