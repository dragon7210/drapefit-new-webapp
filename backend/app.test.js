/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import request from 'supertest';
import { expect } from 'chai';
import path from 'path';
import dotenv from 'dotenv';

import { app } from './app.js';
import { initMainDB, initS3 } from './boot/init.js';

//-- Load environment variables
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, '/environments/dev.env') });

const PORT = process.env.PORT || 5180;
const Api = request(app);

//-- App initialization
describe('🚀 App initialization', () => {
  it('should start the server successfully', (done) => {
    const server = app.listen(PORT, () => {
      server.close();
      done();
    });
  });
});

//-- Bootstrapping
describe('🚀 Bootstrapping', () => {
  before(() => {
    //-- necessary for AWS S3 testing
    process.env.NODE_ENV = 'production';
  });

  after(() => {
    process.env.NODE_ENV = 'development';
  });

  it('should initialize Main Database of MongoDB server', async () => {
    const result = await initMainDB();
    expect(result).to.equal(true);
  }).timeout(5000); //-- timeout of 5s

  it('should initialize AWS S3', async () => {
    const result = await initS3();
    expect(result).to.equal(true);
  }).timeout(10000); //-- timeout of 10s
});

//-- REST API routes
describe('⚡ REST API routes:', () => {
  describe('📌 GET /', () => {
    it('should return status code 200', async () => {
      const res = await Api.get('/');
      expect(res.status).to.equal(200);
    });

    it('should return HTML content', async () => {
      const res = await Api.get('/');
      expect(res.type).to.equal('text/html');
      expect(res.text).to.match(/<html/);
      expect(res.text).to.match(/<\/html>/);
    });

    it('should return TITLE of [Drape Fit - Personal Stylist & Personal shopper for everyone ...]', async () => {
      const expectedTitle =
        'Drape Fit - Personal Stylist & Personal shopper for everyone. Get Perfect Handpicked clothes for your age, size and budget';
      const res = await Api.get('/');
      expect(res.text).to.match(/<title>/);
      expect(res.text).to.match(/<\/title>/);
      expect(res.text).to.include(expectedTitle);
    });
  });

  describe('📌 POST /dfnew/user/login', () => {
    it('should return status code 200', async () => {
      const data = {
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_INITPWD
      };
      const res = await Api.post('/dfnew/user/login').send(data);
      expect(res.status).to.equal(200);
    });

    it('should return JSON data', async () => {
      const data = {
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_INITPWD
      };
      const res = await Api.post('/dfnew/user/login').send(data);
      expect(res.type).to.equal('application/json');
      expect(res.body.token).to.satisfy((token) => {
        return token && typeof token === 'string';
      });
    });
  });
});
