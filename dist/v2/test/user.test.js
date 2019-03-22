"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _chai = _interopRequireDefault(require("chai"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

_dotenv.default.config();

var should = _chai.default.should();

var userToken;
var newUser;
describe('POST /auth/signup Validations', function () {
  it('Should require confirmation of password to match the  user password', function (done) {
    var user = {
      firstname: 'Vincent',
      lastname: 'Ayorinde',
      email: 'test1@epicmail.com',
      mobile: '08063475512',
      password: 'password2',
      confirmPassword: 'password3'
    };

    _chai.default.request(_app.default).post('/api/v2/auth/signup').send(user).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body.errors.confirmPassword).to.equal('Your password does not match');
      expect(res.body).to.be.a('object');
      done();
    });
  });
  it('Firstname must be between 2 and 30 characters', function (done) {
    var user = {
      firstname: 'v',
      lastname: 'Ayo',
      email: 'email@epicmail.com',
      mobile: '08063475512',
      password: 'Password1',
      confirmPassword: 'Password1'
    };

    _chai.default.request(_app.default).post('/api/v2/auth/signup').send(user).end(function (err, res) {
      expect(res.body.errors.firstname).to.equal('Firstname must be between 2 and 30 characters');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });
  it('Lastname must be between 2 and 30 characters', function (done) {
    var user = {
      firstname: 'Vinay',
      lastname: 'v',
      email: 'email@epicmail.com',
      mobile: '08063475512',
      password: 'Password1',
      confirmPassword: 'Password1'
    };

    _chai.default.request(_app.default).post('/api/v2/auth/signup').send(user).end(function (err, res) {
      expect(res.body.errors.lastname).to.equal('Lastname must be between 2 and 30 characters');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });
  it('Lastname must be between 2 and 30 characters ********', function (done) {
    var user = {
      firstname: 'ayorinde',
      lastname: '',
      email: 'email4@epicmail.com',
      mobile: '08025785342',
      password: 'Password1',
      confirmPassword: 'Password1'
    };

    _chai.default.request(_app.default).post('/api/v2/auth/signup').send(user).end(function (err, res) {
      expect(res.body.errors.lastname).to.equal('Lastname must be between 2 and 30 characters');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });
  it('Lastname must be between only alphabets', function (done) {
    var user = {
      firstname: 'Vincent',
      lastname: 'vinay12',
      email: 'email6@epicmail.com',
      mobile: '08025785342',
      password: 'Password123',
      confirmPassword: 'Password123'
    };

    _chai.default.request(_app.default).post('/api/v2/auth/signup').send(user).end(function (err, res) {
      expect(res.body.errors.lastname).to.equal('Lastname must be only alphabets');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });
  it('Mobile number should be of a nigerian type', function (done) {
    var user = {
      firstname: 'tooplayfull',
      email: 'email@email.com',
      lastname: 'like',
      password: 'password123',
      confirmPassword: 'password123',
      mobile: '4554'
    };

    _chai.default.request(_app.default).post('/api/v2/auth/signup').send(user).end(function (err, res) {
      expect(res.body.errors.mobile).to.equal('Mobile number must be a Nigerian');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});