import moment from 'moment';
import db from '../db/index';
import Helper from '../helpers/helpers';

const Group = {
  async createGroup(req, res) {
    const { groupName, groupDesc, groupEmail } = req.body;
    if (groupName === '' || groupDesc === '' || groupEmail === '') {
      return res.status(400).send({ status: 400, message: 'All fiels are required' });
    }
    const checkGroupQuery = 'SELECT * FROM groupTable WHERE groupmail=$1 LIMIT 1';
    const groupQuery = `INSERT INTO
      groupTable(id, groupname, groupdesc, groupmail, ownerid, createdon, modifieddate)
      VALUES(DEFAULT, $1, $2, $3, $4, $5, $6) returning *`;
    const AddOwnerToGroupQuery = `INSERT INTO groupMemberTable(id, groupid, groupemail, memberid, memberemail, role, join_date)
      VALUES(DEFAULT, (SELECT id FROM groupTable WHERE groupmail=$4 LIMIT 1), (SELECT groupmail FROM groupTable WHERE groupmail=$4 LIMIT 1), (SELECT id FROM userTable WHERE email=$1), $1, $2, $3) returning *`;
    const { rows } = await db.query(checkGroupQuery, [groupEmail]);
    if (rows.length) { return res.status(409).send({ status: 409, message: 'Group already exists' }); }
    const values = [groupName, groupDesc, groupEmail, req.user.id, moment(new Date()), moment(new Date())];
    const { row } = await db.query(groupQuery, values);
    const ownerValues = [req.user.id, 'admin', moment(new Date()), groupEmail];
    try {
      await db.query(AddOwnerToGroupQuery, ownerValues);
      return res.status(201).send({ status: 201, message: 'Group created successfully' });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        status: 400,
        message: 'Bad request',
      });
    }
  },
  async getAllGroups(req, res) {
    const AllGroupsQuery = 'SELECT * FROM groupTable WHERE ownerid=$1 ORDER BY modifieddate DESC';
    try {
      const { rows, rowCount } = await db.query(AllGroupsQuery, [req.user.id]);
      return res.status(200).send({
        status: 200,
        message: 'All groups retrieved successfully',
        data: { rowCount, rows },
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Bad request',
        error,
      });
    }
  },
  async editGroupName(req, res) {
    const findOneGroupQuery = 'SELECT * FROM groupTable WHERE id=$1';
    const patchOneGroupQuery = 'UPDATE groupTable SET groupname=$1,groupdesc=$2,modifieddate=$3 WHERE id=$4 returning *';
    try {
      const { rows } = await db.query(findOneGroupQuery, [req.params.groupId]);
      if (!rows[0]) {
        return res.status(404).send({ status: 404, message: 'Group not found' });
      }
      const values = [
        req.body.groupname || rows[0].groupname,
        req.body.groupdesc || rows[0].groupdesc,
        moment(new Date()), req.params.groupId,
      ];
      const row = await db.query(patchOneGroupQuery, values);
      return res.status(200).send({
        status: 200,
        message: 'Group updated successfully',
        data: row.rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Group name could not be updated',
        error,
      });
    }
  },
  async getSpecificGroup(req, res) {
    const findOneGroupQuery = 'SELECT * FROM groupTable WHERE id=$1';
    try {
      const { rows } = await db.query(findOneGroupQuery, [req.params.groupId]);
      if (!rows[0]) {
        return res.status(404).send({ status: 404, message: 'Group not found' });
      }
      return res.status(200).send({
        status: 200,
        message: 'Group retrieved successfully',
        data: rows[0],
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        message: 'Group not found',
        error,
      });
    }
  },
  async getSpecificGroupMembers(req, res) {
    const findOneGroupQuery = 'SELECT * FROM groupmembertable WHERE groupid=$1 AND memberemail<>$2 ';
    try {
      const { rows } = await db.query(findOneGroupQuery, [req.params.groupId, req.user.id]);
      if (!rows) {
        return res.status(404).send({ status: 404, message: 'Group not found' });
      }
      return res.status(200).send({
        status: 200,
        message: 'Group retrieved successfully',
        data: rows,
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        message: 'Group not found',
        error,
      });
    }
  },
  async deleteGroup(req, res) {
    const deleteGroupQuery = 'DELETE FROM grouptable WHERE id=$1 AND ownerid=$2 returning *';
    const deleteUserGroupQuery = 'DELETE FROM groupmembertable WHERE groupid=$1 returning *';

    try {
      await db.query(deleteUserGroupQuery, [req.params.groupId]);
      const { rows } = await db.query(deleteGroupQuery, [req.params.groupId, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Group not found',
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Group deleted successfully',
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        message: 'Group not found',
        error,
      });
    }
  },
  async addUserToGroup(req, res) {
    const { email, role } = req.body;
    if (!Helper.isValidEmail(email)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid email address' });
    }
    const checkUserQuery = 'SELECT * FROM userTable WHERE email=$1 LIMIT 1';
    const findUserQuery = 'SELECT * FROM groupmembertable WHERE groupid=$1 AND memberemail=$2 LIMIT 1';
    const insertUserToGroupQuery = `INSERT INTO groupMemberTable(id, groupid, groupemail, memberid, memberemail, role, join_date)
      VALUES(DEFAULT, (SELECT id FROM groupTable WHERE id=$1), (SELECT groupmail FROM groupTable WHERE id=$1), (SELECT id FROM userTable WHERE email=$2), (SELECT email FROM userTable WHERE email=$2), $3, $4) returning *`;
    const { rows } = await db.query(checkUserQuery, [email]);
    if (!rows.length) { return res.status(400).send({ status: 400, message: 'User does not exist, add account , and try again' }); }
    const data = await db.query(findUserQuery, [req.param.groupId, email]);
    if (data.rows.length) { return res.status(409).send({ status: 409, message: 'User already exist in group' }); }
    const values = [req.params.groupId, email, role, moment(new Date())];
    try {
      const { rows } = await db.query(insertUserToGroupQuery, values);
      return res.status(200).send({ status: 200, message: 'User added to group successfully', data: rows[0] });
    } catch (error) {
      console.log(error);
      if (error.routine === '_bt_check_unique') {
        return res.status(409).send({ status: 409, message: 'User with that email already exist in group' });
      }
      return res.status(404).send({ status: 404, message: 'Group does not exits' });
    }
  },
  async deleteUserGroup(req, res) {
    const { groupId, userId } = req.params;
    const deleteUserGroupQuery = 'DELETE FROM groupmembertable WHERE memberid=$1 AND groupid=$2 returning *';
    const values = [userId, groupId];
    try {
      const { rows } = await db.query(deleteUserGroupQuery, values);
      if (!rows[0]) {
        return res.status(404).send({ status: 404, message: 'User not found' });
      }
      return res.status(200).send({ status: 200, message: 'User deleted from group successfully' });
    } catch (error) {
      return res.status(404).send({ status: 404, message: 'Group not found' });
    }
  },

  async sendMailGroup(req, res) {
    const { subject, message } = req.body;
    const selectMembers = 'SELECT memberid FROM groupmembertable WHERE groupid=$1';
    const sendMailGroupQuery = `INSERT INTO
      messageTable(id, createon, subject, message, parentmessageid, status, senderid, receiverid, senderdelete, receiverdelete)
      VALUES(DEFAULT,$1, $2, $3, $4, $5, (SELECT groupmail FROM groupTable WHERE id=$6), (SELECT email FROM userTable WHERE id=$7), $8, $9) returning *`;
    try {
      const { rows } = await db.query(selectMembers, [req.params.groupId]);
      if (!rows[0]) { return res.status(404).send({ status: 404, message: 'Group not found' }); }
      rows.forEach((row) => {
        db.query(sendMailGroupQuery,
          [moment(new Date()), subject, message, 0, 'unread', req.params.groupId, row.memberid, false, false]);
      });
      return res.status(200).send({ status: 200, message: 'Mail sent to group successfully', data: rows });
    } catch (error) {
      if (error.routine !== '_bt_check_unique') {
        return res.status(400).send({ status: 400, message: 'Receiver email does not exist' });
      }
      return res.status(400).send({ status: 400, message: 'Bad request', error });
    }
  },
};

export default Group;
