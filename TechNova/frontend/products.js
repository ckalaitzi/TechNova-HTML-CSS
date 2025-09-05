const apiBase =  "http://localhost:5000"

// ---------------- Αλληλεπίδραση 1: Αναζήτηση ----------------
async function searchProducts() {
  const query = document.getElementById("searchInput").value.trim();

  // Αν είναι κενό, επιστρέφουμε όλα
  if (query === "" || query.length >= 3) {
    try {
      const response = await fetch(`${apiBase}/search?name=${encodeURIComponent(query)}`);
      const products = await response.json();
      displayProducts(products);
    } catch (err) {
      console.error("Σφάλμα κατά την αναζήτηση προϊόντων:", err);
    }
  }
}

function displayProducts(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  if (!products || products.length === 0) {
    productList.innerHTML = "<p>Δεν βρέθηκαν προϊόντα.</p>";
    return;
  }

  products.forEach(product => {
    const container = document.createElement("div");
    container.className = "product";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.onclick = () => likeProduct(product._id);

    const name = document.createElement("h3");
    name.textContent = product.name;

    const desc = document.createElement("p");
    desc.textContent = product.description;

    const price = document.createElement("p");
    if (typeof product.price === "number") {
      price.textContent = `Τιμή: €${product.price.toFixed(2)}`;
    } else if (!isNaN(parseFloat(product.price))) {
      price.textContent = `Τιμή: €${parseFloat(product.price).toFixed(2)}`;
    } else {
      price.textContent = "Τιμή: N/A";
    }

    container.appendChild(image);
    container.appendChild(name);
    container.appendChild(desc);
    container.appendChild(price);

    productList.appendChild(container);
  });
}

// ---------------- Αλληλεπίδραση 2: Like ----------------
async function likeProduct(id) {
  try {
    const response = await fetch(`${apiBase}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    });

    if (response.ok) {
      alert("Το like καταχωρήθηκε!");
    } else {
      alert("Σφάλμα κατά την αποστολή του like.");
    }
  } catch (err) {
    console.error("Error sending like:", err);
  }
}

// ---------------- Αλληλεπίδραση 3: Slideshow ----------------
async function loadPopularProducts() {
  const container = document.getElementById("slideshow");
  if (!container) return;

  try {
    const response = await fetch(`${apiBase}/popular-products`);
    const products = await response.json();
    container.innerHTML = "";

    products.forEach(product => {
      const slide = document.createElement("div");
      slide.className = "slide";

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;

      const label = document.createElement("p");
      label.textContent = product.name;

      slide.appendChild(img);
      slide.appendChild(label);
      container.appendChild(slide);
    });
  } catch (err) {
    console.error("Error loading popular products:", err);
  }
}

// ---------------- Εκκίνηση σελίδας ----------------
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("slideshow")) {
    loadPopularProducts();
  }

  if (document.getElementById("searchInput")) {
    document.getElementById("searchInput").addEventListener("input", searchProducts);
  }

  // Φόρτωσε όλα τα προϊόντα με κενή αναζήτηση στην αρχή
  searchProducts();
});
