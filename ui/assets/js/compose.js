

let token;
// let theOutput = '';
// let messageOutput = '';
// let totalMessage = '';
try {
  // Get token
  token = document.cookie.replace(/(?:(?:^|.*;\s*)userData\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  if (document.cookie.indexOf('userData=') < 0) {
    console.log('Cookie not found, redirecting you.');
    window.location.replace('./sign-in.html');
  }
} catch (err) {
  console.log(err);
}

function sendUserEmail(e) {
  e.preventDefault();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const receiverId = document.getElementById('receiverId').value;
  const status = 'unread';
  const receiverdelete = false;

  fetch('http://localhost:5000/api/v2/messages', {
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
    method: 'POST',
    credentials: 'include', // Don't forget to specify this if you need cookies
    body: JSON.stringify({
      subject,
      message,
      receiverId,
      status,
      receiverdelete,
    }),
  }).then(response => response.json())
    .then((data) => {
      // check if the output data is a validation error / an error
      const errorExists = Object.keys(data);
      if (errorExists[0] === 'error') {
        // console.log('displaying from inside');
        // extract the object value from the key, to determine the validation error throw by the api validator
        const displayError = Object.values(data);
        // console.log(`Displaying errors ${displayError[0]}`);
        console.log(displayError);
      } else {
        const cookies = document.cookie.userData;
        console.log(cookies);
        location.href = './sent.html';
      }
    })
    .catch((err) => {
      console.log('Kindly check your Internet connection');
      console.log(err);
    });
}
function saveDraft(e) {
  e.preventDefault();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const receiverId = document.getElementById('receiverId').value;
  const status = 'draft';
  const receiverdelete = true;

  fetch('http://localhost:5000/api/v2/messages', {
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
    method: 'POST',
    credentials: 'include', // Don't forget to specify this if you need cookies
    body: JSON.stringify({
      subject,
      message,
      receiverId,
      status,
      receiverdelete,
    }),
  }).then(response => response.json())
    .then((data) => {
      // check if the output data is a validation error / an error
      const errorExists = Object.keys(data);
      if (errorExists[0] === 'error') {
        // console.log('displaying from inside');
        // extract the object value from the key, to determine the validation error throw by the api validator
        const displayError = Object.values(data);
        // console.log(`Displaying errors ${displayError[0]}`);
        console.log(displayError);
      } else {
        const cookies = document.cookie.userData;
        console.log(cookies);
        location.href = './draft.html';
      }
    })
    .catch((err) => {
      console.log('Kindly check your Internet connection');
      console.log(err);
    });
}
document.getElementById('compose').addEventListener('click', sendUserEmail);
document.getElementById('draft').addEventListener('click', saveDraft);
