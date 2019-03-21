import ValidData from 'validator';
import isValueEmpty from './isValueEmpty';

const validateMessage = (data) => {
  const errors = {};

  /* Value passed in to data may be empty but may not be a string
     so the isValueEmpty helps us to ensure that if its empty.
     We made it an empty string so that it can be checked by the validator.isEmpty method
     This is due to the fact that validator.isEmpty can only check for empty string not empty object
  */

  if (isValueEmpty(data.senderId) || !ValidData.isInt(data.senderId)) {
    errors.senderId = 'ID is invalid';
  }

  if (isValueEmpty(data.receiverId) || !ValidData.isInt(data.receiverId)) {
    errors.receiverId = 'ID is invalid';
  }

  if (isValueEmpty(data.message) || !ValidData.isLength(data.message, { min: 2 })) {
    errors.message = 'Message must be min 2 characters';
  }

  if (isValueEmpty(data.subject)
  || ValidData.isEmpty(data.subject) || !ValidData.isLength(data.subject, { min: 2 })) {
    errors.subject = 'Subject must be min 2 characters';
  }

  return {
    errors,
    isValid: isValueEmpty(errors),
  };
};

export default validateMessage;
