import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const should = chai.should();
let newuser;

describe('POST /auth/signup', () => {
  it('Should Create a new user on /api/v1/auth/signup POST', (done) => {
    const user = {
      email: 'user1@epicmail.com',
      firstname: 'Vincent',
      lastname: 'Ayo',
      mobile: '08033396401',
      password: 'password123',
      rpassword: 'password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        newuser = res.body.user;
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('User account created successfully');
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('POST /auth/signup Validations', () => {
  it('Should require confirmation of password to match the  user password', (done) => {
    const user = {
      firstname: 'Vincent',
      lastname: 'Ayorinde',
      email: 'test1@epicmail.com',
      mobile: '08063475512',
      password: 'password2',
      rpassword: 'password3',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.rpassword).to.equal('Your password does not match');
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('Firstname must be between 2 and 30 characters', (done) => {
    const user = {
      firstname: 'v',
      lastname: 'Ayo',
      email: 'email@epicmail.com',
      mobile: '08063475512',
      password: 'Password1',
      password2: 'Password1',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.firstname).to.equal('Firstname must be between 2 and 30 characters');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Lastname must be between 2 and 30 characters', (done) => {
    const user = {
      firstname: 'Vinay',
      lastname: 'v',
      email: 'email@email.com',
      mobile: '08063475512',
      password: 'Password1',
      password2: 'Password1',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.lastname).to.equal('Lastname must be between 2 and 30 characters');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Lastname must be between 2 and 30 characters ********', (done) => {
    const user = {
      firstname: 'ayorinde',
      lastname: '',
      email: 'email@email.com',
      mobile: '08025785342',
      password: 'Password1',
      password2: 'Password1',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.lastname).to.equal('Lastname must be between 2 and 30 characters');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Lastname must be between only alphabets', (done) => {
    const user = {
      firstname: 'Vincent',
      lastname: 'vinay12',
      email: 'email@email.com',
      mobile: '08025785342',
      password: 'Password123',
      password2: 'Password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.lastname).to.equal('Lastname must be only alphabets');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
