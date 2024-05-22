const products = [
    {
        id: 0,
        image: 'img/img.jpeg',
        title: 'Title0',
        price: 1,
    },
    {
        id: 1,
        image: 'img/img.jpeg',
        title: 'Title1',
        price: 10,
    },
    {
        id: 2,
        image: 'img/img.jpeg',
        title: 'Title2',
        price: 20,
    },
    {
        id: 3,
        image: 'img/img.jpeg',
        title: 'Title3',
        price: 30,
    },
    {
        id: 4,
        image: 'img/img.jpeg',
        title: 'Title4',
        price: 40,
    },
    {
        id: 5,
        image: 'img/img.jpeg',
        title: 'Title5',
        price: 50,
    },
    {
        id: 6,
        image: 'img/img.jpeg',
        title: 'Title6',
        price: 60,
    },
    {
        id: 7,
        image: 'img/img.jpeg',
        title: 'Title7',
        price: 70,
    },
    {
        id: 8,
        image: 'img/img.jpeg',
        title: 'Title8',
        price: 80,
    },
    {
        id: 9,
        image: 'img/img.jpeg',
        title: 'Title9',
        price: 90,
    },
    {
        id: 10,
        image: 'img/img.jpeg',
        title: 'Title10',
        price: 100,
    },
    {
        id: 11,
        image: 'img/img.jpeg',
        title: 'Title11',
        price: 110,
    },
    {
        id: 12,
        image: 'img/img.jpeg',
        title: 'Title12',
        price: 120,
    },
    {
        id: 13,
        image: 'img/img.jpeg',
        title: 'Title13',
        price: 130,
    },
    {
        id: 14,
        image: 'img/img.jpeg',
        title: 'Title14',
        price: 140,
    },
    {
        id: 15,
        image: 'img/img.jpeg',
        title: 'Title15',
        price: 150,
    },
    {
        id: 16,
        image: 'img/img.jpeg',
        title: 'Title16',
        price: 160,
    },
    {
        id: 17,
        image: 'img/img.jpeg',
        title: 'Title17',
        price: 170,
    },
    {
        id: 18,
        image: 'img/img.jpeg',
        title: 'Title18',
        price: 180,
    },
    {
        id: 19,
        image: 'img/img.jpeg',
        title: 'Title19',
        price: 190,
    },
    {
        id: 20,
        image: 'img/img.jpeg',
        title: 'Title20',
        price: 200,
    },
    {
        id: 21,
        image: 'img/img.jpeg',
        title: 'Title21',
        price: 210,
    },
    {
        id: 22,
        image: 'img/img.jpeg',
        title: 'Title22',
        price: 220,
    },
    {
        id: 23,
        image: 'img/img.jpeg',
        title: 'Title23',
        price: 230,
    },
    {
        id: 24,
        image: 'img/img.jpeg',
        title: 'Title24',
        price: 240,
    },
    {
        id: 25,
        image: 'img/img.jpeg',
        title: 'Title25',
        price: 250,
    },
];

let i = 0;
document.getElementById('root').innerHTML = products.map((item) => {
    var { image, title, price } = item;
    return (

        `<div class='box'>
            <div class='img-box'>
            ${image ? `<img class='images' src=${image}>` : '<p>No image</p>'}
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <h2>₹ ${price}.00</h2>
                <button onclick='addtocart(${i++})'>Add to cart</button>
            </div>
        </div>`
    );
}).join('');

var cart = [];

function addtocart(a) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find((item) => item.id === products[a].id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...products[a], quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();
}

function displaycart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
    } else {
        document.getElementById('cartItem').innerHTML = cart.map((item, index) => {
            total += item.price * item.quantity;
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        ${item.image ? `<img class='rowimg' src=${item.image}>` : '<p>No image</p>'}
                    </div>
                    <div class='right-item'>
                        <p style='font-size:12px;'>${item.title}</p>
                        <h2 style="font-size: 15px;">₹${item.price}.00 x
                            <span class='quantity'>${item.quantity}</span>
                            <button class='decrement' onclick='decrementQuantity(${index})'>-</button>
                            <button class='increment' onclick='incrementQuantity(${index})'>+</button>
                        </h2>
                    </div>
                    <i class="fa-solid fa-trash" onclick="delElement('${index}')"></i>
                </div>`
            );
        }).join('');
    }

    document.getElementById("count").innerHTML = cart.length;
    document.getElementById("total").innerHTML = "₹ " + total.toFixed(2) + ".00";
}

window.onload = function () {
    displaycart();
}

function decrementQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        displaycart();
    } else {
        delElement(index);
    }
}

function incrementQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();
}


function delElement(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();
}

{/* <button onclick="decrementQuantity('${cart.indexOf(item)}')">-</button> */ }
{/* <button onclick="incrementQuantity('${cart.indexOf(item)}')">+</button> */ }

function searchItems() {
    let input = document.getElementById('searchBox').value;
    let items = document.getElementsByClassName('box');

    for (let i = 0; i < items.length; i++) {
        let title = items[i].getElementsByClassName('bottom')[0].children[0].innerText;
        if (title.toLowerCase().includes(input.toLowerCase())) {
            items[i].style.display = "block";
        } else {
            items[i].style.display = "none";
        }
    }
}