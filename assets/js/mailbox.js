
const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};
openNav();

const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};
closeNav();

const showSearchMobile = () => {
  document.getElementById('searchMobile').style.visibility = 'visible';
  document.getElementById('searchMobile').style.transition = '1s';
};
const closeSearchMobile = () => {
  document.getElementById('searchMobile').style.visibility = 'hidden';
};