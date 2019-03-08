const fadeIn = () => { 
    document.getElementById('notify').style.display = 'block'
  setTimeout(() => {
    document.getElementById('notify').style.display = 'none'
    }, 2000);
  };
