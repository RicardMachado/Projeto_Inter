/* eslint-disable @typescript-eslint/no-unused-vars */
import 'express-async-errors';
import express from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors';

import {globalErros} from './middlewares/globalErros'
import routes from './routes';

createConnection().then(connection => {
  const app = express();
  const PORT = 3334;
  
  app.use(cors())
  app.use(express.json())
  app.use(routes);

  app.use(globalErros);
  
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.log("Unable to connect to the database", error)
});