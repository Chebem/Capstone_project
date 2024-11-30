from flask import Flask, request, jsonify, render_template, send_from_directory
import logging

# Configure basic logging

import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)


# Load static product data from JSON file
def load_static_products():
    try:
        with open("static_products.json", "r", encoding="utf-8") as file:
            return json.load(file).get("static_products", [])
    except FileNotFoundError:
        print("Error: static_products.json not found.")
        return []
    except json.JSONDecodeError as e:
        print(f"Error reading JSON: {e}")
        return []
    
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

    # Return static product data
    return jsonify({
        "product": static_product["title"],
        "image": static_product["image"],
        "prices": static_product["prices"]
    })

# Search for products
@app.route('/search', methods=['GET'])
def search_products():
    query = request.args.get('query', '').strip().lower()
    if not query:
        return jsonify({"error": "No search query provided"}), 400

    static_products = load_static_products()
    matched_products = [product for product in static_products if query in product["title"].lower()]

    if matched_products:
        return jsonify({"products": matched_products})

    return jsonify({"message": "No products found"}), 404

# Render the homepage
@app.route('/')
def home():
    return render_template('index.html')

# Route to serve HTML files from the templates folder
@app.route('/<filename>')
def serve_html(filename):
    valid_files = [
        "index.html", "21st-street.html", "action.html",
        "compare_price.html", "c-market.html", "copang.html", "men.html",
        "women.html", "appliances.html", "about.html"
    ]
    if filename in valid_files:
        return render_template(filename)  # Automatically serves from 'templates/'
    return {"error": "File not found"}, 404

# Route to serve static files (CSS, JS, images)
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

# Render other HTML pages
@app.route('/<page>')
def render_page(page):
    try:
        return render_template(f"{page}.html")
    except:
        return jsonify({"error": "Page not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5001)
