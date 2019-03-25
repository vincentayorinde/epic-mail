const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};
openNav();

const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};
closeNav();

let token;
let theOutput = '';
let groupOutput = '';
const messageOutput = '';
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
function addUserToGroup(id) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;
  const groupId = id;
 console.log(groupId);
  fetch(`http://localhost:5000/api/v2/groups/${groupId}/users`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
    method: 'POST',
    credentials: 'include', // Don't forget to specify this if you need cookies
    body: JSON.stringify({
      email,
      role,
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
        console.log(groupId);
        // location.href = './group.html';
      }
    })
    .catch((err) => {
      console.log('Kindly check your Internet connection');
      console.log(err);
    });
}
function addToGroup(id) {
  console.log('ID:', id);
  theOutput = `
        <div id="notify">User added successfully!</div>
        <h3>Add new Group</h3>
        <form action="#" method="post" onsubmit="fadeIn(); return false;">
        <div>
          <input type="email" id="email" required placeholder="User email" />
        </div>
            <div>
              <select id="role" required>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
        <button onclick="addUserToGroup(${id})">Add user to group</button>
      </form>
        `;
  console.log(theOutput);
  document.getElementById('group-content').innerHTML = theOutput;
  // document.getElementById('add-user-group').addEventListener('click', addUserToGroup);

}
function createGroup(e) {
  e.preventDefault();
  const groupName = document.getElementById('groupName').value;
  const groupEmail = document.getElementById('groupEmail').value;
  const groupDesc = document.getElementById('desc').value;

  fetch('http://localhost:5000/api/v2/groups', {
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
    method: 'POST',
    credentials: 'include', // Don't forget to specify this if you need cookies
    body: JSON.stringify({
      groupName,
      groupEmail,
      groupDesc,
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
        location.href = './group.html';
        console.log(data);
      }
    })
    .catch((err) => {
      console.log('Kindly check your Internet connection');
      console.log(err);
    });
}
document.getElementById('group').addEventListener('click', createGroup);


function addUserToGroup(groupId) {
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;

  fetch(`http://localhost:5000/api/v2/groups/${groupId}/users`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
    method: 'POST',
    credentials: 'include', // Don't forget to specify this if you need cookies
    body: JSON.stringify({
      email,
      role,
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
        location.href = './group.html';
      }
    })
    .catch((err) => {
      console.log('Kindly check your Internet connection');
      console.log(err);
    });
}
// document.getElementById('add-user').addEventListener('click', addUserToGroup);
const deleteGroup = (id) => {
  // Delete specific message
  fetch(`http://localhost:5000/api/v2/groups/${id}`, {
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
      console.log(data);
      console.log(document.cookie);
      window.location.replace('./group.html');
    })
    .catch((err) => {
      console.log(err);
    });
};
function editGroup(id) {
  console.log('ID:', id);
  fetch(`http://localhost:5000/api/v2/groups/${id}`, {
    method: 'GET',
    headers: { 'x-access-token': token },
  }).then((res) => {
    // Redirect the user to the sign in page
    // If the token has expired
    if (res.status === 401) {
      window.location.replace('./sign-in.html');
    }
    return res.json();
  }).then((groupData) => {
    if (groupData) {
      console.log(groupData);
      groupOutput = `
      <div id="notify">Group updated successfully!</div>
      <h3>Edit Group</h3>
      <form action="#" method="post" onsubmit="fadeIn(); return false;">
      <div>
        <input type="text" id="groupname" value="${groupData.data.groupname || ''}" required />
      </div>
      <div>
      <textarea rows="10" id="desc" required/>${groupData.data.groupdesc || ''}</textarea>
      </div>
      <button onclick="updateGroup(${id})">Update group</button>
    </form>
    `;
  } 
  document.getElementById('group-content').innerHTML = groupOutput;
  }).catch((err) => {
    console.log(err);
  });
}
function updateGroup(id) {
  console.log('ID:', id);
  // e.preventDefault();
  const groupname = document.getElementById('groupname').value;
  const groupdesc = document.getElementById('desc').value;

  fetch(`http://localhost:5000/api/v2/groups/${id}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
    method: 'PATCH',
    credentials: 'include', // Don't forget to specify this if you need cookies
    body: JSON.stringify({
      groupname,
      groupdesc,
    }),
  })
  .then(response => response.json())
  .then((data) => {
      console.log(data);
      window.location.replace('./group.html');
      const cookies = document.cookie.userData;
      console.log(cookies);
    })
}
function getGroupMembers(id) {
  console.log('ID:', id);
  fetch(`http://localhost:5000/api/v2/groups/${id}/members`, {
    method: 'GET',
    headers: { 'x-access-token': token },
  }).then((res) => {
    // Redirect the user to the sign in page
    // If the token has expired
    if (res.status === 401) {
      window.location.replace('./sign-in.html');
    }
    return res.json();
  }).then((groupMemberData) => {
    if (groupMemberData) {
      console.log(groupMemberData);
      groupOutput = `<h3>All users in "${groupMemberData.data[0].groupemail}" group </h3><br><ol>`;
      groupMemberData.data.forEach((group) => {
        groupOutput += `
             <li>${group.memberemail} <button class="del-button"> delete </button></li>
        </div>`;
      });
      groupOutput += `</ol>`;

  } 
  document.getElementById('group-content').innerHTML = groupOutput;
  }).catch((err) => {
    console.log(err);
  });
}
// Gett all groups
fetch('http://localhost:5000/api/v2/groups', {
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
      data.data.rows.forEach((group) => {
        // Show message as sent
        theOutput += `
          <div id="${group.id}" class="record">
          <span>${group.createdon}</span><i onclick="deleteGroup(${group.id})" class="fas fa-trash-alt opts"></i> <i onclick="editGroup(${group.id})" class="fas fa-edit opts"></i>  <i onclick="addToGroup(${group.id})" class="fas fa-user-plus opts"></i>  <br>
          <span> <h3><em>Group Name: </em> ${group.groupname}</h3> </span>
          <h4 onclick="getGroupMembers(${group.id})">${group.groupdesc}</h4>
          <p onclick="getGroupMembers(${group.id})">${group.groupmail}</p>
        </div>`;
      });
      console.log(theOutput);
    } else {
      console.log(data.message);
    }
    document.getElementById('notification').innerHTML = totalMessage;
    document.getElementById('box-5-group-data').innerHTML = theOutput;
  })
  .catch((err) => {
    console.log(err);
  });
