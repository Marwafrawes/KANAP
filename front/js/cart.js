//cart = panier 
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
function totalProductsQuantity(){
  totalQuantity += parseInt(totalProductsQty);
  console.log("Total quantité panier",totalQuantity);
  document.getElementById("totalQuantity").innerText = totalQuantity;
}
//-------Fonction calculer le prix total par produit 
function totalProductsPrice (){
  totalPriceCart = totalProductQty * totalPriceCart;  // calcul pour le prix total de chaque roduit 
  totalPrice += totalPriceCart
  console.log("le prix total du panier",totalPrice);
  document.getElementById("totalPrice").innerText = totalPrice; 
  
}

// une focntion pour afficher les totau liée aux quatités et aux prix 
function totaxPriceQty(){
  totalProductsQuantity();
  totalProductsPrice();
}
// function recalcul total quantité 
function reTotalQuantity(){ 
  let newTotalqty = 0; 
  for (const item of productsList) {
    newTotalqty += parseInt (item.qty);
  }
  console.log("nouvelle quantité total",newTotalqty);
document.getElementById("totalQuantity") = newTotalqty; 
}
// function recalcul price 
function reTotalPrice (){
  let newTotalPrice = 0; 
  for (const item of productsList){ 
    const ProductLocalStorage = item.idProduct;
    const productqtylocalStorage = item.quantityProduct; 
    const findProducts = produitsTotaux.find((element) => element._id === idLocalStorage);
  }
}
// 


// boucle while si la condition est vraie 
let html = ""
let index = -1 
let tableauLength = productsList.length; 
let totalCart = 0 
while (tableauLength > 0  ) {
  console.log('productsList.length', productsList.length);
    index += 1 
    console.log(index);
    console.log(productsList[1]);
    tableauLength-- ; // un produit de moins
    html += makeCartProductHtml(productsList[index],index)

}
let price = document.getElementsByClassName("cart__price");
console.log('totalcart',totalCart);
// création d'une foction pour supprimer l'article 
function suppprod(index){

    productsList.splice(index, 1); // La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments à même le tableau
    localStorage.setItem("products", JSON.stringify(productsList));
    window.location.reload() //La méthode Location.reload() recharge la ressource depuis l'URL actuelle.
    window.scrollTo(0,0);
}

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
      <a onclick="suppprod(${index})" class="deleteItem">Supprimer</a>
    </div>
  </div>
</div>
</article> ` 
}



console.log(localStorage);


/*async function getPrice (productsList, index) {

  const response = await fetch('http://localhost:3000/api/products/'+ productsList[index].id);  // récupérer le premier élément dans notre tableau et dans l'ID 
    return await response.json(); 
}*/