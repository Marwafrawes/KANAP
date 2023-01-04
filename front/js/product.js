//récupérer API 

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id);
fetch('http://localhost:3000/api/products/'+ id)
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
                //exemple en deux étape
                const price = document.getElementById('price');
                price.textContent = data.price
                //exemple en une étape
                document.getElementById('title').textContent= data.name
                document.getElementById('description').textContent = data.description
                

                const colorsElement = document.getElementById('colors')
                data.colors.forEach(color => {
                    const option = colorsElement.appendChild(document.createElement('option'))
                    option.textContent = color
                })
                //let imgDiv = document.getElementsByClassName('item__img') 
                const imgDiv = document.getElementsByClassName('image')
                console.log(imgDiv)
                const DOM_img = document.createElement("img");
                console.log(DOM_img)    
                DOM_img.src = data.imageUrl
                DOM_img.alt = data.altTxt
                imgDiv.appendChild(DOM_img)
            });
            
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });