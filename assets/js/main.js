const showProfileMenu = () => {
  const profileMenu = document.getElementById('profile-menu');
  if (profileMenu.style.display === 'none') {
    profileMenu.style.display = 'block';
  } else {
    profileMenu.style.display = 'none';
  }
};
showProfileMenu();

const loadContent = (page) => {
  document.getElementById('content').innerHTML = `<object type='text/html' data='mailbox/${page}.html' ></object>`;
};
loadContent('inbox');

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById('mySidenav').style.width = '250px';
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
}
