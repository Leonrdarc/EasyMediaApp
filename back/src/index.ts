import express from "express";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from "./helpers/database";
import { PORT } from "./config/env";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerDocument from "../swagger.json";

connectDB();

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200', //setted local only
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())

app.use('/', routes);

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

