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
  document.getElementById('mySidenav').style.width = '0';
};
loadContent('inbox');

const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};
openNav();

const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};
closeNav();
