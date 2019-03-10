/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db/usersDb';
import validateCreatUser from '../helpers/validateCreateUser';

class User {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  // eslint-disable-next-line consistent-return
  creatUser(req, res) {
    const { errors, isValid } = validateCreatUser(req.body);
    const { password } = req.body;
    // Check validation
    if (!isValid) {
      // return res.status(400).json(errors);
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
}
const userController = new User();
export default userController;
