"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const logger = require("morgan");
const customerController_1 = require("./controllers/customerController");
const specController_1 = require("./controllers/specController");
const specVersionController_1 = require("./controllers/specVersionController");
const userProfileController_1 = require("./controllers/userProfileController");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    // application config
    config() {
        const MONGO_URI = 'mongodb://localhost/kaseedb';
        //const MONGO_URI: string = 'mongodb://mongo:27017/kaseedb';
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
    routes() {
        const router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/customers', customerController_1.default);
        this.app.use('/api/v1/specifications', specController_1.default);
        this.app.use('/api/v1/specificationVersions', specVersionController_1.default);
        this.app.use('/api/v1/users', userProfileController_1.default);
    }
}
// export
exports.default = new Server().app;
//# sourceMappingURL=server.js.map