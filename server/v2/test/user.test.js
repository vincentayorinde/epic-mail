import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

dotenv.config();
const should = chai.should();
let userToken;
let newUser;

describe('POST /auth/signup Validations', () => {
  it('Should require confirmation of password to match the  user password', (done) => {
    const user = {
      firstname: 'Vincent',
      lastname: 'Ayorinde',
      email: 'test1@epicmail.com',
      mobile: '08063475512',
      password: 'password2',
      confirmPassword: 'password3',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        console.log(res.body, '++++++++');
        expect(res).to.have.status(400);
        expect(res.body.errors.confirmPassword).to.equal('Your password does not match');
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
      confirmPassword: 'Password1',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        console.log(res.body, '++++++++');
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
      email: 'email@epicmail.com',
      mobile: '08063475512',
      password: 'Password1',
      confirmPassword: 'Password1',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        console.log(res.body, '++++++++');
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
      email: 'email4@epicmail.com',
      mobile: '08025785342',
      password: 'Password1',
      confirmPassword: 'Password1',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        console.log(res.body, '++++++++');
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
      email: 'email6@epicmail.com',
      mobile: '08025785342',
      password: 'Password123',
      confirmPassword: 'Password123',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        console.log(res.body, '++++++++');
        expect(res.body.errors.lastname).to.equal('Lastname must be only alphabets');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('Mobile number should be of a nigerian type', (done) => {
    const user = {
      firstname: 'tooplayfull',
      email: 'email@email.com',
      lastname: 'like',
      password: 'password123',
      confirmPassword: 'password123',
      mobile: '4554',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.mobile).to.equal('Mobile number must be a Nigerian');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
