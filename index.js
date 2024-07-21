// Function to show the selected section and hide others
function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Initialize by showing the home section
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    displayProducts();
});

// Tree for product catalog management
class TreeNode {
    constructor(product) {
        this.product = product;
        this.left = null;
        this.right = null;
    }
}

class ProductCatalog {
    constructor() {
        this.root = null;
    }

    insert(product) {
        const newNode = new TreeNode(product);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.product.id < node.product.id) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    search(id) {
        return this.searchNode(this.root, id);
    }

    searchNode(node, id) {
        if (node === null) {
            return null;
        }
        if (id < node.product.id) {
            return this.searchNode(node.left, id);
        } else if (id > node.product.id) {
            return this.searchNode(node.right, id);
        } else {
            return node.product;
        }
    }

    getProducts() {
        const products = [];
        this.inOrderTraversal(this.root, products);
        return products;
    }

    inOrderTraversal(node, products) {
        if (node !== null) {
            this.inOrderTraversal(node.left, products);
            products.push(node.product);
            this.inOrderTraversal(node.right, products);
        }
    }
}

// List/Array for shopping cart items
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        this.items.push(product);
        console.log(`${product.name} has been added to your cart.`);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        console.log(`Item with id ${productId} has been removed from your cart.`);
    }

    viewCart() {
        return this.items;
    }
}

// Queue for order processing
class Queue {
    constructor() {
        this.orders = [];
    }

    enqueue(order) {
        this.orders.push(order);
        console.log(`Order for ${order.product.name} has been placed.`);
    }

    dequeue() {
        const processedOrder = this.orders.shift();
        console.log(`Order for ${processedOrder.product.name} has been processed.`);
        return processedOrder;
    }

    viewQueue() {
        return this.orders;
    }
}

// HashMap for user sessions and authentication
class HashMap {
    constructor() {
        this.map = {};
    }

    set(key, value) {
        this.map[key] = value;
    }

    get(key) {
        return this.map[key];
    }

    remove(key) {
        delete this.map[key];
    }

    has(key) {
        return this.map.hasOwnProperty(key);
    }
}

// Example usage
const catalog = new ProductCatalog();
catalog.insert({ id: 1, name: 'Bag', price: 10.00, image: 'download (1).jpeg' });
catalog.insert({ id: 2, name: 'Suits', price: 20.00, image: 'download (1).webp' });
catalog.insert({ id: 3, name: 'Heels', price: 30.00, image: 'download (2).jpeg' });
catalog.insert({ id: 4, name: 'Jacket', price: 40.00, image: 'download (4).jpeg' });
catalog.insert({ id: 5, name: 'Shoes', price: 50.00, image: 'download.jpeg' });
catalog.insert({ id: 6, name: 'Hat', price: 15.00, image: 'download (5).jpeg' });
catalog.insert({ id: 7, name: 'Socks', price: 5.00, image: 'download (6).jpeg' });

const cart = new ShoppingCart();
const product1 = catalog.search(1);
if (product1) {
    cart.addItem(product1);
}

const orders = new Queue();
orders.enqueue({ orderId: 1, product: product1 });

const userSessions = new HashMap();
userSessions.set('user1', { sessionId: 'abc123', isLoggedIn: true });
console.log(userSessions.get('user1'));

// Functions for interacting with the DOM
function addToCart(productId) {
    const product = catalog.search(productId);
    if (product) {
        cart.addItem(product);
        alert(`${product.name} has been added to your cart.`);
    }
}

function placeOrder(productId) {
    const product = catalog.search(productId);
    if (product) {
        orders.enqueue({ orderId: new Date().getTime(), product });
        alert(`Order for ${product.name} has been placed.`);
    }
}

function searchProducts() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const products = document.getElementsByClassName('product');

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const h3 = product.getElementsByTagName('h3')[0];
        const txtValue = h3.textContent || h3.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    }
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    const products = catalog.getProducts();

    productList.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="placeOrder(${product.id})">Place Order</button>
        `;
        
        productList.appendChild(productDiv);
    });
}
