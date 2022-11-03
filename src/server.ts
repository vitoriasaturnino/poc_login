import express from "express";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';
import { db } from './database/db';
import 'dotenv/config';

const PORT = process.env.PORT || 3003;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.listen(PORT, async () => {
  await db.sync();
  console.log(`Server is runnin localhost ${PORT}!`);
});