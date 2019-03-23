import moment from 'moment';
import db from '../db/index';
import Helper from '../helpers/helpers';

const Message = {
  /**
   * Send a mail
   * @param {object} req
   * @param {object} res
   * @returns {object} mail object
   */
  async sendMail(req, res) {
    const { subject, message, receiverId } = req.body;
    if (!Helper.isValidEmail(receiverId)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid receiver email address' });
    }
    const sendMailQuery = `INSERT INTO
      messageTable(id, createon, subject, message, parentmessageid, status, senderid, receiverid, senderdelete, receiverdelete)
      VALUES(DEFAULT,$1, $2, $3, $4, $5, (SELECT email FROM userTable WHERE email=$6), $7, $8, $9)
      returning *`;
    const values = [moment(new Date()), subject, message, 0, 'unread', req.user.id, receiverId, false, false];
    try {
      const { rows } = await db.query(sendMailQuery, values);
      return res.status(201).send({ status: 201, message: 'Email sent successfully', data: { ...rows[0] } });
    } catch (error) {
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
    const AllMailsQuery = 'SELECT * FROM messageTable WHERE senderid=$1 OR receiverid=$1';
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
   * Get All Mails Sent by User
   * @param {object} req
   * @param {object} res
   * @returns {object} mails array
   */
  async getAllMailsSentByUser(req, res) {
    const AllMailsSentByUserQuery = 'SELECT * FROM messageTable WHERE senderId=$1';
    try {
      const { rows, rowCount } = await db.query(AllMailsSentByUserQuery, [req.user.id]);
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
        return res.status(200).send({ status: 200, message: 'no unread mail at the moment' });
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
