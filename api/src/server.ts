import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as path from 'path';

import customerController from './controllers/customerController';
import specController from './controllers/specController';
// import productCategoryController from './controllers/productCategoryController';
// import productImageGalleryController from './controllers/productImageGalleryController';
// import stockController from './controllers/stockController';
import userProfileController from './controllers/userProfileController';

class Server {

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  // application config
  public config(): void {

    // const MONGO_URI: string = 'mongodb://localhost/kaseedb';
    const MONGO_URI: string = 'mongodb://mongo:27017/kaseedb';
    mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

    // express middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());

    // cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();

    this.app.use('/', router);
    this.app.use('/api/v1/customers', customerController);
    this.app.use('/api/v1/specifications', specController);
    // this.app.use('/api/v1/product-categories', productCategoryController);
    // this.app.use('/api/v1/product-images', productImageGalleryController);
    // this.app.use('/api/v1/stock', stockController);
    this.app.use('/api/v1/users', userProfileController);
  }
}



// export
export default new Server().app;