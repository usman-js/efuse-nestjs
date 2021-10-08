import fs from 'fs';
const path = require('path');
import { env } from 'process';

import dotenv from 'dotenv';

import { mongoose } from '../../transformers/mongoose.transformer';
import { DB_CONNECTION_TOKEN } from '../../constants/system.constant';

const envConfig = dotenv.parse(
  fs.readFileSync(path.join(__dirname, '../../../', '.env')),
);

for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

export const databaseProvider = {
  inject: [],
  provide: DB_CONNECTION_TOKEN,
  useFactory: async () => {
    let reconnectionTask = null;
    const RECONNECT_INTERVAL = 6000;

    // Send alert email（When sending mail，The database has reached the end of the day）
   

    // Connect to the database
    function connection() {
      return mongoose.connect(env.DB_URI, {
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useNewUrlParser: true,
        // useFindAndModify: false,
        promiseLibrary: global.Promise,
      });
    }

    mongoose.connection.on('connecting', () => {
      console.log('Database connection...');
    });

    mongoose.connection.on('open', () => {
      console.info('Database connection is successful！');
      clearTimeout(reconnectionTask);
      reconnectionTask = null;
    });

    mongoose.connection.on('disconnected', () => {
      console.error(
        `Database connection lost！try ${RECONNECT_INTERVAL / 1000}s Reconnect`,
      );
      reconnectionTask = setTimeout(connection, RECONNECT_INTERVAL);
    });

    mongoose.connection.on('error', (error) => {
      console.error('Database exception！', error);
      mongoose.disconnect();

      //Send DB exception email if production
    });

    return await connection();
  },
};
