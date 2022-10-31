import express from "express";
import Sequelize from 'sequelize';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';
import { db } from './database/db';

const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.Sequelize.sync({ force: true }).then(() => {
  console.log("db has been re sync");
});

app.use('/api/users', userRoutes);

app.listen(PORT, async () => {
  await db.sync();
  console.log(`Server is runnin localhost ${PORT}!`);
});