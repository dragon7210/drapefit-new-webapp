/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import favicon from 'express-favicon';
import { createWriteStream } from 'node:fs';
import parseJson from 'parse-json';
import normalizeUrl from 'normalize-url';

import userRoutes from './routes/userRoutes.js';
import supplyRouter from './routes/supply/index.js';
import uploadRoutes from './routes/uploadRoutes.js';
import adminRoutes from './routes/admin/index.js';
import clientRoutes from './routes/client/index.js';
// import adminSupplierRoutes from './routes/adminSupplierRoutes.js';
// import adminMerchandiseRoutes from './routes/adminMerchandiseRoutes.js';
import { errorHandler, notFound } from './middleware/errorMdware.js';
import inventoryRouter from './routes/inventory/index.js';

const __dirname = path.resolve();

const app = express();

//-- Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(
  morgan('common', {
    skip: (req, res) => res.statusCode < 400,
    stream: createWriteStream(
      path.join(__dirname, 'serverlogs', `access-${new Date().toISOString().slice(0, 10)}.log`),
      { flags: 'a' }
    )
  })
);
app.use(favicon(path.join(__dirname, 'frontend', 'public', 'favicon.png')));
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.log(`Request[${key}] is sanitized:`, req);
    }
  })
);

//-- REST API routes
const routingPrefix = '/api/dfnew';
app.use(`${routingPrefix}`, clientRoutes);
app.use(`${routingPrefix}/user`, userRoutes);
app.use(`${routingPrefix}/uploadfile`, uploadRoutes);
app.use(`${routingPrefix}/admmain`, adminRoutes);
app.use(`${routingPrefix}/admsupplier`, supplyRouter);
app.use(`${routingPrefix}/adminventory`, inventoryRouter);
// const mobRoutingPrefix = '/dfmob';
// app.use(`${mobRoutingPrefix}/user`, userMobRoutes);

//-- Static files
app.use('/dfstatic', express.static(path.join(__dirname, '/staticfiles')));

//-- Static routing for Frontend
// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));

//-- Middleware for error handling
app.use(notFound);
app.use(errorHandler);

//-- New Relic instrument
app.get('/instrumentation-example', (req, res) => {
  const instrumentedUrl = normalizeUrl('test:me@drapefit.com');
  const json = '{"key": "value"}';
  const instrumentedJson = parseJson(json);
  instrumentedJson.url = instrumentedUrl;
  res.send(instrumentedJson);
});

export { app };
