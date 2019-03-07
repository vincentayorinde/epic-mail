
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { assert } = chai;

describe('App', () => {
  it('App should return Testing is Working', () => {
    assert.equal(app(), 'Testing is Working');
  });
});
