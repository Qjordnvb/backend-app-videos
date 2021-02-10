import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import videoRoutes from "./routes/video.routes";

const app = express();

app.set("port", config.PORT);

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(videoRoutes);

app.use(morgan("dev"));

export default app;
