

function login(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:5000/api/v2/auth/login', {
    headers: new Headers({
      'Content-Type': 'application/json',

    }),
    method: 'POST',
    credentials: 'include', // Don't forget to specify this if you need cookies
    body: JSON.stringify({
      email,
      password,
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
        location.href = './mailbox.html';
      }
    })
    .catch((err) => {
      console.log('Kindly check your Internet connection');
      console.log(err);
    });
}
document.getElementById('signin').addEventListener('click', login);
