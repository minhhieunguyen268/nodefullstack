import express from "express";
import configViewEngine from "./configs/viewEngine.js";
import initWebRoutes from "./routes/web.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

configViewEngine(app);
initWebRoutes(app);


app.listen(PORT, () => {
  console.log(">>> JWT backend is running on the port = " + PORT);
});
