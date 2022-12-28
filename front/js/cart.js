
// créaton d'un Array depuis ID 
function addProduct(){
    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    localStorage.setItem('products', JSON.stringify(products));
}