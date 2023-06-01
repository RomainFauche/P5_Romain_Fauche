let products = [];
// Appel du local Storage //
let productLocalStorage = JSON.parse(localStorage.getItem("product"));

// Si le local storage est vide //
function cartEmpty(){
  if 
  (productLocalStorage === null || productLocalStorage == 0) {
      const blockEmpty = document.getElementById("cart__items");
      blockEmpty.innerHTML +=
        `<div class="cart__empty">
            <p>Votre panier est vide</p>
          </div>`;
  } 
};
cartEmpty();

// Function si le local storage n'est pas vide //
function goCart() {
// Appel de l'API //
fetch('http://localhost:3000/api/products')
// Promesse 1 : Récupération de la response pour la convertir en JSON //
  .then (response => response.json())
        // Promesse 2 : Affiche les data du serveur //
        .then (dataBase => { 
            
            // Création d'un nouveau tableau qui compare et additionne les data du serveur + celui du local storage //
              const mergeById = (dataBase, productLocalStorage) => productLocalStorage.map(itm => ({...dataBase.find((item)=> item._id === itm.id), ...itm}))
              const merge = mergeById(dataBase, productLocalStorage);
              
            for (let products of merge){            
             
              // Sinon ajouter les produit du local storage //
                if(merge){
                  const blockProducts = document.getElementById("cart__items");
                    blockProducts.innerHTML += 
                    `
                      <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">                      
                        <div class="cart__item__img">
                          <img src="${products.imageUrl}" alt="${products.altTxt}">                        
                        </div>
                        <div class="cart__item__content">
                          <div class="cart__item__content__description">
                            <h2>${products.name}</h2>
                            <p>${products.color}</p>
                            <p>${products.price} €</p>
                          </div>
                          <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté : </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${products.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    `}
                    else{
                      alert("ooops une erreur est survenue")
                    }
                
                // Fonction suppression du produit dans le panier = deleteKanap //
                function deleteKanap() {
                const deleteProducts = document.getElementsByClassName("deleteItem");
                // Création d'une boucle pour la suppression du produit au click //
                for (let del = 0; del < deleteProducts.length; del++)  {
                  deleteProducts[del].addEventListener("click", (event) => {
                    event.preventDefault();

                    // supression des donnée qui constitie le produit dans le local storage //
                    let deleteId = productLocalStorage[del].id;
                    let deleteColor = productLocalStorage[del].color;
                    let deleteQuantity = productLocalStorage[del].quantity;
                    // Création d'un nouveau tableau pour suprimer les donnée du local storage //
                    productLocalStorage = productLocalStorage.filter(pdt => pdt.id !== deleteId || pdt.color !== deleteColor || pdt.quantity !== deleteQuantity);

                    localStorage.setItem("product", JSON.stringify(productLocalStorage));

                    alert(`Le produit ${products.name}, ${products.color} a été supprimer du panier`);
                    location.reload(productLocalStorage)
                  });
                }
              };
              deleteKanap();

            // Fonction de changement de la quantité du panier //
                function changeQuantity() {
                  let kanapQuantity = document.querySelectorAll(".itemQuantity");
                  // Création d'une boucle pour Ajouter (more) ou retirer (less) une quantiter
                    for (let moreLess = 0; moreLess < kanapQuantity.length; moreLess++) {
                      kanapQuantity[moreLess].addEventListener("change", (event) => {
                        event.preventDefault();
                        
                        let newQuantity = kanapQuantity[moreLess].value;                         

                        const localStorageModify = {
                          id: productLocalStorage[moreLess].id,
                          color: productLocalStorage[moreLess].color,
                          quantity: newQuantity,
                        };
                        
                        productLocalStorage[moreLess] = localStorageModify;

                        localStorage.setItem("product", JSON.stringify(productLocalStorage));
                        ttcPrice();
                        totalKanap();
                        
                      })
                    }
                    
                };
                changeQuantity();
                
              // Fonction pour afficher le nombre total de canapés dans le panier //
              function totalKanap() {
                let totalProducts = 0;
                for (add in productLocalStorage) {
                  // analyser et convertir la valeur "quantité" dans le localstorage en une chaîne              
                  const newQuantity = parseInt(productLocalStorage[add].quantity, 10);
              
                  // attribuer la valeur retournée par parseInt à la variable totalItems
                  totalProducts += newQuantity;
                }
                  // attribuer à #totalQuantité la valeur de totalItems et l'afficher dans le DOM
                  const totalQuantity = document.getElementById("totalQuantity");
                  totalQuantity.textContent = totalProducts;
              }
              totalKanap();

              // Fonction calcul du prix x Quantité = totalPrice //
                function ttcPrice() {
                  const calculPrice = [];
                  for (add = 0; add < productLocalStorage.length; add++) {
                    
                    const cartPrice = merge[add].price * productLocalStorage[add].quantity;
                    calculPrice.push(cartPrice);

                    const addUp = (previousValue, currentValue) => previousValue + currentValue;
                    total = calculPrice.reduce(addUp);
                  } 

                  const finalPrice = document.getElementById("totalPrice");
                  finalPrice.textContent = total;

                }
                ttcPrice();
                
            }
            
      })
    }
goCart();


// Debut du formulaire //

function postForm() {
  const buttonClickOrder = document.getElementById("order");
  buttonClickOrder.addEventListener("click",(event) => {
    event.preventDefault();
    
    const contact = {
      firstName : document.getElementById('firstName').value,
      lastName : document.getElementById('lastName').value,
      address : document.getElementById('address').value,
      city : document.getElementById('city').value,
      email : document.getElementById('email').value,
        };
        
        // Création d'une fonction Si le panier est vide
          function localEmpty(){
            if (productLocalStorage === null || productLocalStorage == 0){
              alert("Panier vide")
              return false
             
            }
          }
        function firstNameOk(){
          const validFirstname = contact.firstName;
            if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validFirstname)){
              return true;
            }
              else {
                let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
                firstNameErrorMsg.innerText = "Erreur de saisie";
              }
        }

        function lastNameOk() {
          const validLastName = contact.lastName;
            if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validLastName)){
              return true;
            }
              else {  
                let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');              
                lastNameErrorMsg.innerText = "Erreur de saisie";
              }
        }

        function addressOk() {
          const validAddress = contact.address;
            if (/^[^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,50}$/.test(validAddress)) {
              return true;
            }
              else {   
                let addressErrorMsg = document.getElementById('addressErrorMsg');             
                addressErrorMsg.innerText = "Adresse non valide";
              }
        }

        function cityOk() {
          const validCity = contact.city;
            if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validCity)) {
              return true;
            }
            else {    
               let cityErrorMsg = document.getElementById('cityErrorMsg');          
              cityErrorMsg.innerText = "Erreur de saisie";
            }
        }

        function emailOk() {
          const validEmail = contact.email;
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validEmail)) {
              return true;
            }
            else {
              let emailErrorMsg = document.getElementById('emailErrorMsg');
              emailErrorMsg.innerText = "Email non valide";
            }
        }
        localEmpty();

        function validForm() {          
          if (productLocalStorage &&firstNameOk() && lastNameOk() && addressOk() && cityOk() && emailOk())  {
           return true
          }  
        }
        
        validForm();

        const postData = {
          contact,
          products,
        }
        
        fetch ("http://localhost:3000/api/products/order", {
          method: "POST",
          headers: {
          "Content-type": "application/json"
          },
          body: JSON.stringify(postData),
        })
            .then(response => response.json())
              .then((data) => {             
              localStorage.setItem("orderId", data.orderId);

                if (validForm()) {
                  document.location.href = "confirmation.html";
                }
          });
     
            
  })
}
postForm();


