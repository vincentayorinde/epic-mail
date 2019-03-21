import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db/usersDb';
import validateCreatUser from '../helpers/validateCreateUser';
import validateUserLogin from '../helpers/validateUserLogin';

class User {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  static createUser(req, res) {
    const { errors, isValid } = validateCreatUser(req.body);
    const { password } = req.body;
    if (!isValid) {
      return res.status(400).send({
        status: 400,
        errors,
      });
    }
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({
          status: 500,
          error: err,
        });
      }


      let user = [];
      jwt.sign({ user }, 'secretKey', (err, token) => {
        user = {
          token,
          id: db.length + 1,
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          mobile: req.body.mobile,
          password: hash,
        };
        db.push(user);
        return res.status(201).send({
          status: 201,
          message: 'User account created successfully',
          data: user,
        });
      });
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  static userLogin(req, res) {
    const { errors, isValid } = validateUserLogin(req.body);
    const { email, password } = req.body;
    if (!isValid) {
      return res.status(400).send({
        status: 400,
        errors,
      });
    }

    const user = db.find(dbUser => dbUser.email === email);
    if (user) {
      const IsPassword = bcrypt.compareSync(password, user.password);
      if (IsPassword) {
        const token = jwt.sign(user, 'secretKey', { expiresIn: '1h' });
        return res.status(200).send({
          status: 200,
          message: 'User sign in successful',
          data: { ...user, token },
        });
      }
    }
    return res.status(400).send({
      status: 400,
      message: 'Username or Password Incorrect',
    });
  }
}

export default User;
