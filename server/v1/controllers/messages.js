import db from '../db/messagesDb';
import validateMessage from '../helpers/validateMessage';


class Message {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} message object
   */
  static sendMail(req, res) {
    const { errors, isValid } = validateMessage(req.body);
    if (!isValid) {
      return res.status(400).send({
        status: 400,
        errors,
      });
    }
    let message = [];
    message = {
      id: db.length + 1,
      createdOn: new Date(),
      subject: req.body.subject,
      message: req.body.message,
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      parentMessageId: [],
      status: 'unread',
      isDeleted: false,
    };
    db.push(message);
    return res.status(201).send({
      status: 201,
      message: 'Message sent successfully',
      data: message,
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} message object
   */
  static getAllMails(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'All received emails',
      data: db,
    });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} message object
   */

  static getAllUnreadMailByUser(req, res) {
    const result = db.filter(val => val.receiverId === Number(req.params.receiverId) && val.rstatus === 'unread');
    if (result) {
      return res.status(200).send({
        status: 200,
        message: 'All unread received emails by specified user',
        data: result,
      });
    }
    return res.status(404).send({
      status: 404,
      message: 'No unread emails by specified user',
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} message object
   */
  static getAllMailsSentByUser(req, res) {
    const result = db.filter(val => val.senderId === Number(req.params.senderId));
    if (result) {
      return res.status(200).send({
        status: 200,
        message: 'All emails sent by specified user',
        data: result,
      });
    }
    return res.status(404).send({
      status: 404,
      message: 'No emails sent by specified user',
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} message object
   */
  static getAMailRecord(req, res) {
    const result = db.find(dbMail => dbMail.id === Number(req.params.messageId));

    if (result) {
      return res.status(200).send({
        status: 200,
        message: 'Email record retrieved successfully',
        data: result,
      });
    }

    return res.status(404).send({
      status: 404,
      message: 'Email does not exist',
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} message object
   */
  static deleteUserMail(req, res) {
    const result = db.find(dbMail => dbMail.id === Number(req.params.messageId));
    result.isDeleted = true;
    if (result) {
      return res.status(200).send({
        status: 200,
        message: 'Email record deleted successfully',
        data: result,
      });
    }

    return res.status(404).send({
      status: 404,
      message: 'Email does not exist',
    });
  }
}

export default Message;
