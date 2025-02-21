from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# SQLite Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Product Model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  
    title = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(255), nullable=False)

    # Relationship with Cart
    cart_items = db.relationship('Cart', backref='product', cascade="all, delete-orphan")

# Cart Model
class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id', ondelete='CASCADE'), nullable=False)

# Initialize DB
with app.app_context():
    db.create_all()

# Default Route
@app.route('/')
def home():
    return jsonify({'message': 'E-Commerce API is running!'})

# Get all products
@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([
        {'id': p.id, 'title': p.title, 'price': p.price, 'image': p.image} 
        for p in products
    ])

# Add a new product
@app.route('/products', methods=['POST'])
def add_product():
    data = request.json
    if not data.get('title') or not data.get('price') or not data.get('image'):
        return jsonify({'error': 'Missing fields'}), 400

    try:
        new_product = Product(title=data['title'], price=data['price'], image=data['image'])
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product added successfully', 'id': new_product.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Delete a product by ID
@app.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    try:
        db.session.delete(product)
        db.session.commit()
        print(f"Deleted product: {id}")  # Debugging
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting product {id}: {e}")  # Debugging
        return jsonify({'error': str(e)}), 500


# Get all cart items with product details
@app.route('/cart', methods=['GET'])
def get_cart():
    cart_items = Cart.query.all()
    cart_products = [
        {
            'cart_id': c.id,
            'product_id': c.product_id,
            'title': c.product.title,
            'price': c.product.price,
            'image': c.product.image
        }
        for c in cart_items
    ]
    return jsonify(cart_products)

# Add product to cart
@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.json
    if not data.get('product_id'):
        return jsonify({'error': 'Product ID required'}), 400

    # Ensure the product exists before adding to cart
    product = Product.query.get(data['product_id'])
    if not product:
        return jsonify({'error': 'Invalid Product ID'}), 404

    try:
        new_cart_item = Cart(product_id=data['product_id'])
        db.session.add(new_cart_item)
        db.session.commit()
        return jsonify({'message': 'Added to cart', 'cart_id': new_cart_item.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Remove item from cart
@app.route('/cart/<int:id>', methods=['DELETE'])
def remove_from_cart(id):
    cart_item = Cart.query.get(id)
    if not cart_item:
        return jsonify({'error': 'Item not found'}), 404
    
    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({'message': 'Removed from cart'}), 200

@app.route('/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '').strip().lower()  # Get search query
    if not query:
        return jsonify([])  # Return empty list if no query provided

    print(f"Searching for: {query}")  # Debugging: Check search term

    # Perform case-insensitive search on the title field
    products = Product.query.filter(Product.title.ilike(f"%{query}%")).all()

    print(f"Products found: {products}")  # Debugging: Print matched products

    return jsonify([
        {'id': p.id, 'title': p.title, 'price': p.price, 'image': p.image}
        for p in products
    ])


if __name__ == '__main__':
    app.run(debug=True)
