//Récupérer l'id du produit à afficher
    let url = new URL(window.location.href).searchParams;
    let productId = url.get("id");

// Variable pour modifier les information des photos
    let imageLink = "";
    let imageAlt = "";
// Variable pour implanter le texte
    const head = document.querySelector("title")
    const images = document.getElementsByClassName("item__img");


    const titleProducts = document.getElementById("title");
    const priceProducts = document.getElementById("price");
    const descriptionProducts = document.getElementById("description");
// Variable pour modifier les options de couleur    
    const colors = document.getElementById("colors")

// Insertion du produit séléctionner
    fetch("http://localhost:3000/api/products/" + productId)
       .then(response => response.json())
            .then(dataBase => {
                // Chargement du nom de chaque produit au niveau de l'onglet
                head.innerHTML = `${dataBase.name}`;
                    // Chargement de l'image du produit séléctionner par le client
                    images[0].innerHTML = `<img src="${dataBase.imageUrl}" alt="${dataBase.altTxt}">`;
                    imageLink = dataBase.imageUrl;
                    imageAlt = dataBase.altTxt;
                        // Création des balises HTML avec variation du texte selon produit
                        titleProducts.innerHTML = `<h1>${dataBase.name}</h1>`;
                        priceProducts.innerHTML = `<span>${dataBase.price}</span>`;
                        descriptionProducts.innerHTML = `<p>${dataBase.description}</p>`;
                            // chargement du choix des couleurs pour les produits
                            for (value in dataBase.colors) {
                                colors.options[colors.options.length] = new Option(
                                dataBase.colors[value],
                                dataBase.colors[value]                                
                            );
                            }
            })

 //Message d'erreur API
    .catch(_error => {
        alert("Désoler une erreur c'est produite veuillez relancer le serveur svp");
});

// Préparation envoie de la quantité + couleur de canaper vers le panier
    const productQuantity = document.getElementById("quantity");
    const customerColor = document.getElementById ("colors");

//crée événement "click" sur bouton ajouter au panier
    const addBasket = document.getElementById("addToCart");

        addBasket.addEventListener ("click", (event) => {
            // Permet de mettre au panier une quantitée comprise entre 1 à 100
            if (quantity.value > 0 && quantity.value <= 100 && quantity.value != 0){

            // Information sur le produit pour le panier à stocker
        const productInfomationOfCart = {
            id: productId,
            color: customerColor.value, 
            quantity: productQuantity.value,
            }; 
          
// Création d'une variable json local storage
    // les clés et les valeurs vont dans le local storage
    // Convertion des données au format JSON en objet JS grace à JSON.parse
let productLocalStorage = JSON.parse(localStorage.getItem("product"));

// ajout des produits que les clients auront séléctionner
const addProductLocalStorage = () => {

    productLocalStorage.push(productInfomationOfCart);
    
    localStorage.setItem("product", JSON.stringify(productLocalStorage));
}

const addConfirm = () => {
    
    if (window.confirm(`${productQuantity.value} ${titleProducts.textContent}, ${customerColor.value} ont été ajouter au panier.
    Pour allez au panier cliquer sur OK `)){
        window.location.href = "cart.html";
    };
}

let update = false;

// "Si" il y a des produit stocké dans le "localStorage"
if (productLocalStorage) {

    productLocalStorage.forEach (function (chosenProduct, key) {      
        // Si le produit commandé est déjà dans le panier 
        if (chosenProduct.id == productId && chosenProduct.color == customerColor.value) {
            productLocalStorage[key].quantity = parseInt(chosenProduct.quantity) + parseInt(productQuantity.value);
            localStorage.setItem("product", JSON.stringify(productLocalStorage));
            update = true;
            addConfirm();
            
        }
    });
        // Si le produit ne se trouve pas dans le panier
        if (!update) {
            addProductLocalStorage();
            addConfirm();
        }
}
// "Si" il y a aucun produit dans le local storage  
else {
    // je crée un tableau avec les élément choisi
    productLocalStorage = [];
    addProductLocalStorage();
    addConfirm();
  }}
  else{
      alert("Nombre d'article insuffisant. Veuillez choisir une quantité comprise entre 1 à 100.")
  }
});
