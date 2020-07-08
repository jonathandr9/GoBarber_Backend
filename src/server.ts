import 'reflect-metadata';
import express, { response, request } from 'express';

import routes from './routes/index';
import './database';
import uploadConfig from './config/upload';

const app = express();

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
    console.log('🚀 Server started on port 3333');
});
