import express from "express";
import configViewEngine from "./config/viewEngine.js";
import initWebRoutes from "./routes/web.js";
import initApiRoutes from "./routes/api.js";
import dotenv from "dotenv";
import cors from "./config/cors.js";
import bodyParser from "body-parser";
// import connection from "./config/connectDB.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8081;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

cors(app);

configViewEngine(app);
initWebRoutes(app);
initApiRoutes(app);

// connection();

app.listen(PORT, () => {
  console.log(">>> JWT backend is running on the port = " + PORT);
});
