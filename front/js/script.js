const element = document.getElementById('items');

fetch('http://localhost:3000/api/products')
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                console.log('products: ', data);
                let html = '';
                data.forEach(item => {
                    html += makeHhtmlForProduct(item);
                })
                element.innerHTML=html
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
//<a> <article> <img> <h3> <p></artcile></a>
function makeHhtmlForProduct(product) {
    return `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altText}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`;
}



function redirect(id) {
    console.log(id)
    window.location.href = `../html/product.html?id=`+id

}