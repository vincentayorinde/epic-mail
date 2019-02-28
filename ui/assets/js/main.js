
// const validate = () => {
// const email = document.getElementById('email').value;
// const regxEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|// (([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//   // if (regxEmail.test(email)) {
//   //   document.getElementById('labeltext').innerHTML = 'valid';
//   //   document.getElementById('labeltext').style.visibility = 'visible';
//   //   document.getElementById('labeltext').style.color = 'green';
//   // } else {
//   //   document.getElementById('labeltext').innerHTML = 'invalid';
//   //   document.getElementById('labeltext').style.visibility = 'visible';
//   //   document.getElementById('labeltext').style.color = 'red';
//   // }
// };
// validate();
const showProfileMenu = () => {
  const profileMenu = document.getElementById('profile-menu');
  if (profileMenu.style.display === 'none') {
    profileMenu.style.display = 'block';
  } else {
    profileMenu.style.display = 'none';
  }
};
showProfileMenu();
