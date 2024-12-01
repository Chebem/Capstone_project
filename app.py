from flask import Flask, request, jsonify, render_template, send_from_directory
import logging
import logging
# Configure basic logging

import json
import os
from dotenv import load_dotenv
# Configure logging
logging.basicConfig(
    level=logging.DEBUG,  # Can be changed to INFO, WARNING, etc.
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()  # Will log to the console
    ]
)
logger = logging.getLogger(__name__)
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

load_dotenv()
app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))



# Load static product data from JSON file
def load_static_products():
    json_path = os.path.join(BASE_DIR, 'static_products.json')
    try:
        print(f'DEBUG: Attempting to load JSON from {json_path}')
        with open(json_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            products = data.get('static_products', [])
            print(f'DEBUG: Loaded {len(products)} products')
            logger.warning(f'DEBUG: Loaded {len(products)} products')
            return products
    except FileNotFoundError:
        logger.warning(f'Error: File static_products.json not found at {json_path}')
        print(f'Error: File static_products.json not found at {json_path}')
        return []
    except json.JSONDecodeError as e:
        logger.warning(f"Error File reading JSON: {e}")
        print(f"Error File reading JSON: {e}")
        return []
    except Exception as e:
        logger.warning(f"Unexpected error loading products: {e}")
        print(f"Unexpected File error loading products: {e}")


        return []


@app.route('/compare', methods=['GET'])
def compare_prices():
    product_name = request.args.get('product','').strip().lower()
    print(f'DEBUG: Searching for product: "{product_name}"')
    
    if not product_name:
        return jsonify({'error':'No product provided'}),400
    
    static_products = load_static_products()
    
    # Debug: Print all product titles
    print('DEBUG: Available products:')
    for product in static_products:
        print(f'- "{product["title"].lower()}"')
        if(product["title"].lower() == product_name):
            print('\033[1mSEEN A MATCH :', "search", product_name, "=", 'result:', product["title"].lower(), '\033[0m')
        else:
             print('Not a match:', "search",product_name,"=",'result:',product["title"].lower())
    static_product = next((p for p in static_products if p['title'].lower() == product_name), None)
    
    if not static_product:
        print(f'DEBUG: No product found for "{product_name}"')
        return jsonify({'error':'Product not found.'}),404
    
    return jsonify({'product':static_product['title'],'image':static_product['image'],'prices':static_product['prices']})

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
   
    valid_files = ["index.html", "21st-street.html", "action.html","compare_price.html", "c-market.html", "copang.html", "men.html","women.html", "appliances.html", "about.html"]
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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5001)))
