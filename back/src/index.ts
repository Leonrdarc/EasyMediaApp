import express from "express";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from "./helpers/database";
import { PORT } from "./config/env";
import routes from "./routes";

connectDB();

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EasyMedia API Documentation',
      version: '1.0.0',
    },
  },
  // Path to the API docs
  apis: ['./src/routes/*.ts']
};

const specs = swaggerJsDoc(swaggerOptions);

//Middlewares
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//Routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
