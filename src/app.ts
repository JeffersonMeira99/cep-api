import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cepRoutes from "./routes/cepRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/api", cepRoutes);

export default app;
