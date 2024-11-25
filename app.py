from flask import Flask, request, jsonify # type: ignore
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env file (optional, for OpenAI)
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Load the static product data from the JSON file
def load_static_products():
    try:
        with open("static_products.json", "r", encoding="utf-8") as file:
            return json.load(file)["static_products"]
    except FileNotFoundError:
        print("Error: static_products.json not found.")
        return []
    except json.JSONDecodeError as e:
        print(f"Error reading JSON: {e}")
        return []

# Compare prices for a specific product (Static only)
@app.route('/compare', methods=['GET'])
def compare_prices():
    product_name = request.args.get('product', '').strip().lower()

    # Check if product_name is provided, if not return error
    if not product_name:
        return jsonify({"error": "No product provided"}), 400

    # Fetch static product data
    static_products = load_static_products()
    static_product = next((p for p in static_products if p["title"].lower() == product_name), None)

    if not static_product:
        return jsonify({"error": "Product not found."}), 404

    # Return static product data (no dynamic scraping)
    return jsonify({
        "product": static_product["title"],
        "image": static_product["image"],
        "prices": static_product["prices"]
    })

# Search for products (Static only)
@app.route('/search', methods=['GET'])
def search_products():
    query = request.args.get('query', '').strip().lower()
    if not query:
        return jsonify({"error": "No search query provided"}), 400

    # Load static products and match query with product titles
    static_products = load_static_products()
    matched_products = [product for product in static_products if query in product["title"].lower()]

    if matched_products:
        return jsonify({"products": matched_products})

    return jsonify({"message": "No products found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5001)
