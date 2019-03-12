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
      return this.res.status(400).send({
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
}

export default Message;