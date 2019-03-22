import moment from 'moment';
import db from '../db/index';
import Helper from './helpers';

const Group = {
  /**
   * Create A Group
   * @param {object} req
   * @param {object} res
   * @returns {object} group object
   */
  async createGroup(req, res) {
    const { groupname, groupdesc, groupmail } = req.body;
    const groupQuery = `INSERT INTO
      groupTable(id, groupname, groupdesc, groupmail, role, ownerid, createdon, modifieddate)
      VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      groupname,
      groupdesc,
      groupmail,
      'admin',
      req.user.id,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(groupQuery, values);
      return res.status(200).send({
        status: 200,
        message: 'Group created successfully',
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Group could not be created because it already exist',
      });
    }
  },
};

export default Group;
