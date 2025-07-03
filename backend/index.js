import express from "express";
import "dotenv/config";
import axiosInstance from "./axios.js";
import cors from "cors";
import router from "./routers/router.js";

const app = express();
const port = process.env.port || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Server is running at: http://localhost:${port}`));
