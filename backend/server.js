import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import TVRoutes from "./routes/tv.route.js";
import userRouter from "./routes/user.routes.js";
import searchRoute from "./routes/search.routes.js";
import AIRouter from "./routes/ai.routes.js";
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import path from "path";


const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/tv", TVRoutes);
app.use("/api/user", userRouter);
app.use("/api/search", searchRoute);
app.use("/api/ai", AIRouter);


app.use((req, res, next) => {
  console.log("Incoming request:", req.url);
  next();
});

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, ()=>{
     console.log("Server started at http://localhost:" + PORT);
     connectDB();
})