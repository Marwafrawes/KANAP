//cart = panier 
//localStorage est une API qui existe dans les navigateurs pour permettre d'enregister des donnés 
// Récupérer les infos envoyées dans le panier (transformé de JSON en objet JS et stocké dans le navigateur)
function getProductsinLocalstorage() {
  let productsList = [];
  console.log(JSON.parse(localStorage.getItem("products")));
  
  if (localStorage.getItem("products") != null) {
      productsList = JSON.parse(localStorage.getItem("products")); 
  }
  return productsList;
}

//--------------------Sélection de la balise de la page product.html dans laquel on va insérer les produits et leurs infos-------------------------
const sectionPositionHtml = document.getElementById("cart__items");
//______déclaration des varaibles liées à la quantité et pau prix______ 
  
    let productsList = getProductsinLocalstorage();    
    let totalQuantity = 0; 
    let totalPrice = 0; 
    let totalProductQty = 0;
    let totalPriceCart = 0; 
    let myProducts = []; 
//----------------------Fonction Calcul de la quantité total d'articles dans le panier, au chargement de la page Panier.html-----------------

// boucle while si la condition est vraie 
let html = "";
let index = 0;
let tableauLength = productsList.length; 
let totalCart = 0;
let totalQty = 0;
while (index < productsList.length) {
  html += makeCartProductHtml(productsList[index],index);
  totalCart += productsList[index].price * productsList[index].qty; // afficher le prix total
  totalQty += parseInt(productsList[index].qty); // afficher la quantité total  
  index++;// incrémenter la variable de 1 
}

// pour afficher les produit on fait un Appel 
document.getElementById("cart__items").innerHTML=html; 
console.log('totalcart',totalCart);

// pour afficher le prix total 
document.getElementById("totalPrice").innerText=totalCart; 

// pour afficher le total article 
document.getElementById("totalQuantity").innerText=totalQty; 
// création d'une foction pour supprimer l'article 
function suppprod(index){

    productsList.splice(index, 1); // La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments à même le tableau
    localStorage.setItem("products", JSON.stringify(productsList));
    window.location.reload() //La méthode Location.reload() recharge la ressource depuis l'URL actuelle.
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
    totalPricenew += parseInt(item.price) * parseInt(item.qty);
  }
 console.log("Nouveau prix total panier",totalPricenew);
  document.getElementById("totalPrice").innerText = totalPricenew;
}
// ajouter un événement pour changer la quatité totale apres modification ( ajout ou suppr) 

let quantity = document.querySelector("input[name='itemQuantity']")
quantity.addEventListener("input", () => {
 //  alert("Valeur changée"); pour vérifier 
  // changement de la valeur dans LocalStorage 
  const quantityIndex = productsList.findIndex((pro) => quantity.closest('.cart__item').getAttribute('data-id') === pro._id);
  if (quantityIndex > -1) {
      productsList[quantityIndex].qty = quantity.value;
      // console.log(productsList[quantityIndex].qty) ; pour vérifier 
  }
localStorage.setItem('products', JSON.stringify(productsList)); 
reTotalqty();// pour éxuter notre fonction reTotalqty
reTotalprice();
})

// contruire le Html d'un prduit 
function makeCartProductHtml (product,index) {

return `<article class="cart__item" data-id=${product._id} data-color=${product.color}>
<div class="cart__item__img">
  <img src="${product.imageUrl}" alt="${product.altText}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">${product.description}
    <h2>${product.name} </h2>
    <p>${product.color}</p>
    <p>${product.price}€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.qty}>
    </div>
    <div class="cart__item__content__settings__delete">
      <a href="#" onclick="suppprod(${index})" class="deleteItem">Supprimer</a> <!-- création bouton pour supprimer -->
    </div>
  </div>
</div>
</article> ` 
}

// console.log(localStorage);

// partie contact nom /prenom./etc 
function ValidateEmail(input) {

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.value.match(validRegex)) {
    return true;

  } else {
    return false;
  }

}
const order = document.getElementById('order');
order.addEventListener("click", () => {
  if (ValidateEmail(document.getElementById("email")) === false)
    document.getElementById("emailErrorMsg").innerText = "email invalide";
else 
document.getElementById("emailErrorMsg").innerText = "";
});




