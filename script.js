let total = 0;
let billList = document.getElementById("billList");
let totalDisplay = document.getElementById("total");

function addItem(name, price, qtyId) {
    let qty = document.getElementById(qtyId).value;
    let amount = price * qty;

    let li = document.createElement("li");
    li.textContent = `${name} x ${qty} = Rs ${amount}`;
    billList.appendChild(li);

    total += amount;
    totalDisplay.textContent = total;
}

function clearBill() {  billList.innerHTML = "";
    total = 0;
    totalDisplay.textContent = total;
}

let cart = {};

function addItem(name, price) {
    if (cart[name]) {
        cart[name].qty++;
    } else {
        cart[name] = { price, qty: 1 };
    }
    renderCart();
}

function removeItem(name) {
    delete cart[name];
    renderCart();
}

function renderCart() {
    let tbody = document.getElementById("cartItems");
    tbody.innerHTML = "";
    let subtotal = 0;

    for (let item in cart) {
        let amount = cart[item].price * cart[item].qty;
        subtotal += amount;

        tbody.innerHTML += `
            <tr>
                <td>${item}</td>
                <td>${cart[item].qty}</td>
                <td>₹${amount}</td>
                <td><button class="remove" onclick="removeItem('${item}')">X</button></td>
            </tr>
        `;
    }

    let gst = subtotal * 0.05;
    let total = subtotal + gst;

    document.getElementById("subTotal").innerText = subtotal;
    document.getElementById("gst").innerText = gst.toFixed(2);
    document.getElementById("grandTotal").innerText = total.toFixed(2);
}

const items = [
  {name:"Burger",price:120},
  {name:"Pizza",price:300},
  {name:"Biryani",price:250},
  {name:"Pasta",price:180},
  {name:"Coffee",price:90},
  {name:"Cold Drink",price:60}
];

let cartItems = JSON.parse(localStorage.getItem("cart")) || {};

const menu = document.getElementById("menu");
const cartTable = document.getElementById("cart");

items.forEach(i=>{
  menu.innerHTML+=`
    <div class="item">
      <h4>${i.name}</h4>
      <p>₹${i.price}</p>
      <button onclick="add('${i.name}',${i.price})">Add</button>
    </div>`;
});

function add(name,price){
  cart[name]?cart[name].qty++:cart[name]={price,qty:1};
  save();
}

function remove(name){
  delete cart[name];
  save();
}

function save(){
  localStorage.setItem("cart",JSON.stringify(cart));
  render();
}

function render(){
  cartTable.innerHTML="";
  let sub=0;

  for(let i in cart){
    let amt=cart[i].price*cart[i].qty;
    sub+=amt;
    cartTable.innerHTML+=`
      <tr>
        <td>${i}</td>
        <td>${cart[i].qty}</td>
        <td>₹${amt}</td>
        <td><button onclick="remove('${i}')">❌</button></td>
      </tr>`;
  }

  let gst=sub*0.05;
  let disc=document.getElementById("discount").value;
  let total=sub+gst-(sub*disc/100);

  document.getElementById("sub").innerText=sub;
  document.getElementById("gst").innerText=gst.toFixed(2);
  document.getElementById("total").innerText=total.toFixed(2);
}

function printBill(){ window.print(); }

document.getElementById("orderId").innerText =
  Math.floor(Math.random()*90000)+10000;

setInterval(()=>{
  document.getElementById("datetime").innerText =
    new Date().toLocaleString();
},1000);

render();
