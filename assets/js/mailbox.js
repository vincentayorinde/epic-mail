
const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};
openNav();

const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};
closeNav();

const showSearchMobile = () => {
  const value = document.getElementById('searchMobile').style.visibility;
  if(value === 'hidden'){
    document.getElementById('searchMobile').style.visibility = 'visible';
    const icon = document.getElementById("searchIcon");
icon.className = "fas fa-times";
  }else{
    document.getElementById('searchMobile').style.visibility = 'hidden';
    const icon = document.getElementById("searchIcon");
icon.className = "fas fa-search";
  }

};
