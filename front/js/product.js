//récupérer API //Création d’un lien entre les produits de la page d’accueil et de la produit 

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id'); 
//console.log(id);
let product = {}; 
let globalPrice = 0;
// fetch englobant la promesse.

fetch('http://localhost:3000/api/products/'+ id)
//La méthode then() renvoie un objet Promise en attente de résolution // sera appelé d'une facon Asynchrone
    .then(

        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                console.log('product: ', data);
                product = data; 
                //exemple en deux étape // Appel By ID dans le document 
                let price = document.getElementById('price');
                price.textContent = data.price; 
                globalPrice = data.price; 
                //exemple en une étape
                document.getElementById('title').textContent= data.name;
                document.getElementById('description').textContent = data.description;
                let colorsElement = document.getElementById('colors');
                data.colors.forEach(color => {
                    let option = colorsElement.appendChild(document.createElement('option'));
                    option.textContent = color;
                })
                let img = document.querySelector(".item__img");
                img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
                
            });
            
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

    //HTML element  : pour ajouter les produits dans le panier 
const toCartBtn = document.getElementById("addToCart");
    // créer un evenement clic pour ajouter les produits 
toCartBtn.addEventListener("click", () => {
const color = document.querySelector('#colors').value; 
const qty = parseInt(document.querySelector('#quantity').value); 
const buy = {
    _id: product._id,
    color: color,
    qty: qty
};
addProduct(buy);
    window.location.href = "./cart.html";
  });
  // créaton d'un Array depuis ID et stocker les donner 
function addProduct(product){
    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products')); // prend une chaine de caractère est transforme en objet 
        const productIndex = products.findIndex((pro) => product._id === pro._id && product.color === pro.color);
        if (productIndex > -1) {
            products[productIndex].qty =parseInt(products[productIndex].qty); 
            products[productIndex].qty += parseInt(product.qty); 
        }
        else
            products.push(product); 
    } 
    else
        products.push(product);
    localStorage.setItem('products', JSON.stringify(products)); // stringfy prend un objet est transforme en une chaine de caractère 
}
 
// récuoérer la quantité 
 const quantity = document.getElementById("quantity");
// créer un évenement pour changer le prix et la quantité  
quantity.addEventListener("change",() => {
const price = document.getElementById("price"); 
price.innerHTML = globalPrice * quantity.value; 
}); 
///fin 