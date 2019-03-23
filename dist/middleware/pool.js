"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _this = void 0;

var pool;

var environment = function environment(env) {
  _this.env = process.env.NODE_ENV;

  if (env === 'development') {
    pool = new _pg.Pool({
      connectionString: process.env.DATABASE_URL_DEV
    });
  }

  if (env === 'test') {
    pool = new _pg.Pool({
      connectionString: process.env.DATABASE_URL_TEST
    });
  }

  if (env === 'production') {
    pool = new _pg.Pool({
      connectionString: process.env.DATABASE_URL_PROD
    });
  }
};

var _default = environment;
exports.default = _default;