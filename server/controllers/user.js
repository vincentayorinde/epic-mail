import moment from 'moment';
import Cookies from 'js-cookie';
import db from '../db/index';
import Helper from '../helpers/helpers';
import Mail from '../helpers/mail';


const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async signUp(req, res) {
    const { errors, isValid } = Helper.validateCreateUser(req.body);
    let {
      password, email, firstname, lastname, mobile,
    } = req.body;
    if (!isValid) {
      return res.status(400).send({ status: 400, errors });
    }
    mobile = parseInt(mobile, 10);
    mobile = `+234${mobile}`;
    const hashPassword = Helper.hashPassword(password);
    const signUpQuery = `INSERT INTO userTable(id, email, firstname, lastname, password, mobile, join_date)
      VALUES(DEFAULT, $1, $2, $3, $4, $5, $6) returning *`;
    const values = [email, firstname, lastname, hashPassword, mobile, moment(new Date())];
    try {
      const { rows } = await db.query(signUpQuery, values);
      const token = Helper.generateToken(rows[0].id);
      delete rows[0].password;
      return res.status(201).send({ status: 201, message: 'User account created successfully', data: { ...rows[0], token } });
    } catch (error) {
      console.log(error);
      if (error.routine === '_bt_check_unique') {
        return res.status(409).send({ status: 409, message: 'User with that email already exist' });
      }
      return res.status(401).send({ status: 401, message: 'Sign up failed' });
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
        return res.status(401).send({ status: 401, error: 'Username or Password is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].password, password)) {
        return res.status(401).send({ status: 401, error: 'Username or Password is incorrect' });
      }
      const token = Helper.generateToken(rows[0].email);
      res.cookie('userData', token, { maxAge: 3600000, httpOnly: false });
      // res.AddHeader('Set-Cookie', `userData=${token}; path=/;`);
      // Cookies.set('userData', token, { expires: 7, path: '' });
      console.log(req.headers.userData);
      return res.status(200).send({ status: 200, message: 'Login successful', token });
    } catch (error) {
      console.log('>>>>>>',error);
      return res.status(401).send({ status: 401, message: 'Auth failed' });
    }
  },
  async forgotPassword(req, res) {
    // Gets user email
    const { email } = req.body;
    const checkEmailQuery = 'SELECT * FROM userTable WHERE email = $1';
    try {
      const { rows } = await db.query(checkEmailQuery, [email]);
      if (!rows[0]) {
        return res.status(401).send({ status: 401, error: 'email does not exists' });
      }
      const token = Helper.generateToken(rows[0].email);
      Mail.reset(email, token);
      return res.status(200).send({ status: 200, message: 'Reset Link Sent' });
    } catch (error) {
      return res.status(401).send({ status: 401, message: 'Auth failed' });
    }
  },
  async resetPassword(req, res) {
    const { errors, isValid } = Helper.validateForgetPassword(req.body);
    const {
      newPassword,
    } = req.body;
    if (!isValid) {
      return res.status(400).send({ status: 400, errors });
    }
    const hashPassword = Helper.hashPassword(newPassword);
    const updatePasswordQuery = 'UPDATE userTable SET password=$1 WHERE email=$2 returning *';
    const values = [hashPassword, req.user.id];
    try {
      const { rows } = await db.query(updatePasswordQuery, values);
      return res.status(200).send({ status: 200, message: 'Password reset successful, You can now login' });
    } catch (error) {
      console.log(error);
      return res.status(401).send({ status: 401, message: 'Reset password failed. Try again' });
    }
  },
  async profilePic(req, res) {
    const pic = req.body.picture;
    console.log(pic);
  },
};

export default User;
