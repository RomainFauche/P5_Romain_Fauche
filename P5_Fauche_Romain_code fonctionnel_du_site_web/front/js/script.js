// Appel de l'API
    fetch('http://localhost:3000/api/products')
        // Promesse 1 : Récupération de la response pour la convertir en JSON
        .then(response => response.json())
                // Promesse 2 : Affiche les data de ma fonction blockProducts
                .then(dataBase => { 
                    blockProducts(dataBase);
                })

 //Message d'erreur API
    .catch(_error => {
        alert("Erreur Serveur");
    });

// Affiche les produits et leurs informations
    function blockProducts(dataBase) { 
        // Utilisation d'une boucle "for...of" pour une meilleur lisibilité du code
        for (let product of dataBase) {  
            // Retouver id "items" dans le code html      
            const boxProduct = document.getElementById('items'); 
            // le "+" permet d'ajouter tout le contenu nécessaire       
            boxProduct.innerHTML +=`
            <a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>`; 
            
        }
    }


