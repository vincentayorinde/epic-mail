import moment from 'moment';
import db from '../db/index';
import Helper from '../helpers/helpers';
import smsPackage from '../helpers/sms';

const Message = {
  /**
   * Send a mail
   * @param {object} req
   * @param {object} res
   * @returns {object} mail object
   */
  async sendMail(req, res) {
    const {
      subject, message, receiverId, status, receiverdelete,
    } = req.body;
    if (!Helper.isValidEmail(receiverId)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid receiver email address' });
    }
    const getPhone = 'SELECT mobile FROM userTable WHERE email=$1 LIMIT 1';
    const phoneValue = [receiverId];
    const sendMailQuery = `INSERT INTO
      messageTable(id, createon, subject, message, parentmessageid, status, senderid, receiverid, senderdelete, receiverdelete)
      VALUES(DEFAULT,$1, $2, $3, $4, $5, $6, (SELECT email FROM userTable WHERE email=$7), $8, $9)
      returning *`;
    const values = [moment(new Date()), subject, message, 0, status, req.user.id, receiverId, false, receiverdelete];
    try {
      await db.query(sendMailQuery, values);
      if (status !== 'draft') {
        const { rows } = await db.query(getPhone, phoneValue);
        console.log(rows[0].mobile);
        // await smsPackage.sendSMS(req.user.id, rows[0].mobile, subject, message);
      }
      return res.status(201).send({ status: 201, message: 'Email sent successfully' });
    } catch (error) {
      console.log(error);
      if (error.routine !== '_bt_check_unique') {
        return res.status(400).send({ status: 400, message: 'Receiver email does not exist' });
      }
      return res.status(400).send({ status: 400, message: 'Bad request', error });
    }
  },
  /**
   * Get All Mails
   * @param {object} req
   * @param {object} res
   * @returns {object} mails array
   */
  async getAllMails(req, res) {
    const AllMailsQuery = 'SELECT * FROM messageTable WHERE receiverid=$1 AND receiverdelete=false ORDER BY id DESC';
    try {
      const { rows, rowCount } = await db.query(AllMailsQuery, [req.user.id]);
      if (rowCount < 1) {
        return res.status(200).send({
          status: 200,
          message: 'No mails found',
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Emails retrieved successfully',
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
  /**
   * Get All Mails Received by User
   * @param {object} req
   * @param {object} res
   * @returns {object} mails array
   */
  async getAllUnreadMailByUser(req, res) {
    const AllMailsByUserQuery = 'SELECT * FROM messageTable WHERE status=$1 AND receiverId=$2';
    const values = [
      'unread',
      req.user.id,
    ];
    try {
      const { rows, rowCount } = await db.query(AllMailsByUserQuery, values);
      if (rowCount < 1) {
        return res.status(200).send({
          status: 200,
          message: 'No mails found',
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Unread Emails retrieved successfully',
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
  /**
   * Get All Mails Sent by User
   * @param {object} req
   * @param {object} res
   * @returns {object} mails array
   */
  async sentByUser(req, res) {
    const sentByUserQuery = 'SELECT * FROM messageTable WHERE senderId=$1 ORDER BY createon DESC';
    try {
      const { rows, rowCount } = await db.query(sentByUserQuery, [req.user.id]);
      if (rowCount < 1) {
        return res.status(200).send({
          status: 200,
          message: 'No mails found',
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Sent Emails retrieved successfully',
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
  /**
   * Get All Mails Sent by User
   * @param {object} req
   * @param {object} res
   * @returns {object} mails array
   */
  async draftByUser(req, res) {
    const draftByUserQuery = 'SELECT * FROM messageTable WHERE senderId=$1 AND status=$2 ORDER BY createon DESC';
    try {
      const { rows, rowCount } = await db.query(draftByUserQuery, [req.user.id, 'draft']);
      if (rowCount < 1) {
        return res.status(200).send({
          status: 200,
          message: 'No mails found',
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Draft Emails retrieved successfully',
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
  /**
   * Get A Specific Mail
   * @param {object} req
   * @param {object} res
   * @returns {object} mail object
   */
  async getAMailRecord(req, res) {
    const findMailQuery = 'SELECT * FROM messageTable WHERE id = $1';
    const updateMailQuery = 'UPDATE messageTable SET status=$1 WHERE id=$2 returning *';
    try {
      const { rows } = await db.query(findMailQuery, [req.params.messageId]);
      if (!rows[0]) {
        return res.status(200).send({ status: 200, message: 'no unread mail with ID provided' });
      }
      const values = ['read', rows[0].id];
      const row = await db.query(updateMailQuery, values);
      return res.status(200).send({
        status: 200,
        message: 'Email retrieved successfully',
        data: row.rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'mail not found',
      });
    }
  },
  async getASentMailRecord(req, res) {
    const findMailQuery = 'SELECT * FROM messageTable WHERE id = $1';
    try {
      const { rows } = await db.query(findMailQuery, [req.params.messageId]);
      if (!rows[0]) {
        return res.status(200).send({ status: 200, message: 'no unread mail with ID provided' });
      }
      return res.status(200).send({
        status: 200,
        message: 'Email retrieved successfully',
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'mail not found',
      });
    }
  },
  /**
   * Get A Specific Mail
   * @param {object} req
   * @param {object} res
   * @returns {object} mail object
   */
  async sendDraft(req, res) {
    const findMailQuery = 'SELECT * FROM messageTable WHERE id = $1';
    const updateMailQuery = 'UPDATE messageTable SET status=$1, receiverdelete=$2 WHERE id=$3 returning *';
    try {
      const { rows } = await db.query(findMailQuery, [req.params.messageId]);
      if (!rows[0]) {
        return res.status(200).send({ status: 200, message: 'no draft mail with ID provided' });
      }
      const values = ['unread', false, rows[0].id];
      const row = await db.query(updateMailQuery, values);
      location.href = 'http://google.com';
      return location.href;
      // return res.status(200).send({
      //   status: 200,
      //   message: 'Draft sent successfully',
      //   data: row.rows[0],
      // });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'mail not found',
      });
    }
  },
  /**
   * Get A Specific Mail
   * @param {object} req
   * @param {object} res
   * @returns {object} mail object
   */
  async getADraftRecord(req, res) {
    const findMailQuery = 'SELECT * FROM messageTable WHERE id = $1';
    try {
      const { rows } = await db.query(findMailQuery, [req.params.messageId]);
      if (!rows[0]) {
        return res.status(200).send({ status: 200, message: 'no draft mail with ID provided' });
      }
      return res.status(200).send({
        status: 200,
        message: 'Draft retrieved successfully',
        data: rows[0],
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        status: 400,
        message: 'mail not found',
      });
    }
  },
  /**
   * Delete A Mail
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   *
   */
  async deleteUserMail(req, res) {
    const senderDeletionUpdateQuery = 'UPDATE messageTable SET senderDelete=$1 WHERE senderid=$2 AND id=$3 returning *';
    const receiverDeletionUpdateQuery = 'UPDATE messageTable SET receiverDelete=$1 WHERE receiverid=$2 AND id=$3 returning *';
    const deleteQuery = 'DELETE FROM messageTable WHERE senderDelete=$1 AND receiverDelete=$1 AND id=$2 returning *';
    try {
      const senderValues = [true, req.user.id, req.params.messageId];
      const { rows1 } = await db.query(senderDeletionUpdateQuery, senderValues);
      const receiverValues = [true, req.user.id, req.params.messageId];
      const { rows2 } = await db.query(receiverDeletionUpdateQuery, receiverValues);
      const deleteValues = [true, req.params.messageId];
      const { rows3 } = await db.query(deleteQuery, deleteValues);
      if (!rows1[0] || !rows2[0] || !rows3[0]) {
        return res.status(404).send({ status: 404, message: 'mail not found' });
      }
      return res.status(200).send({
        status: 200,
        message: 'Email deleted successfully',
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        message: 'mail not found',
      });
    }
  },
};


export default Message;
