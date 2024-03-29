//cart = panier 
//localStorage est une API qui existe dans les navigateurs pour permettre d'enregister des donnés 
// Récupérer les infos envoyées dans le panier (transformé de JSON en objet JS et stocké dans le navigateur)
const productListData = [];
function  getProducts() {
  let productsList = [];
  console.log(JSON.parse(localStorage.getItem("products")));
  
  if (localStorage.getItem("products") != null) {
      productsList = JSON.parse(localStorage.getItem("products"));
      productsList.forEach((product) =>   {
     fetch('http://localhost:3000/api/products/'+ product._id)
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            // Examine the text in the response
            response.json().then(function(data) {
                console.log(totalCart);
                productListData.push(data);
                // afficher le prix total
                totalCart += parseFloat(data.price) * parseInt(product.qty); 
                // afficher la quantité total  
                totalQty += parseInt(product.qty); 
                const div = document.createElement('div');
                div.innerHTML = makeCartProductHtml(data,index,product);
                index++;// incrémenter la variable de 1   
                document.getElementById("cart__items").append(div);   
                document.getElementById("totalPrice").innerText=totalCart;
                document.getElementById("totalQuantity").innerText = totalQty;
                console.log(product);
                listenerInput(product);    
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
        
      });
  }
  return productsList;
}
//______déclaration des varaibles liées à la quantité et pau prix______ 
let index = 0;
let totalPrice = 0; 
let totalCart = 0;
let totalQty = 0;
let productsList = getProducts();    
//console.log(productsList);
//console.log('totalcart',totalCart);
//console.log(productsList);
// création d'une foction pour supprimer l'article 
function suppprod(index){
  console.log("index:" + index + " productsList[index]: " + productsList[index]);
  // La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments à même le tableau
    productsList.splice(index, 1); 
    localStorage.setItem("products", JSON.stringify(productsList));
    //La méthode Location.reload() recharge la ressource depuis l'URL actuelle.
    window.location.reload();  
    window.scrollTo(0,0);
    //Alerte concernant un article supprimé
alert("Ce produit va être supprimé du panier.");
}
// fonction pour recalculer la quantité totale d'articles 
function reTotalqty (){
  let totalQtynew = 0; 
  for ( const item of productsList) {
    totalQtynew += parseInt(item.qty)
  }
  console.log("Nouvelle quantité totale panier",totalQtynew);
  document.getElementById("totalQuantity").innerText = totalQtynew;
}
 // function recalcul price 
 function reTotalprice (){
  let totalPricenew = 0; 
  for ( const item of productsList) {
    const dataIndex = productListData.findIndex((pro) => item._id === pro._id);
    totalPricenew += parseFloat(productListData[dataIndex].price) * parseInt(item.qty);
  }
 console.log("Nouveau prix total panier",totalPricenew);
  document.getElementById("totalPrice").innerText = totalPricenew;
}
// ajouter un événement pour changer la quatité totale apres modification ( ajout ou suppr) 
function listenerInput (product){
  // récuper les éléments d'une manière individuelle
  let quantity = document.getElementById(product._id + '-' + product.color)  
  quantity.addEventListener("input", () => {
    console.log(product._id + '-' + product.color + " val= " + quantity.value);
   //  alert("Valeur changée"); pour vérifier 
    // changement de la valeur dans LocalStorage 
    if (quantity.value <= 0  || !quantity.value) {
      alert("Veuillez incrémenter la quantité du produit");
      quantity.value = product.qty;
  } else if (quantity.value >= 100) {
      alert("Veuillez décrementer la quantité du produit");
      quantity.value = product.qty;
  } else{
    const quantityIndex = productsList.findIndex((pro) => quantity.closest('.cart__item').getAttribute('data-id') === pro._id);
    if (quantityIndex > -1) {
        productsList[quantityIndex].qty = quantity.value;
        // console.log(productsList[quantityIndex].qty) ; pour vérifier 
    }
  localStorage.setItem('products', JSON.stringify(productsList)); 
   // pour éxuter notre fonction reTotalqty
  reTotalqty();
  reTotalprice();
  const dataIndex = productListData.findIndex((pro) => product._id === pro._id);
  document.getElementById("itemTotalPrice-"+product._id).innerText = parseFloat(productListData[dataIndex].price) * parseInt(quantity.value);
  }
  })
}
// contruire le DOM Html d'un prduit 
function makeCartProductHtml (data,index,product) {

return `<article class="cart__item" data-id=${data._id} data-color=${product.color}>
<div class="cart__item__img">
  <img src="${data.imageUrl}" alt="${data.altText}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">${data.description}
    <h2>${data.name} </h2>
    <p>${product.color}</p>
    <p id="itemTotalPrice-${data._id}">${data.price * product.qty}€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input id=${data._id}-${product.color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.qty}>
    </div>
    <div class="cart__item__content__settings__delete">
      <a href="#" onclick="suppprod(${index})" class="deleteItem">Supprimer</a> <!-- création bouton pour supprimer -->
    </div>
  </div>
</div>
</article> ` 
}

// firstName

function validateEntry(input) {

  const regName = /^[a-zA-Z ]+[a-zA-Z àâäéèêëïîôöùûüç]+$/;
//match est une fonction pour bien vérifier les caratères. 
  if (input.value.match(regName)) {
    return true;

  } else {
    return false;
  }
}
// contact email 
function ValidateEmail(input) {

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.value.match(validRegex)) {
    return true;

  } else {
    return false;
  }

}
const order = document.getElementById('order');
order.addEventListener("click", (e) => {
  let validContact = true;

//fisrtName
if (validateEntry(document.getElementById("firstName")) === false) {
  validContact = false

document.getElementById("firstNameErrorMsg").innerText = "le prénom n'est pas valide";
}else {
document.getElementById("firstNameErrorMsg").innerText = "";
}
//lastName 
if (validateEntry(document.getElementById("lastName")) === false) {
  validContact = false
document.getElementById("lastNameErrorMsg").innerText = "le nom n'est pas valide";
}else {
  document.getElementById("lastNameErrorMsg").innerText = "";
}

//Adresse 
if (validateEntry(document.getElementById("address")) === false) {
  validContact = false
document.getElementById("addressErrorMsg").innerText = "l'adresse n'est pas valide";
}else {
  document.getElementById("addressErrorMsg").innerText = "";
}

//Ville /city
if (validateEntry(document.getElementById("city")) === false){
  validContact = false
document.getElementById("cityErrorMsg").innerText = "la ville n'est pas valide";
}else {
  document.getElementById("cityErrorMsg").innerText = "";
}

//email
if (ValidateEmail(document.getElementById("email")) === false) {
  validContact = false;
  document.getElementById("emailErrorMsg").innerText = "email invalide";
} else {
  document.getElementById("emailErrorMsg").innerText = "";
}

if (validContact === true) {
//  Constituer un objet contact (à partir des données du formulaire) et un tableau de produits.
  const contact = {
    firstName: document.getElementById("firstName").value, //.value pour stocker la valeur
    lastName:document.getElementById("lastName").value,
    address:document.getElementById("address").value,
    city:document.getElementById("city").value,
    email:document.getElementById("email").value,
  }
  //console.log(contact);
  const products = productsList.map(product => product._id);
  console.log(products);
  fetch('http://localhost:3000/api/products/order',  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      contact: contact,
      products: products
    })
  })
  .then(

      function(response) {
          if (response.status !== 201) {
              console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
              return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
            window.location.href = "./confirmation.html?order=" + data.orderId;// passer à la page confirmation.html
              console.log('confirmation: ', data);
              });
          
      }
  )
  .catch(function(err) {
      console.log('Fetch Error :-S', err);
  });
} else {
  validContact = true;
}
// pour ne pas refraichir la page 

e.preventDefault();
});
//////fin 