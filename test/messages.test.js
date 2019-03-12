import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const should = chai.should();

let newmessage;


describe('POST /messages', () => {
  it('Should create or send an email on /api/v1/messages POST', (done) => {
    const message = {
      createdOn: new Date(),
      subject: 'Sample message title',
      message: 'Sample message content',
      senderId: '3',
      receiverId: '5',
      parentMessageId: [],
      status: 'unread',
      isDeleted: false,
    };
    chai.request(app)
      .post('/api/v1/messages')
      .send(message)
      .end((err, res) => {
        newmessage = res.body.message;
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Message sent successfully');
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('GET /messages', () => {
  it('Should get all receive mails on /api/v1/messages GET', (done) => {
    chai.request(app)
      .get('/api/v1/messages')
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        done(0);
      });
  });
});

describe('GET /messages/unread/:id', () => {
  it('Should get all unread mails by user on /api/v1/messages/unread/:id GET', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unread/2')
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        done(0);
      });
  });
});

describe('GET /messages/sent/:id', () => {
  it('Should get all mails sent by user on /api/v1/messages/sent/:id GET', (done) => {
    chai.request(app)
      .get('/api/v1/messages/sent/:id')
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        done(0);
      });
  });
});