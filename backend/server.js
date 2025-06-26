import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import TVRoutes from "./routes/tv.route.js";
import userRouter from "./routes/user.routes.js";
import searchRoute from "./routes/search.routes.js";
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';


const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/tv", TVRoutes);
app.use("/api/user", userRouter);
app.use("/api/search", searchRoute);

app.listen(PORT, ()=>{
     console.log("Server started at http://localhost:" + PORT);
     connectDB();
})