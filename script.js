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
      chatBox.classList.toggle('visible'); // Show/hide chatbox
  });

  // Close chatbox functionality
  closeChatButton.addEventListener('click', () => {
      chatBox.classList.remove('visible');
  });

  // Sending message functionality
  sendBtn.addEventListener('click', async function () {
      const message = chatInput.value.trim();
      if (message) {
          // Display user message
          chatboxMessages.innerHTML += `<p>You: ${message}</p>`;
          chatInput.value = ''; // Clear input field

          // Send message to the API
          await sendMessageToAPI(message);
      }
  });

  // Function to send message to the OpenAI API
  async function sendMessageToAPI(message) {
      const apiKey = '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' // Insert your actual OpenAI API key here
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
              model: "gpt-3.5-turbo", // Use the appropriate model
              messages: [{ role: "user", content: message }]
          })
      });

      // Handle API response
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
          const botMessage = data.choices[0].message.content;
          chatboxMessages.innerHTML += `<p>C-Makky: ${botMessage}</p>`; // Display bot response
      } else {
          chatboxMessages.innerHTML += `<p>C-Makky: I'm sorry, I couldn't process your request.</p>`;
      }
      chatboxMessages.scrollTop = chatboxMessages.scrollHeight; // Scroll to the bottom
  }

  // Search functionality for popular tools
  document.getElementById('search-form').addEventListener('submit', showSearchInfo);

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
});
