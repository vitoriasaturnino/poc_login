import express from "express";
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
import { db } from './database/db';

const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(PORT, async () => {
  await db.sync();
  console.log(`Server is runnin localhost ${PORT}!`);
});