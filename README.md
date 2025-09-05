📘 Technova E-Shop
🛍️ Overview

Το Technova E-Shop είναι ένα demo ηλεκτρονικό κατάστημα υλοποιημένο με Dockerized αρχιτεκτονική τριών επιπέδων:

Frontend (Nginx) → δημιουργεί στατικές σελίδες (HTML/CSS/JS).

Backend (Flask API) → παρέχει endpoints για τα προϊόντα.

Database (MongoDB) → αποθηκεύει τα δεδομένα προϊόντων.

Η εφαρμογή δείχνει πώς μπορεί να στηθεί ένα μικρό e-shop demo με microservice αρχιτεκτονική και containerized περιβάλλον.

✨ Features

🌍 Αρχική σελίδα (homepage.html) που φορτώνεται αυτόματα από το Nginx.

📦 Σελίδα προϊόντων (products.html) που αντλεί δεδομένα από API.

🔌 REST API σε Flask που επιστρέφει προϊόντα από MongoDB.

⚡ Αυτόματη εισαγωγή δεδομένων μέσω mongo-init.js.

🐳 Ένα command για να ανεβεί όλο το περιβάλλον (docker-compose up).


Frontend → http://localhost:8080

Backend API → http://localhost:5000/products

MongoDB → localhost:27017, DB: technova, collection: products



🚀 Setup & Run
1️⃣ Requirements

* Docker

* Docker Compose

2️⃣ Start the project

Από τον φάκελο SITE/:

docker-compose up --build

3️⃣ Access the services

🌍 Frontend → http://localhost:8080

🔌 Backend API → http://localhost:5000/products

🗃️ MongoDB (CLI):

docker exec -it mongo mongosh technova

🗃️ Products Data

Τα προϊόντα βρίσκονται στο αρχείο mongo-init/products.json.

Το script mongo-init/mongo-init.js τα εισάγει αυτόματα στη συλλογή technova.products.

Έλεγχος δεδομένων:

docker exec -it mongo mongosh technova --eval "db.products.find().pretty()"

🖼️ Frontend

homepage.html → Αρχική σελίδα (δίνεται ως default).

products.html → Εμφανίζει τα προϊόντα.

products.js → Κάνει fetch τα δεδομένα από το Flask API.

style.css → Οπτική εμφάνιση.

nginx.conf → Custom config που καθορίζει το homepage.html ως default.

🖥️ Backend (Flask API)

Το backend βρίσκεται στο backend/app.py και παρέχει endpoint:

GET /products → επιστρέφει JSON με όλα τα προϊόντα.

Παράδειγμα:

curl http://localhost:5000/products

🔧 Troubleshooting

❌ Δεν εμφανίζονται προϊόντα

Έλεγξε αν έγιναν import:

docker exec -it mongo mongosh technova --eval "db.products.find()"


❌ Βλέπω default Nginx page

Βεβαιώσου ότι το nginx.conf αντιγράφηκε σωστά στο container.

❌ Backend error

Δες τα logs:

docker logs <backend_container>

📌 Conclusion

Το Technova E-Shop είναι ένα πλήρες dockerized e-shop demo με:

Frontend σε Nginx

Backend API σε Flask

MongoDB με auto-import προϊόντων

