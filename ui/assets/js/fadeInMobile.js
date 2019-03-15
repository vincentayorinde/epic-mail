const fadeInMobile = () => { 
  document.getElementById('notifyMobile').style.display = 'block'
setTimeout(() => {
  document.getElementById('notifyMobile').style.display = 'none'
  }, 2000);
};

const fadeIn = () => { 
  document.getElementById('notify').style.display = 'block'
setTimeout(() => {
  document.getElementById('notify').style.display = 'none'
  }, 2000);
};
