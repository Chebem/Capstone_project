document.addEventListener('DOMContentLoaded', () => {
  const loginLink = document.querySelector('.login-link');
  const registerLink = document.querySelector('.register-link');
  const logregBox = document.querySelector('.logreg-box');
  const loginForm = document.querySelector('.form-box.login');
  const registerForm = document.querySelector('.form-box.register');
  const closeButtons = document.querySelectorAll('.form-box .close');
  const userIcon = document.querySelector('.user-icon');
  const chatButton = document.getElementById('chatbot-toggle');
  const chatBox = document.querySelector('.chatbox');
  const closeChatButton = document.querySelector('.close-chatbox');
  const sendBtn = document.getElementById('send-btn');
  const chatInput = document.getElementById('chat-input');
  const chatboxMessages = document.getElementById('chatbox-messages');

  // Toggle between login and register forms
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


  // Chatbot toggle functionality
  chatButton.addEventListener('click', function () {
    console.log("Chat button clicked"); // Debug log to check if the button is working
    console.log(chatBox); // Make sure this logs the correct chatbox element
    chatBox.classList.toggle('visible'); // Show/hide chatbox
  });

  // Close chatbox functionality
  closeChatButton.addEventListener('click', () => {
    chatBox.classList.remove('visible');
  });

  // Sending message functionality
  sendBtn.addEventListener('click', function () {
    const message = chatInput.value.trim();
    if (message) {
      // Display user message
      chatboxMessages.innerHTML += `<p>You: ${message}</p>`;
      chatInput.value = ''; // Clear input field

      // Simulate chatbot response
      sendMessageToAPI(message);
    }
  });



  let scrollAmount = 0; // Current scroll position
const scrollStep = 300; // Amount to scroll each time (in pixels)

function scrollLeft() {
  const productGrid = document.querySelector('.product-grid');
  scrollAmount -= scrollStep; // Move left
  productGrid.style.transform = `translateX(${scrollAmount}px)`; // Apply transform
}

function scrollRight() {
  const productGrid = document.querySelector('.product-grid');
  scrollAmount += scrollStep; // Move right
  productGrid.style.transform = `translateX(${scrollAmount}px)`; // Apply transform
}



  // Function to simulate sending a message to the chatbot API
  function sendMessageToAPI(message) {
    // Simulating chatbot response
    setTimeout(() => {
      chatboxMessages.innerHTML += `<p>Chatbot: This is a response to "${message}"</p>`;
      chatboxMessages.scrollTop = chatboxMessages.scrollHeight; // Scroll to the bottom
    }, 1000);
  }

  
  function scrollToProducts() {
    const itemGallery = document.getElementById('item-gallery');
    itemGallery.scrollIntoView({ behavior: 'smooth' });
  }


 
});

// Search functionality for popular tools
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
    default:
      alert('No results found');
      return;
  }

  window.location.href = url;
}

