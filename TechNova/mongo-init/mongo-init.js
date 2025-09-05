db = db.getSiblingDB('technova');
db.products.drop();
db.products.insertMany(require('/products.json'));
