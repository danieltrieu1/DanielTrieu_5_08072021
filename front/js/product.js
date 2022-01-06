// La page Produit

// Cette page présente un seul produit ; elle aura un menu déroulant permettant à l'utilisateur de choisir une option de personnalisation, ainsi qu’un input pour saisir la quantité. Ces éléments doivent être pris en compte dans le panier.

// Une page “produit” qui affiche (de manière dynamique) les détails du produit sur lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.

//-------------------------------------------------

// Affichage de l'article la page produit
// // Récupération du produit

// .search pointe la partie de l'URL qui suit le symbol ?
let params = new URLSearchParams(window.location.search); 

// qu'on récupère ici avec .get qu'on déclare dans une variable
let itemId = params.get("id");

// console.log(itemId);

// Initialisation des caractéristiques du produit
const itemImage = document.getElementsByClassName("item__img");
const itemTitle = document.getElementById("title");
const itemPrice = document.getElementById("price");
const itemDescription = document.getElementById("description");
const itemColors = document.getElementById("colors");

// Vérification de la sélection de chaque élément
// console.log(itemColors); 

// Ajout d'une string vide pour l'affichage de l'image sur la page
let imageURL = ""; 

// Requête pour récupérer le produit dans la base de données
  // Rajout de 'itemId' déclaré précédemment pour cibler et avoir le produit selectionné
fetch(`http://localhost:3000/api/products/${itemId}`)
  .then((response) => response.json()) 
  .then((data) => {

  // console.log(data);

    // Implémentation des éléments de la page dans le code HTML
    itemImage[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`; 
    imageURL = data.imageUrl;
        
    // on met la valeur entre les crochets pour qu'il aille chercher la première valeur
    // console.log(itemImage[0]);
    // console.log(imageURL);

    itemTitle.innerHTML = `<h1>${data.name}</h1>`;
    itemPrice.innerHTML = `${data.price}`;
    itemDescription.innerHTML = `${data.description}`;

    // Boucle for/in puisque colors dans les données du produit est de type array of string
    for (select in data.colors) { 
      colors.options[colors.options.length] = new Option(data.colors[select]);
      
      // console.log(data.colors[select]);
    }
  })
  
  // Affichage des erreurs potentielles
  .catch((error) => {
    alert("Error");
  });

// Mise en variable des choix de l'utilisateur
const itemQuantity = document.getElementById("quantity");
const itemOptions = document.getElementById("colors");

// Ajouter de l'élément au panier
const addToCart = document.getElementById("addToCart");

//-------------------------------------------------

// Écoute du bouton et envoie au panier
addToCart.addEventListener("click", (event) => {
  event.preventDefault();

  // Si la quantité du produit est équivalente ou inféreur à 0 et supérieur à 100
  if (
    itemQuantity.value <= 0 ||
    itemQuantity.value > 100
  ) {
  alert("Désolé ! Veuillez ajouter une quantité comprise entre 0 et 100 !");
  }
  // Si l'option de couleur n'a pas été selectionnée
  else if (itemOptions.value == "") {
  alert("Désolé ! Veuillez d'abord choisir une couleur disponible !");
  } else {

// Récupération des valeurs du produit sélectionné
    
  // Déclaration de l'objet contenant les caractéristiques du produit au sein du bouton 
  let selectedProduct = {
    name: itemTitle.textContent,
    id: itemId,
    price: itemPrice.textContent,
    color: itemOptions.value,
    quantity: itemQuantity.value,
    image: imageURL,
  };

// Vérification des données du produit récupérées à l'écoute du bouton
// console.log(selectedProduct);

//-------------------------------------------------
//---------------- LocalStorage -------------------
//-------------------------------------------------

// Initialisation du localStorage au sein du bouton
// // Stockage des valeurs

  // Déclaration de la variable ou on va mettre les key et value
  // JSON.parse convertit les données JSON du local storage en objet Javascript
  let productInLocalStorage = JSON.parse(localStorage.getItem("product")); 

  // Vérification si il y a déjà le produit enregistré dans le local storage ou non
  let addProductInLocalStorage = () => {
    
    // Récupération des données dans un tableau avec la méthode .push
    productInLocalStorage.push(selectedProduct);

    // Création de la key 'product' avec la méthode .setItem 
    // Utilisation de la méthode JSON.stringify pour convertir l'objet Javascript en données JSON
    localStorage.setItem("product", JSON.stringify(productInLocalStorage)); 
  };

  // Confirmation de l'ajout du produit au panier
  let itemAddedInCart = () => {
    alert("Votre article a bien été ajouté dans le panier !");

    // Redirection Facultative vers la page panier
    // window.location.href = "cart.html"; 
  };

    console.log(productInLocalStorage);

//-------------------------------------------------
  
  // Vérification de l'ajout de produit avec une méthode booléenne
  let update = false;

  // Si le produit est envoyé dans le local storage
  if (productInLocalStorage) { 

    // Pour chaque produit ajouté
    productInLocalStorage.forEach(function (productCheck, key) {

      // Si le produit ajouté possède un 'id' et une option 'color' identique: la quantité est mise à jour
      if ( productCheck.id == itemId && productCheck.color == itemOptions.value ) {
        
        productInLocalStorage[key].quantity = parseInt(productCheck.quantity) + parseInt(itemQuantity.value);

        // Mise à jour des nouvelles valeurs du produit
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));

        // L'article ajouté est identique au produit présent dans le local storage
        update = true;

        // Confirmation de l'ajout 
        itemAddedInCart();
      }

      // console.log(productInLocalStorage); 

    });

    // L'article ajouté est n'est pas identique au produit présent dans le local storage
    // Si le produit possède une autre option 'color': le produit est ajouté séparemment
    if (!update) {

      // Vérification du produit existant dans le local storage
      addProductInLocalStorage();

      // Confirmation de l'ajout
      itemAddedInCart();
    }

    // L'article ajouté est n'est pas identique aux produits présent dans le local storage
    // Si le produit possède un autre 'id' et une autre couleur: le produit est ajouté séparemment  
  } else {
    
      // Je créer un tableau vide
      productInLocalStorage = []; 

      // Je met dans ce tableau le contenu de mon produit sélectionné
      // Je créer la nouvelle clé produit que je convertis en JSON pour le local storage
      addProductInLocalStorage(); 

      // Confirmation de l'ajout
      itemAddedInCart(); 
    }
  }
});

