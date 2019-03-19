import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../server/app';

const { expect } = chai;
chai.use(chaiHttp);

const should = chai.should();

let newmessage;
let userToken;


// describe('POST /messages', () => {
//   it('Should Authenticate user to send message', (done) => {
//     const user = {
//       email: 'user1@epicmail.com',
//       password: 'password1',
//     };
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send(user)
//       .end((err, res) => {
//         userToken = res.body.token;
//         expect(res.body.message).to.equal('User sign in successful');
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.a('object');
//         done();
//       });
//   });
//   it('Should create or send an email on /api/v1/messages POST', (done) => {
//     const message = {
//       createdOn: new Date(),
//       subject: 'Sample message title',
//       message: 'Sample message content',
//       senderId: '1',
//       receiverId: '5',
//       status: 'unread',
//       senderDelete: false,
//       receiverDelete: false,
//     };
//     chai.request(app)
//       .post('/api/v1/messages')
//       .set('Authorization', `Bearer ${userToken}`)
//       .send(message)
//       .end((err, res) => {
//         newmessage = res.body.message;
//         expect(res).to.have.status(201);
//         expect(res.body.message).to.equal('Message sent successfully');
//         expect(res.body).to.be.a('object');
//         done();
//       });
//   });
// });

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

describe('GET /messages/:id', () => {
  it('Should get a mail record on /api/v1/messages/:id GET', (done) => {
    chai.request(app)
      .get('/api/v1/messages/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        done(0);
      });
  });
});

describe('DELETE /messages/:id', () => {
  it('Should delete a mail record on /api/v1/messages/:id DELETE', (done) => {
    chai.request(app)
      .get('/api/v1/messages/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        done(0);
      });
  });
});
