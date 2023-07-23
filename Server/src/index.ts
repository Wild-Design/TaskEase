import server from './app.js';
import db from './db/db.js';
import { config } from 'dotenv';
config();

const { PORT } = process.env;

(async () => {
  await db.sync();
  server.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
  });
})();
