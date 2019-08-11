
const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};
openNav();

const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};
closeNav();

const openMessage = () => {
  document.getElementById('readMessage').style.width = '100%';
};
const closeMessage = () => {
  document.getElementById('readMessage').style.width = '0%';
};

let token;
let theOutput = '';
let messageOutput = '';
let totalMessage = '';
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

const getSentMessage = (id) => {
  console.log('ID:', id);
  const messageContent = document.getElementById('message-content');
  if (messageContent.style.visibility === 'hidden') {
    messageContent.style.visibility = 'visible';
    document.getElementById(id).classList.remove('record');
    document.getElementById(id).classList.add('record-hover');
    document.getElementById('content-dp').style.visibility = 'visible';
    // Get specific message
    fetch(`http://localhost:5000/api/v2/messages/sent/${id}`, {
      method: 'GET',
      headers: { 'x-access-token': token },
    }).then((res) => {
      // Redirect the user to the sign in page
      // If the token has expired
      if (res.status === 401) {
        window.location.replace('./sign-in.html');
      }
      return res.json();
    })
      .then((messageData) => {
        console.log(messageData.data.subject);
        console.log(document.cookie);
        if (messageData) {
          messageOutput = `
          <p><strong>${messageData.data.senderid}</strong> to <strong>${messageData.data.receiverid}</strong> on ${messageData.data.createon} </p>
          <h1>${messageData.data.subject}</h1>
          <p>${messageData.data.message}</p>
        `;
          console.log(messageOutput);
        } else {
          console.log(messageData.message);
        }
        document.getElementById('message-content').innerHTML = messageOutput;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    messageContent.style.visibility = 'hidden';
    document.getElementById(id).classList.remove('record-hover');
    document.getElementById(id).classList.add('record');
    document.getElementById('content-dp').style.visibility = 'hidden';
    document.getElementById('message-content').innerHTML = '';
  }
};
// Gett all messages
fetch('http://localhost:5000/api/v2/messages/sent', {
  method: 'GET',
  headers: { 'x-access-token': token },
}).then((res) => {
  // Redirect the user to the sign in page
  // If the token has expired
  if (res.status === 401) {
    window.location.replace('./sign-in.html');
  }
  return res.json();
})
  .then((data) => {
    console.log(data.data.rows[0].subject);
    console.log(document.cookie);
    console.log(data.data.rowCount);
    if (data) {
      totalMessage = data.data.rowCount;
      data.data.rows.forEach((message) => {
        // Show message as sent
        theOutput += `
          <div onclick="getSentMessage(${message.id});" id="${message.id}" class="record">
          <span>${message.createon}</span> <i onclick="deleteMessage(${message.id})" class="fas fa-trash-alt del"></i><br>
          <span> <h3>To ${message.receiverid}</h3> </span>
          <h4>${message.subject}</h4>
          <p>${message.message}</p>
        </div>`;
      });
      console.log(theOutput);
    } else {
      console.log(data.message);
    }
    document.getElementById('notification').innerHTML = totalMessage;
    document.getElementById('sent-data').innerHTML = theOutput;
  })
  .catch((err) => {
    console.log(err);
  });

const deleteMessage = (id) => {
  // Delete specific message
  fetch(`http://localhost:5000/api/v2/messages/${id}`, {
    method: 'DELETE',
    headers: { 'x-access-token': token },
  }).then((res) => {
    // Redirect the user to the sign in page
    // If the token has expired
    if (res.status === 401) {
      window.location.replace('./sign-in.html');
    }
    return res.json();
  })
    .then((data) => {
      console.log(data.message);
      console.log(document.cookie);
      window.location.replace('./mailbox.html');
    })
    .catch((err) => {
      console.log(err);
    });
};
