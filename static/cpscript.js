async function fetchProductData() {
  const params = new URLSearchParams(window.location.search); // Parse URL parameters
  const productName = params.get("product"); // Get the 'product' parameter from the URL

  if (!productName) {
    document.getElementById("productTitle").textContent =
      "No product selected.";
    return;
  }

  try {
    // Fetch product data from the Flask backend
    const response = await fetch(
      `/compare?product=${encodeURIComponent(productName)}`
    );
    if (!response.ok) throw new Error("Failed to fetch product data.");

    // Parse the JSON response from the server
    const data = await response.json();
    if (data.error) {
      document.getElementById("productTitle").textContent = data.error;
      return;
    }

    // Update product details in the DOM
    document.getElementById("productImage").src =
      data.image || "/static/icons/default.jpg"; // Product Image
    document.getElementById("productTitle").textContent = data.product; // Product Title

    const priceList = document.getElementById("priceList");
    priceList.innerHTML = ""; // Clear existing items

    // Populate the price list dynamically
    data.prices.forEach((price) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <span>${price.website}</span>
                <span>${price.price}</span>
                <a href="${price.link}" target="_blank">Buy Now</a>
            `;
      priceList.appendChild(li);
    });
  } catch (error) {
    document.getElementById("productTitle").textContent =
      "Product not found, please check the product name or select another one";
  }
}

// Run the function when the page has loaded
if (window.location.pathname.endsWith("compare_price.html")) {
  document.addEventListener("DOMContentLoaded", fetchProductData);
}
