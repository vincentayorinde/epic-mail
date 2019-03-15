
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
