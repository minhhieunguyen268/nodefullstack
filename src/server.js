import express from "express";
import configViewEngine from "./configs/viewEngine.js";
import initWebRoutes from "./routes/web.js";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoutes(app);


app.listen(PORT, () => {
  console.log(">>> JWT backend is running on the port = " + PORT);
});
