import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const should = chai.should();


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
