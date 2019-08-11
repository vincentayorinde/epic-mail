
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


let token = '';
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

const getDraftMessage = (id) => {
  console.log('ID:', id);
  const messageContent = document.getElementById('message-content');
  if (messageContent.style.visibility === 'hidden') {
    messageContent.style.visibility = 'visible';
    document.getElementById(id).classList.remove('record');
    document.getElementById(id).classList.add('record-hover');
    document.getElementById('content-dp').style.visibility = 'visible';
    // Get specific message
    fetch(`http://localhost:5000/api/v2/messages/draft/${id}`, {
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
        console.log(messageData);
        console.log(messageData.data.subject);
        console.log(document.cookie);
        if (messageData) {
          document.cookie = `senderid=${messageData.data.senderid};path=/`;
          document.cookie = `receiverid=${messageData.data.receiverid};path=/`;
          document.cookie = `subject=${messageData.data.subject};path=/`;
          document.cookie = `message=${messageData.data.message};path=/`;

          const senderid = document.cookie.replace(/(?:(?:^|.*;\s*)senderid\s*\=\s*([^;]*).*$)|^.*$/, '$1');
          const receiverid = document.cookie.replace(/(?:(?:^|.*;\s*)receiverid\s*\=\s*([^;]*).*$)|^.*$/, '$1');
          const subject = document.cookie.replace(/(?:(?:^|.*;\s*)subject\s*\=\s*([^;]*).*$)|^.*$/, '$1');
          const message = document.cookie.replace(/(?:(?:^|.*;\s*)message\s*\=\s*([^;]*).*$)|^.*$/, '$1');

          messageOutput = `
          <form method="post">
          <p><strong>${senderid}</strong> to 
          <input type="email" value="${receiverid}" id="receiverId" required disabled />
          on ${messageData.data.createon} </p>
          <div>
              <input type="text" value="${subject}" id="subject" required placeholder="Subject" />
          </div>
          <div>
          <textarea id="message" rows="10" required>${message}</textarea>
          </div>
          <button onclick="sendDraftMessage(${messageData.data.id});" id="sendDraft">Send</button>
          </form>
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
fetch('http://localhost:5000/api/v2/messages/draft', {
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
    console.log(data);
    console.log(data.data.rows[0].subject);
    console.log(document.cookie);
    console.log(data.data.rowCount);
    if (data) {
      totalMessage = data.data.rowCount;
      data.data.rows.forEach((message) => {
        // Show message as sent
        theOutput += `
          <div onclick="getDraftMessage(${message.id});" id="${message.id}" class="record">
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
    document.getElementById('draft-data').innerHTML = theOutput;
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
function sendDraftMessage(id) {
  console.log('ID:', id);

  // e.preventDefault();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const receiverId = document.getElementById('receiverId').value;
  const status = 'unread';
  const receiverdelete = false;

  fetch(`http://localhost:5000/api/v2/messages/draft/${id}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
    method: 'PUT',
    credentials: 'include', // Don't forget to specify this if you need cookies
    body: JSON.stringify({
      subject,
      message,
      receiverId,
      status,
      receiverdelete,
    }),
  })
  // // .then(response => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     // check if the output data is a validation error / an error
  //     const errorExists = Object.keys(data);
  //     if (errorExists[0] === 'error') {
  //       // console.log('displaying from inside');
  //       // extract the object value from the key, to determine the validation error throw by the api validator
  //       const displayError = Object.values(data);
  //       // console.log(`Displaying errors ${displayError[0]}`);
  //       console.log(displayError);
  //     } else {
  //       const cookies = document.cookie.userData;
  //       console.log(cookies);
  //     }
  //     // location.href('./sent.html');
  //   })
    .catch((err) => {
      console.log('Kindly check your Internet connection');
      console.log(err);
    });
}
// document.getElementById('sendDraft').addEventListener('click', sendDraftMessage());
