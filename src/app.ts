import express from "express"; 
import cors from "cors";
import morgan from "morgan";

const app = express();

//Routes
import shortUrlRoutes from "./routes/shortUrl.routes"

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(morgan('dev'));

app.use("/api", shortUrlRoutes);

export default app;