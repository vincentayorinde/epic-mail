import chaiHttp from 'chai-http';
import faker from 'faker';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const should = chai.should();
let userToken;
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
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.confirmPassword).to.equal(
          'Your password does not match',
        );
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
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.firstname).to.equal(
          'Firstname must be between 2 and 30 characters',
        );
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
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.lastname).to.equal(
          'Lastname must be between 2 and 30 characters',
        );
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
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.lastname).to.equal(
          'Lastname must be between 2 and 30 characters',
        );
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
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.lastname).to.equal(
          'Lastname must be only alphabets',
        );
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
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.mobile).to.equal(
          'Mobile number must be a Nigerian',
        );
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test POST /api/v2/auth/signup Endpoint', () => {
  it.only('Should register new user', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        firstname: 'newest',
        lastname: 'newestu',
        password: 'password1',
        confirmPassword: 'password1',
        mobile: '08063475512',
        email: faker.internet.email(),
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('User account created successfully');
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test POST /api/v2/auth/login Endpoint', () => {
  it.only('Should login user and release token', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .send({
        email: 'test@epicmail.com',
        password: 'password1',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Login successful');
        userToken = res.body.token;
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
describe('Test POST /api/v2/messages Endpoint', () => {
  it.only('Should send a message to user', (done) => {
    chai
      .request(app)
      .post('/api/v2/messages')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .send({
        subject: 'First Message',
        message: 'The message',
        status: 'unread',
        receiverId: 'test@epicmail.com',
        receiverdelete: false,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test GET /api/v2/messages Endpoint', () => {
  it.only('Should get all mails', (done) => {
    chai
      .request(app)
      .get('/api/v2/messages')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test GET /api/v2/messages/unread Endpoint', () => {
  it.only('Should get all user unread mails', (done) => {
    chai
      .request(app)
      .get('/api/v2/messages/unread')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test GET /api/v2/messages/sent Endpoint', () => {
  it.only('Should get all user sent mails', (done) => {
    chai
      .request(app)
      .get('/api/v2/messages/sent')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test GET /api/v2/messages/:messageId Endpoint', () => {
  it.only('Should get a specific mail record', (done) => {
    chai
      .request(app)
      .get('/api/v2/messages/1')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test DELETE /api/v2/messages/:messageId Endpoint', () => {
  it.only('Should delete a specific mail record', (done) => {
    chai
      .request(app)
      .delete('/api/v2/messages/1')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test POST /api/v2/groups Endpoint', () => {
  it.only('Should create a group', (done) => {
    chai
      .request(app)
      .post('/api/v2/groups')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .send({
        groupName: 'First Group',
        groupDesc: 'The Group Desc',
        groupEmail: faker.internet.email(),
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test GET /api/v2/groups Endpoint', () => {
  it.only('Should all groups by user', (done) => {
    chai
      .request(app)
      .get('/api/v2/groups')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test PATCH /api/v2/groups/:groupId Endpoint', () => {
  it.only('Should update a group name', (done) => {
    chai
      .request(app)
      .patch('/api/v2/groups/3')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .send({
        groupName: 'First Group Update',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test DELETE /api/v2/group/:groupId Endpoint', () => {
  it.only('Should delete a specific group', (done) => {
    chai
      .request(app)
      .delete('/api/v2/groups/19')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test POST /api/v2/groups/:groupId/users Endpoint', () => {
  it.only('Should not add a user to group if user does not exists', (done) => {
    chai
      .request(app)
      .post('/api/v2/groups/1/users')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .send({
        email: 'Juliet22@gmail.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test DELETE /api/v2/groups/:groupId/users/:userId Endpoint', () => {
  it.only('Should delete a user from group', (done) => {
    chai
      .request(app)
      .delete('/api/v2/groups/1/users/23')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Test POST /api/v2/groups/:groupId/messages Endpoint', () => {
  it.only('Should send message a user from group', (done) => {
    chai
      .request(app)
      .delete('/api/v2/groups/1/messages')
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': userToken, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
