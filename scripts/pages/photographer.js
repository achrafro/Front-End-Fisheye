//Mettre le code JavaScript lié à la page photographer.html
let idphtgr = new URLSearchParams(window.location.search);
let photographerIdEnString = idphtgr.get("id");
let photographerIdd = parseInt(photographerIdEnString);
var photographerName;
var photographerIds;
var photographerCity;
var photographerCountry;
var photographerTagline;
var photographerPrice;
var photographerPortrait;
var Media_de_photographer = [];

async function getPhotographerInformation() {
    const response = await fetch("..//data/photographers.json");

    const data = await response.json();

    //  selectionner les informations du photographer
    for (let i = 0; i < data.photographers.length; i++) {
        if (data.photographers[i].id === photographerIdd) {
            photographerName = data.photographers[i].name;
            photographerIds = data.photographers[i].id;
            photographerCity = data.photographers[i].city;
            photographerCountry = data.photographers[i].country;
            photographerTagline = data.photographers[i].tagline;
            photographerPrice = data.photographers[i].price;
            photographerPortrait = data.photographers[i].portrait;
        }
    }
    //  selectionner les galeries de photographer //

    for (let x = 0; x < data.media.length; x++) {
        if (data.media[x].photographerId == photographerIds) {
            Media_de_photographer.push(data.media[x]);
        }
    }
    //  fin selectionner les galeries de photographer //

    //  prendre le nom de photographer
    const fullName = photographerName;

    const [first, last] = fullName.split(" ");

    //  affiches les resutlats des information photographers la page HTML
    function ajouter_info_photographer() {
        let photograph_header = document.querySelector(".photograph-header");
        let img = document.createElement("img");
        img.setAttribute("src", "/assets/photographers/" + photographerPortrait);
        img.className = "photo_de_profil";
        newdiv = document.createElement("div");
        newdiv.className = "newdiv";
        let name = document.createElement("p");
        name.textContent = photographerName;
        name.className = "nom_photographer";
        let ville = document.createElement("p");
        ville.textContent = photographerCity + ", " + photographerCountry;
        ville.className = "ville";
        let tag = document.createElement("p");
        tag.textContent = photographerTagline;
        tag.className = "tag";
        photograph_header.appendChild(newdiv);
        photograph_header.appendChild(img);
        newdiv.appendChild(name);
        newdiv.appendChild(ville);
        newdiv.appendChild(tag);
    }

    function ajouter_hashtag_photographer() {
        let tableau_avec_nom_de_media = [];

        Media_de_photographer.forEach((media) => {
            if (media.image != undefined) {
                let tag = media.image.split("_");
                tableau_avec_nom_de_media.push(tag[0]);
            }
            if (media.video != undefined) {
                let tag = media.video.split("_");
                tableau_avec_nom_de_media.push(tag[0]);
            }
        });
        tableau_avec_nom_de_media = _.uniq(tableau_avec_nom_de_media);


        let hashtag_ul = document.createElement("ul");
        hashtag_ul.className = "hashtags_ul";
        newdiv.appendChild(hashtag_ul)
        tableau_avec_nom_de_media.forEach(tagg => {
            let hashtag_li = document.createElement("li");
            hashtag_li.textContent = "#" + tagg;
            hashtag_li.className = "hashtags_li";
            hashtag_ul.appendChild(hashtag_li);



        })



    }

    // liste de tri :
    function add_trier() {
        let drop_label = document.createElement("div");
        drop_label.className = "liste_tri";
        main.appendChild(drop_label);
        let text_trier_par = document.createElement("p");
        text_trier_par.textContent = "Trier par ";
        text_trier_par.className = "text_trier_par";
        text_trier_par.setAttribute("for", "dropdown");
        drop_label.appendChild(text_trier_par);

        let drop = document.createElement("select");
        drop.className = "drop";
        drop_label.appendChild(drop);

        let option_1 = document.createElement("option");
        option_1.textContent = "  Popularité ";
        option_1.setAttribute("value", "popularite");
        let option_2 = document.createElement("option");
        option_2.textContent = "  Date ";
        option_2.setAttribute("value", "date");
        let option_3 = document.createElement("option");
        option_3.textContent = "  Titre ";
        option_3.setAttribute("value", "titre");
        drop.appendChild(option_1);
        drop.appendChild(option_2);
        drop.appendChild(option_3);
    }

function afficher_gallerie(){

    let galerie = document.createElement("div");
    galerie.className="galerie";
    main.appendChild(galerie);
 
    Media_de_photographer.forEach(media => {
        
           let box = document.createElement("div");
    box.className ="box";
    galerie.appendChild(box);
        if (media.image != undefined) {
        let box_image = document.createElement("img");
        box_image.className ="box_image";
        box_image.setAttribute("src","/assets/photographers/"+first+"/"+media.image);
        box.appendChild(box_image);
        let media_title =document.createElement("p");
            media_title.textContent = media.title;
            media_title.className="media_title"
            box.appendChild(media_title);
            let nbr_like = document.createElement("p");
            nbr_like.textContent= media.likes;
            nbr_like.className="likes";
            box.appendChild(nbr_like)
              console.log(media.likes)
            let heart = document.createElement("i");
            heart.className="fa-solid fa-heart";
            box.appendChild(heart);
            heart.className="fa-regular fa-heart heart_galerie"
            }
        else {
             let box_image = document.createElement("video");
                     box_image.className ="box_image";

            box_image.controls ="autoplay";
              let box_source = document.createElement("source");
            box_image.appendChild(box_source);
        box_source.setAttribute("src","/assets/photographers/"+first+"/"+media.video);
        box.appendChild(box_image);
             let media_title =document.createElement("p");
            media_title.textContent = media.title;
            media_title.className="media_title"
            box.appendChild(media_title);
            let nbr_like = document.createElement("p");
            nbr_like.textContent= media.likes;
            nbr_like.className="likes";
            box.appendChild(nbr_like)
             let heart = document.createElement("i");
            heart.className="fa-solid fa-heart";
            box.appendChild(heart);
            heart.className="fa-regular fa-heart heart_galerie"
        }
    })


}
    
    function compteur_like_prix() {
        
        //compteur like_en bas
let like_prix = document.createElement("div");
like_prix.className="like_prix";
document.body.appendChild(like_prix);
//  prix en bas
let prix_en_bas =  document.createElement("p");
prix_en_bas.className ="prix_en_bas";
prix_en_bas.textContent = photographerPrice+"€/jour";
like_prix.appendChild(prix_en_bas);
//  LIKEs en bas 

let compteur = document.createElement("p");
compteur.className="compteur_likes";
 like_prix.appendChild(compteur);

// ajouter icone couer : 
let coeur = document.createElement("i");
coeur.className="fa-solid fa-heart";
like_prix.appendChild(coeur);
    }

    function afficher_selon_tri() {
        
let options = document.querySelectorAll("select");
// afichage par defaut populaire : 

Media_de_photographer.sort(function(a,b) { 
    return b.likes - a.likes;
   });

//    

 options.forEach(option => {

option.addEventListener("change", e => {

 console.log(e.target.value);

if (e.target.value == "popularite") {
    Media_de_photographer.sort(function(a,b) { 
        return b.likes - a.likes;
       });
 
       console.log(Media_de_photographer);
       let galeriee = document.querySelectorAll(".galerie")
       main.removeChild(galeriee[0]);
       afficher_gallerie();


}
 else if (e.target.value == "titre") {
console.log(e.target.value);
    Media_de_photographer.sort(function(a,b) { 
        if (a.title.toLowerCase() < b.title.toLowerCase()  ) 
        return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()  ) 
        return 1;
        return 0;
       });
 
       console.log(Media_de_photographer);
       let galeriee = document.querySelectorAll(".galerie")
       main.removeChild(galeriee[0]);
       afficher_gallerie();
}

else   {

    Media_de_photographer.sort(function(a,b) { 
        return new Date(b.date) - new Date(a.date);
       });
 
       console.log(Media_de_photographer);
       let galeriee = document.querySelectorAll(".galerie")
       main.removeChild(galeriee[0]);
       afficher_gallerie();
}

    })
 }
    
    )       
        

 
      
        

        

 

                                  
                                  
                               
    }


    ajouter_info_photographer();
    ajouter_hashtag_photographer();
    add_trier();
    afficher_selon_tri();
    compteur_like_prix();
    afficher_gallerie();

   



}

getPhotographerInformation();
