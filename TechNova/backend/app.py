from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import numpy as np
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# Σύνδεση με MongoDB
app.config["MONGO_URI"] = "mongodb://mongo:27017/technova"
mongo = PyMongo(app)
products = mongo.db.products

# --- /search: GET ---
@app.route('/search', methods=['GET'])
def search_products():
    name = request.args.get('name', '').strip()

    if name == '':
        # Αν δεν δόθηκε όνομα, επιστρέφει όλα τα προϊόντα
        results = list(products.find())
    else:
        # Αν υπάρχει ακριβής αντιστοίχιση, επιστρέφει μόνο αυτό
        exact = list(products.find({ "name": name }))
        if exact:
            results = exact
        else:
            # Διαφορετικά, κάνει αναζήτηση με regex (περιέχει, case-insensitive)
            results = list(products.find({
                "name": { "$regex": name, "$options": "i" }
            }))

    # Μετατροπή ObjectId και ταξινόμηση κατά τιμή (αν υπάρχει)
    for r in results:
        r['_id'] = str(r['_id'])
    results.sort(key=lambda x: x.get('price', 0), reverse=True)

    return jsonify(results)

# --- /like: POST ---
@app.route('/like', methods=['POST'])
def like_product():
    data = request.get_json()
    product_id = data.get('id')

    if not product_id:
        return jsonify({ "error": "Missing product ID" }), 400

    result = products.update_one(
        { "_id": ObjectId(product_id) },
        { "$inc": { "likes": 1 } }
    )

    if result.modified_count == 1:
        return jsonify({ "success": True })
    else:
        return jsonify({ "error": "Product not found" }), 404

# --- /popular-products: GET ---
@app.route('/popular-products', methods=['GET'])
def popular_products():
    top_products = list(products.find().sort("likes", -1).limit(5))
    for p in top_products:
        p['_id'] = str(p['_id'])
    return jsonify(top_products)

# --- Εκκίνηση API ---
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
