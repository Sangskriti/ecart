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
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Ensure auto-increment
    title = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(255), nullable=False)

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
    return jsonify([{'id': p.id, 'title': p.title, 'price': p.price, 'image': p.image} for p in products])

# Add a new product
@app.route('/products', methods=['POST'])
def add_product():
    data = request.json
    if not data.get('title') or not data.get('price') or not data.get('image'):
        return jsonify({'error': 'Missing fields'}), 400

    try:
        new_product = Product(name=data['name'], price=data['price'], image=data['image'])
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
    
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'}), 200

# Get all cart items
@app.route('/cart', methods=['GET'])
def get_cart():
    cart_items = Cart.query.all()
    cart_products = [{'id': c.id, 'product_id': c.product_id} for c in cart_items]
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

if __name__ == '__main__':
    app.run(debug=True)
