// La page Produit

// Cette page présente un seul produit ; elle aura un menu déroulant permettant à l'utilisateur de choisir une option de personnalisation, ainsi qu’un input pour saisir la quantité. Ces éléments doivent être pris en compte dans le panier.

// Une page “produit” qui affiche (de manière dynamique) les détails du produit sur lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.

//-------------------------------------------------

// Affichage de l'article la page produit

// Récupération du produit
let params = new URLSearchParams(window.location.search); // .search pointe la partie de l'URL qui suit le symbol ?
let itemId = params.get("id"); // qu'on récupère ici avec .get qu'on déclare dans une variable
// console.log(itemId);

// Initialisation des caractéristiques du produit
const itemImage = document.getElementsByClassName("item__img");
const itemTitle = document.getElementById("title");
const itemPrice = document.getElementById("price");
const itemDescription = document.getElementById("description");
const itemColors = document.getElementById("colors");
// console.log(itemColors); // Vérification de la sélection de chaque élément

let imageURL = ""; // ajout de imageURL pour l'affiche dans le panier

// Requête pour récuperer le produit dans la base de données
fetch(`http://localhost:3000/api/products/${itemId}`)
  // Rajout de itemId déclaré précédemment pour avoir le produit selectionné
  .then((response) => response.json()) 
  .then((data) => {
    // console.log(data);

    itemImage[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`; 
    imageURL = data.imageUrl;
    // console.log(imageURL);
    // console.log(itemImage[0]); // on met la valeur entre les crochets pour qu'il aille chercher la première balise

    itemTitle.innerHTML = `<h1>${data.name}</h1>`;
    itemPrice.innerHTML = `${data.price}`;
    itemDescription.innerHTML = `${data.description}`;

    for (select in data.colors) { // for/in puisque color dans la doc est de type array of string
      colors.options[colors.options.length] = new Option(data.colors[select]);
      // console.log(data.colors[couleur]);
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

// Écoute du bouton et envoie au panier
addToCart.addEventListener("click", (event) => {
  event.preventDefault();

  // Condition pour que le produit ne s'ajoute pas au panier si les critères ne sont pas remplis
  if (
    itemQuantity.value <= 0 ||
    itemQuantity.value >= 100 ||
    itemOptions.value == ""
  ) {
    alert("Veuillez ajouter la quantité et l'option de votre produit");
  } else {
    // Récupération des valeurs du produit sélectionné
    // // Déclaration de l'objet au sein du bouton
    let selectedProduct = {
      name: itemTitle.textContent,
      id: itemId,
      price: itemPrice.textContent,
      color: itemOptions.value,
      quantity: itemQuantity.value,
      image: imageURL,
    };

    // console.log(selectedProduct); // Vérification des données du produit récupérées à l'écoute du bouton

    //-------------------------------------------------
    //---------------- LocalStorage -------------------
    //-------------------------------------------------
    // Initialisation du localStorage au sein du bouton

    //   // Stockage des valeurs

    // Déclaration de la variable ou on va mettre les key et value
    let productInLocalStorage = JSON.parse(localStorage.getItem("product")); // JSON.parse convertit les données JSON du local storage en objet Javascript

    //   // Vérification si il y a déjà le produit enregistré dans le local storage ou non
    let addProductInLocalStorage = () => {
      productInLocalStorage.push(selectedProduct); // Récupération des données dans un tableau avec la méthode .push
      localStorage.setItem("product", JSON.stringify(productInLocalStorage)); // Création de la key 'product' avec la méthode .setItem // Utilisation de la méthode JSON.stringify pour convertir l'objet Javascript en données JSON
    };

    let itemAddedInCart = () => {
      alert("Votre article a bien été ajouté dans le panier !");
      // window.location.href = "cart.html"; // Facultatif
    };

//-------------------------------------------------

console.log(productInLocalStorage);

    let update = false;

    if (productInLocalStorage) { 
      productInLocalStorage.forEach(function (productCheck, key) { 
        if ( productCheck.id == itemId && productCheck.color == itemOptions.value ) {
          productInLocalStorage[key].quantity =
            parseInt(productCheck.quantity) + parseInt(itemQuantity.value);
          localStorage.setItem(
            "product",
            JSON.stringify(productInLocalStorage)
          );

          update = true;

          itemAddedInCart();
        }
      });

      if (!update) {
        addProductInLocalStorage();
        itemAddedInCart();
      }
    } else {
      productInLocalStorage = []; // Je créer un tableau vide
      addProductInLocalStorage(); // Je met dans ce tableau le contenu de mon selectedProduct
      itemAddedInCart(); // Je créer la clé produit que je convertis en JSON pour le local storage
    }
  }
});
