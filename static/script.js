document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");
  const logregBox = document.querySelector(".logreg-box");
  const loginForm = document.querySelector(".form-box.login");
  const registerForm = document.querySelector(".form-box.register");
  const closeButtons = document.querySelectorAll(".form-box .close");
  const userIcon = document.querySelector(".user-icon");
  const chatButton = document.getElementById("chatbot-toggle");
  const chatBox = document.querySelector(".chatbox");
  const closeChatButton = document.querySelector(".close-chatbox");
  const sendBtn = document.getElementById("send-btn");
  const chatInput = document.getElementById("chat-input");
  const chatboxMessages = document.getElementById("chatbox-messages");
  const searchBar = document.querySelector(".search-bar");
  const searchInput = document.getElementById("searchInput");

  // Toggle between login and register forms
  loginLink?.addEventListener("click", () => {
    logregBox?.classList.add("active");
    loginForm?.classList.add("active");
    registerForm?.classList.remove("active");
  });

  registerLink?.addEventListener("click", () => {
    logregBox?.classList.add("active");
    registerForm?.classList.add("active");
    loginForm?.classList.remove("active");
  });

  closeButtons.forEach((button) => {
    button?.addEventListener("click", () => {
      logregBox?.classList.remove("active");
      loginForm?.classList.remove("active");
      registerForm?.classList.remove("active");
    });
  });

  userIcon?.addEventListener("click", () => {
    logregBox?.classList.add("active");
    loginForm?.classList.add("active");
    registerForm?.classList.remove("active");
  });

  // Chatbot toggle functionality
  chatButton?.addEventListener("click", () => {
    chatBox?.classList.toggle("visible"); // Show/hide chatbox
  });

  // Close chatbox functionality
  closeChatButton?.addEventListener("click", () => {
    chatBox?.classList.remove("visible");
  });

  // Sending message functionality
  sendBtn?.addEventListener("click", async () => {
    const message = chatInput?.value.trim();
    if (message) {
      // Display user message
      chatboxMessages.innerHTML += `<p>You: ${message}</p>`;
      chatInput.value = ""; // Clear input field

      // Send message to the API
      await sendMessageToAPI(message);
    }
  });

  // Function to send a message to the chatbot API
  async function sendMessageToAPI(message) {
    try {
      const apiKey = "your-api-key"; // Insert your actual OpenAI API key here

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4-1106-preview", // Specify the appropriate model
            messages: [{ role: "user", content: message }],
          }),
        }
      );

      const data = await response.json();

      // Handle API response
      if (data.choices && data.choices.length > 0) {
        const botMessage = data.choices[0].message.content;
        chatboxMessages.innerHTML += `<p>C-Makky: ${botMessage}</p>`; // Display bot response
      } else {
        chatboxMessages.innerHTML += `<p>C-Makky: I'm sorry, I couldn't process your request.</p>`;
      }
      chatboxMessages.scrollTop = chatboxMessages.scrollHeight; // Scroll to the bottom
    } catch (error) {
      console.error("Error communicating with the chatbot API:", error);
      chatboxMessages.innerHTML += `<p>C-Makky: There was an error processing your request.</p>`;
    }
  }

  // Search functionality
  searchBar?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = searchInput?.value.trim();
    if (!query) {
      alert("Please enter a search query.");
      return;
    }

    try {
      const response = await fetch(
        `/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch search results.");

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
      console.error("Error fetching search results:", error);
      alert("Failed to fetch search results.");
    }
  });

  // Render search results dynamically
  function displaySearchResults(products) {
    const gallery = document.getElementById("item-gallery");
    const productGrid = gallery?.querySelector(".product-grid");

    // Clear existing products
    productGrid.innerHTML = "";

    if (!products || products.length === 0) {
      productGrid.innerHTML = `<p class="no-results">No products found for your query.</p>`;
      gallery.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Populate with new search results
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.innerHTML = `
        <a href="compare_price.html?product=${encodeURIComponent(
          product.name
        )}">
          <img src="${product.image || "/static/icons/default.jpg"}" alt="${
        product.name
      }">
          <h2>${product.name}</h2>
          <p class="price">From ${product.prices[0]?.price || "N/A"}</p>
        </a>
      `;
      productGrid.appendChild(productElement);
    });

    gallery.scrollIntoView({ behavior: "smooth" });
  }

  // Scroll left functionality
  function scrollLeft() {
    const productGrid = document.querySelector(".product-grid");
    productGrid?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  }

  // Scroll right functionality
  function scrollRight() {
    const productGrid = document.querySelector(".product-grid");
    productGrid?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  }
});
