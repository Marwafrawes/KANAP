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
                var html = '';
                data.forEach(item=>{
                    html += make_html_for_card(item);
                })
                element.innerHTML=html
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

function make_html_for_card(card) {
    let lien = './product.html?id='+card._id
    return '<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6" id="' + card._id + '" onclick="redirect(\'' + card._id + '\')">' +
        '<h3 class="mt-card-name" href="./product.html?id='+card._id+'">' + card.name + '</h3>' +
        '<a><img src="'+card.imageUrl+'" alt="'+card.altTxt+'" style="max-height: 100px; max-width: 100px"></a>'+
        '<h3>'+card.price+ '€</h3>'+
        '</div>';
}

function redirect(id) {
    console.log(id)
    window.location.href = `../html/product.html?id=`+id

}