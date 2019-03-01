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
