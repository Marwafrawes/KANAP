// Récupérer les infos envoyées dans le panier (transformé de JSON en objet JS et stocké dans le navigateur)
function getCart() {
    let productsList = [];
    console.log(JSON.parse(localStorage.getItem("products")));
    
    if (localStorage.getItem("products") != null) {
        productsList = JSON.parse(localStorage.getItem("products")); 
    }
    return productsList;
  }
//--------------------Sélection de la balise de la page product.html dans laquel on va insérer les produits et leurs infos-------------------------

    let productsList = getCart();
    const section = document.getElementById("cart__items");
    let quantity = document.getElementById("totalQuantity");
    let totalQty = 0; 
    
    function totalProductsQuantity(){
        totalQty += parseInt(quantityProductPanier);
        console.log("Total quantité panier",totalQty);
        document.getElementById("totalQuantity").innerText = totalQty;
    }

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
    totalCart += productsList[index].price * productsList[index].qty
    totalQty +=  productsList[index].qty 

    html += makeCartProductHtml(productsList[index])

}
let price = document.getElementsByClassName("cart__price");
console.log(totalCart);
// ici je dois ajouter le block de prix HTML 
section.innerHTML=html

// contruire le Html d'un prduit 
function makeCartProductHtml (product) {
 
return `<article class="cart__item" data-id=${product._id} data-color=${product.color}>
<div class="cart__item__img">
  <img src="${product.imageUrl}" alt="${product.altText}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">${product.description}
    <h2>${product.name}</h2>
    <p>${product.color}</p>
    <p>${product.price}€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.qty}>
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article> ` 
}

