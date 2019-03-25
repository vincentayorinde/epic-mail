import moment from 'moment';
import db from '../db/index';
import Helper from '../helpers/helpers';

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async signUp(req, res) {
    const { errors, isValid } = Helper.validateCreateUser(req.body);
    const { password, email, firstname, lastname, mobile } = req.body;
    if (!isValid) {
      return res.status(400).send({ status: 400, errors });
    }
    const hashPassword = Helper.hashPassword(password);
    const signUpQuery = `INSERT INTO userTable(id, email, firstname, lastname, password, mobile, join_date)
      VALUES(DEFAULT, $1, $2, $3, $4, $5, $6) returning *`;
    const values = [email, firstname, lastname, hashPassword, mobile, moment(new Date())];
    try {
      const { rows } = await db.query(signUpQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({ status: 201, message: 'User account created successfully', data: { token } });
    } catch (error) {
      console.log(error);
      if (error.routine === '_bt_check_unique') {
        return res.status(409).send({ status: 409, message: 'User with that email already exist' });
      }
      return res.status(400).send({ status: 400, message: 'Bad request' });
    }
  },
  /**
   * Login User
   * @param {object} req
   * @param {object} res
   * @returns {object}  array
   */
  async loginUser(req, res) {
    const { errors, isValid } = Helper.validateUserLogin(req.body);
    const { email, password } = req.body;
    if (!isValid) { return res.status(400).send({ status: 400, errors }); }
    const signInQuery = 'SELECT * FROM userTable WHERE email = $1';
    try {
      const { rows } = await db.query(signInQuery, [email]);
      if (!rows[0]) {
        return res.status(404).send({ status: 404, error: 'Username or Password is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].password, password)) {
        return res.status(400).send({ status: 400, error: 'Username or Password is incorrect' });
      }
      const token = Helper.generateToken(rows[0].email);
      return res.status(200).send({ status: 200, message: 'Login successful', token });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default User;
