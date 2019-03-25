// let theAuthorizationToken;
function signup(e) {
  e.preventDefault();
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const mobile = document.getElementById('mobile').value;
  const email = document.getElementById('email').value;
  if (confirmPassword !== password) {
    console.log(`For password ${confirmPassword}`);
    console.log(`For password ${password}`);
    return false;
  }
  // emailvalue = email.value;
  // passwordvalue = password.value;
  // console.log(`email and password ${emailvalue} and ${passwordvalue}`);
  fetch('http://localhost:5000/api/v2/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      firstname,
      lastname,
      password,
      confirmPassword,
      mobile,
      email,
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
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
        location.href = './sign-in.html';
      }
    })
    .catch((err) => {
      console.log('The User Registration failed');
      console.log(err);
    });
}
document.getElementById('sign-up').addEventListener('click', signup);
