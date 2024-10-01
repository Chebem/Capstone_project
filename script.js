document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const logregBox = document.querySelector('.logreg-box');
    const loginForm = document.querySelector('.form-box.login');
    const registerForm = document.querySelector('.form-box.register');
    const closeButtons = document.querySelectorAll('.form-box .close');
    const userIcon = document.querySelector('.user-icon'); 
  
    loginLink.addEventListener('click', () => {
      logregBox.classList.add('active');
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
    });
  
    registerLink.addEventListener('click', () => {
      logregBox.classList.add('active');
      registerForm.classList.add('active');
      loginForm.classList.remove('active');
    });
  
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        logregBox.classList.remove('active');
        loginForm.classList.remove('active');
        registerForm.classList.remove('active');
      });
    });

    userIcon.addEventListener('click', () => {
      logregBox.classList.add('active');
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
    });
  });
  
  
  function showSearchInfo(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.toLowerCase();
    let url = '';
  
    switch(query) {
      case 'canva':
        url = 'https://www.canva.com/';
        break;
      case 'chatsonic':
        url = 'https://writesonic.com/chat';
        break;
        case 'grammarly':
          url = 'https://www.grammarly.com/';
          break;
        case 'jasper':
        case 'jarvis':
          url = 'https://www.jasper.ai/';
          break;
        case 'synthesia':
          url = 'https://www.synthesia.io/';
          break;
        case 'murf.ai':
        case 'murf':
          url = 'https://murf.ai/';
          break;
        case 'scribe':
          url = 'https://scribehow.com/';
          break;
        case 'lumen5':
          url = 'https://www.lumen5.com/';
          break;
        case 'descript':
          url = 'https://www.descript.com/';
          break;
        case 'edmodo':
          url = 'https://www.edmodo.com/';
          break;
        case 'khan academy':
          url = 'https://www.khanacademy.org/';
          break;
        case 'capcut':
          url = 'https://www.capcut.com/';
          break;
        // Add more cases for other AI-integrated software and apps
        default:
          alert('No results found');
          return;
      }
  
      window.location.href = url;
    };
  
     
  
  