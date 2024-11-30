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
  const searchBar = document.querySelector('.search-bar');
  const searchInput = document.getElementById('searchInput');
  const scrollLinks = document.querySelectorAll('.scroll-link');


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
  chatButton?.addEventListener('click', () => {
    chatBox?.classList.toggle('visible'); // Show/hide chatbox
  });

  // Close chatbox functionality
  closeChatButton?.addEventListener('click', () => {
    chatBox?.classList.remove('visible');
  });

  // Sending message functionality
  sendBtn?.addEventListener('click', async () => {
    const message = chatInput?.value.trim();
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
          chatboxMessages.innerHTML += `<p>TT: ${botMessage}</p>`; // Display bot response
      } else {
          chatboxMessages.innerHTML += `<p>TT: I'm sorry, I couldn't process your request.</p>`;
      }
      chatboxMessages.scrollTop = chatboxMessages.scrollHeight; // Scroll to the bottom
  }

 // Search functionality
 searchBar?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = searchInput?.value.trim();
    if (!query) {
      alert('Please enter a search query.');
      return;
    }

    try {
      const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch search results.');

      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      if (data.message) {
        alert(data.message);
        return;
      }

      displaySearchResults(data.products);
    } catch (error) {
      console.error('Error fetching search results:', error);
      alert('Failed to fetch search results.');
    }
  });

  // Render search results dynamically
  function displaySearchResults(products) {
    const gallery = document.getElementById('item-gallery');
    const productGrid = gallery?.querySelector('.product-grid');

    // Clear existing products
    productGrid.innerHTML = '';

    if (!products || products.length === 0) {
      productGrid.innerHTML = `<p class="no-results">No products found for your query.</p>`;
      gallery.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Populate with new search results
    products.forEach((product) => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <a href="compare_price.html?product=${encodeURIComponent(product.name)}">
          <img src="${product.image || 'icons/default.jpg'}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p class="price">From ${product.prices[0]?.price || 'N/A'}</p>
        </a>
      `;
      productGrid.appendChild(productElement);
    });

    gallery.scrollIntoView({ behavior: 'smooth' });
  }

  // Scroll left functionality
  function scrollLeft() {
    const productGrid = document.querySelector('.product-grid');
    productGrid?.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  // Scroll right functionality
  function scrollRight() {
    const productGrid = document.querySelector('.product-grid');
    productGrid?.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  //scrolling navigation
document.addEventListener('DOMContentLoaded', () => {
    // Select all links with the class "scroll-link"
   
  
    // Add click event listener to each link
    scrollLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        const targetId = link.getAttribute('href'); // Get the href attribute (e.g., #clothing)
        const targetElement = document.querySelector(targetId); // Find the target element by ID
        if (targetElement) {
          // Scroll to the target element smoothly
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });
  
});

