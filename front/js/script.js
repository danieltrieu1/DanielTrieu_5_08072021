// La page d’accueil

    // Cette page présente l’ensemble des produits retournés par l’API. Pour chaque produit, il faudra afficher l’image de celui-ci, ainsi que son nom et le début de sa description. En cliquant sur le produit, l’utilisateur sera redirigé sur la page du produit pour consulter celui-ci plus en détail.

    // Une page d’accueil montrant (de manière dynamique) tous les articles disponibles à la vente.

//-------------------------------------------------

// Requete API
fetch('http://localhost:3000/api/products')
    .then((response) => response.json()) // Récupération des données depuis l'API -> Traduction des données en objet JSON
    .then((data) => { // Récupération des données converties pour l'affichage
        showProducts(data)}) // Incrémentation des données récupérées au sein de la fonction showProducts
        
    .catch(error => { // Récupération des erreurs potentielles
        alert('Error');
    });

// Affichage des produits de la page    
showProducts = (data) => {
    
    for ((products) of (data)) { // for of // Création d'une boucle permettant de parcourir le array contenant les produits
        // console.log(data);
    const items = document.getElementById("items");  // Ciblage de la balise pour implémenter le produit 
    items.innerHTML +=`
        <a href="./product.html?id=${products._id}"> 
            <article>
                <img src="${products.imageUrl}" alt="${products.altTxt}">
                <h3 class="productName">${products.name}</h3>
                <p class="productDescription">${products.description}</p>
            </article>
        </a>
        `
    };
    // console.log(data);
};


