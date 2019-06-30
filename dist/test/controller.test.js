"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _faker = _interopRequireDefault(require("faker"));

var _chai = _interopRequireDefault(require("chai"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var should = _chai["default"].should();

var userToken;
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

    _chai["default"].request(_app["default"]).post('/api/v2/auth/signup').send(user).end(function (err, res) {
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

    _chai["default"].request(_app["default"]).post('/api/v2/auth/signup').send(user).end(function (err, res) {
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

    _chai["default"].request(_app["default"]).post('/api/v2/auth/signup').send(user).end(function (err, res) {
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

    _chai["default"].request(_app["default"]).post('/api/v2/auth/signup').send(user).end(function (err, res) {
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

    _chai["default"].request(_app["default"]).post('/api/v2/auth/signup').send(user).end(function (err, res) {
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

    _chai["default"].request(_app["default"]).post('/api/v2/auth/signup').send(user).end(function (err, res) {
      expect(res.body.errors.mobile).to.equal('Mobile number must be a Nigerian');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test POST /api/v2/auth/signup Endpoint', function () {
  it.only('Should register new user', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signup').send({
      firstname: 'newest',
      lastname: 'newestu',
      password: 'password1',
      confirmPassword: 'password1',
      mobile: '08063475512',
      email: _faker["default"].internet.email()
    }).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body.message).to.equal('User account created successfully');
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test POST /api/v2/auth/login Endpoint', function () {
  it.only('Should login user and release token', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/login').send({
      email: 'test@epicmail.com',
      password: 'password1'
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Login successful');
      userToken = res.body.token;
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test POST /api/v2/messages Endpoint', function () {
  it.only('Should send a message to user', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/messages').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).send({
      subject: 'First Message',
      message: 'The message',
      status: 'unread',
      receiverId: 'test@epicmail.com',
      receiverdelete: false
    }).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test GET /api/v2/messages Endpoint', function () {
  it.only('Should get all mails', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v2/messages').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test GET /api/v2/messages/unread Endpoint', function () {
  it.only('Should get all user unread mails', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v2/messages/unread').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test GET /api/v2/messages/sent Endpoint', function () {
  it.only('Should get all user sent mails', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v2/messages/sent').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test GET /api/v2/messages/:messageId Endpoint', function () {
  it.only('Should get a specific mail record', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v2/messages/1').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test DELETE /api/v2/messages/:messageId Endpoint', function () {
  it.only('Should delete a specific mail record', function (done) {
    _chai["default"].request(_app["default"])["delete"]('/api/v2/messages/1').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test POST /api/v2/groups Endpoint', function () {
  it.only('Should create a group', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/groups').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).send({
      groupName: 'First Group',
      groupDesc: 'The Group Desc',
      groupEmail: _faker["default"].internet.email()
    }).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test GET /api/v2/groups Endpoint', function () {
  it.only('Should all groups by user', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v2/groups').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test PATCH /api/v2/groups/:groupId Endpoint', function () {
  it.only('Should update a group name', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v2/groups/3').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).send({
      groupName: 'First Group Update'
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test DELETE /api/v2/group/:groupId Endpoint', function () {
  it.only('Should delete a specific group', function (done) {
    _chai["default"].request(_app["default"])["delete"]('/api/v2/groups/19').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test POST /api/v2/groups/:groupId/users Endpoint', function () {
  it.only('Should not add a user to group if user does not exists', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/groups/1/users').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).send({
      email: 'Juliet22@gmail.com'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test DELETE /api/v2/groups/:groupId/users/:userId Endpoint', function () {
  it.only('Should delete a user from group', function (done) {
    _chai["default"].request(_app["default"])["delete"]('/api/v2/groups/1/users/23').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
describe('Test POST /api/v2/groups/:groupId/messages Endpoint', function () {
  it.only('Should send message a user from group', function (done) {
    _chai["default"].request(_app["default"])["delete"]('/api/v2/groups/1/messages').set('Content-Type', 'application/json').set({
      'x-access-token': userToken,
      Accept: 'application/json'
    }).end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});