import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error-middleware";

import tagRouter from "./routers/tag-router";
import userRouter from "./routers/user-router";
import authRouter from "./routers/auth-router";
import eventRouter from "./routers/event-router";
import memberRouter from "./routers/member-router";
import reviewRouter from "./routers/review-router";
import paymentRouter from "./routers/payment-router";
import questionRouter from "./routers/question-router";
import geocodingRouter from "./routers/geocoding-router";
import generatorRouter from "./routers/generator-router";

import { Application } from "express";
import { schedulerService } from "./services";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

schedulerService.startScheduler();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, '..', 'public')));

app.use('/auth', authRouter);
app.use('/api/tags', tagRouter);
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('/api/members', memberRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/generate', generatorRouter);
app.use('/api/questions', questionRouter);
app.use('/api/geocoding', geocodingRouter);

app.use(errorMiddleware);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
