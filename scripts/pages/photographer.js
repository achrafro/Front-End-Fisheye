//

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
        const response = await fetch('https://achrafro.github.io/Front-End-Fisheye/data/photographers.json');

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

  let [first, last] = fullName.split(" ");

  //  affiches les resutlats des information photographers la page HTML
  function ajouter_info_photographer() {
    let photograph_header = document.querySelector(".photograph-header");
    let img = document.createElement("img");
    img.setAttribute("src", "https://achrafro.github.io/Front-End-Fisheye/assets/photographers/" + photographerPortrait);
    img.className = "photo_de_profil";
    img.setAttribute("tabindex","2")
    img.setAttribute("ALT","photo de profil de "+photographerName)
    newdiv = document.createElement("div");
    newdiv.className = "newdiv";
    newdiv.setAttribute("tabindex","1")
    let name = document.createElement("p");
    name.textContent = photographerName;
    name.className = "nom_photographer";

    // testiiing
    let modal = document.querySelector(".modal");
    let contact_moi = document.querySelector(".contact_moi");
    contact_moi.textContent += " " + photographerName;
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
    newdiv.appendChild(hashtag_ul);
    tableau_avec_nom_de_media.forEach((tagg) => {
      let hashtag_li = document.createElement("li");
      hashtag_li.textContent = "#" + tagg;
      hashtag_li.className = "hashtags_li";
      hashtag_ul.appendChild(hashtag_li);
    });
  }

  // liste de tri :
  function add_trier() {
    let drop_label = document.createElement("div");
    drop_label.className = "liste_tri";
    drop_label.setAttribute("tabindex","3")
    main.appendChild(drop_label);
    let text_trier_par = document.createElement("p");
    text_trier_par.textContent = "Trier par ";
    text_trier_par.className = "text_trier_par";
    text_trier_par.setAttribute("for", "dropdown");
    drop_label.appendChild(text_trier_par);

    let drop = document.createElement("select");
    drop.className = "drop";
    drop.setAttribute("tabindex","4")
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

  function afficher_gallerie() {
    // init de compteur
    let likes_compteur = 0;

    let galerie = document.createElement("div");
    galerie.className = "galerie";
    main.appendChild(galerie);

    Media_de_photographer.forEach((media) => {
      likes_compteur = likes_compteur + media.likes;
      let box = document.createElement("div");
      box.className = "box";

      galerie.appendChild(box);
      if (media.image != undefined) {
        let box_image = document.createElement("img");
        box_image.className = "box_image";
        box_image.setAttribute(
          "src",
          "https://achrafro.github.io/Front-End-Fisheye/assets/photographers/" + first + "/" + media.image
        );
        box_image.setAttribute("tabindex","5")

        box.appendChild(box_image);
        let media_title = document.createElement("p");
        media_title.textContent = media.title;
        media_title.className = "media_title";
        box.appendChild(media_title);
        let nbr_like = document.createElement("p");
        nbr_like.textContent = media.likes;
        nbr_like.className = "likes";
        box.appendChild(nbr_like);
        let heart = document.createElement("i");
        heart.className = "fa-solid fa-heart";
        box.appendChild(heart);
        heart.className = "fa-regular fa-heart heart_galerie";
      } 
      else {

        let box_image = document.createElement("video");
        box_image.className = "box_image";
        box_image.controls = "autoplay";
 
        let box_source = document.createElement("source");
       

        box_image.appendChild(box_source);
        box_source.setAttribute(
          "src",
          "/assets/photographers/" + first + "/" + media.video
        );
        box_image.setAttribute("tabindex","5")

        box.appendChild(box_image);
        let media_title = document.createElement("p");
        media_title.textContent = media.title;
        media_title.className = "media_title";
        box.appendChild(media_title);
        let nbr_like = document.createElement("p");
        nbr_like.textContent = media.likes;
        nbr_like.className = "likes";
        box.appendChild(nbr_like);
        let heart = document.createElement("i");
        heart.className = "fa-solid fa-heart";
        box.appendChild(heart);
        heart.className = "fa-regular fa-heart heart_galerie";
      }
    });
    // ajouter les nombres totale de like :
    let cptr_de_like = document.querySelector(".compteur_likes");
    cptr_de_like.textContent = likes_compteur;
  }

  function compteur_like_prix() {
    //compteur like_en bas
    let like_prix = document.createElement("div");
    like_prix.className = "like_prix";
    document.body.appendChild(like_prix);
    //  prix en bas
    let prix_en_bas = document.createElement("p");
    prix_en_bas.className = "prix_en_bas";
    prix_en_bas.textContent = photographerPrice + "€/jour";
    like_prix.appendChild(prix_en_bas);
    //  LIKEs en bas

    let compteur = document.createElement("p");
    compteur.className = "compteur_likes";
    like_prix.appendChild(compteur);

    // ajouter icone couer :
    let coeur = document.createElement("i");
    coeur.className = "fa-solid fa-heart";
    like_prix.appendChild(coeur);
  }

  function afficher_selon_tri() {
    let options = document.querySelectorAll("select");
    // afichage par defaut populaire :

    Media_de_photographer.sort(function (a, b) {
      return b.likes - a.likes;
    });

    //

    options.forEach((option) => {
      option.addEventListener("change", (e) => {
        if (e.target.value == "popularite") {
          Media_de_photographer.sort(function (a, b) {
            return b.likes - a.likes;
          });

          let galeriee = document.querySelectorAll(".galerie");
          main.removeChild(galeriee[0]);
          afficher_gallerie();
          slider_show();
          compteur_de_like();
        } else if (e.target.value == "titre") {
          Media_de_photographer.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
          });

          let galeriee = document.querySelectorAll(".galerie");
          main.removeChild(galeriee[0]);
          afficher_gallerie();
          slider_show();
          compteur_de_like();
        } else {
          Media_de_photographer.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          });

          let galeriee = document.querySelectorAll(".galerie");
          main.removeChild(galeriee[0]);
          afficher_gallerie();
          slider_show();
          compteur_de_like();
        }
      });
    });
  }

  //  slideerr

  function slider_show() {
    let box = document.querySelectorAll(".box");
    let slide = document.createElement("div");
    slide.className = "slider";
    let left_flech = document.createElement("img");
    left_flech.setAttribute("tabindex","1")
    left_flech.className = "left_flech";
    left_flech.setAttribute("src", "..//assets/icons/left.png");
    slide.appendChild(left_flech);
    let right_flech = document.createElement("img");
    right_flech.className = "right_flech";
    right_flech.setAttribute("tabindex","2")
    right_flech.setAttribute("src", "..//assets/icons/right.png");
    slide.appendChild(right_flech);
    // close btn
    let close_btn = document.createElement("img");
    close_btn.className = "close_btn";
    close_btn.setAttribute("tabindex","3")
    close_btn.setAttribute("src", "..//assets/icons/close.png");
    slide.appendChild(close_btn);
    box = document.querySelectorAll(".box_image");

    box.forEach((element) => {

      element.addEventListener("click", (e) => {
        slide.style.display = "block";
        document.body.appendChild(slide);
        //  fonction button fermer
        function close_btn_fn() {
          close_btn.addEventListener("click", (c) => {
            slide.style.display = "none";
            images = document.querySelectorAll(".image_slider");

            images.forEach((imgg) => {
              slide.removeChild(imgg);
            });

            titres = document.querySelectorAll(".titre_media");
            titres.forEach((titre) => {
              slide.removeChild(titre);
            });
          });
        }
        close_btn_fn();
        // fin btn fnct
        // 
        let child = e.target.parentNode;
        let parent = e.target.parentNode.parentNode;
        let result = Array.prototype.indexOf.call(parent.children, child);
        let nombre_totale_media =
          e.target.parentNode.parentNode.childNodes.length;

        //  premier affichage
        if (e.target.nodeName == "IMG") {
          let image = document.createElement("img");
          image.className = "image_slider";
          let img_src = e.target.getAttribute("src");
          image.setAttribute("src", ".." + img_src);
          slide.appendChild(image);
          let titre_media = document.createElement("p");
          titre_media.className = "titre_media";
          titre_media.textContent =
            e.target.parentNode.childNodes[1].textContent;
          slide.appendChild(titre_media);
        }
        if (e.target.nodeName == "VIDEO") {
          let video_slider = document.createElement("video");
          video_slider.className = "image_slider";
          video_slider.controls = "autoplay";
          let source_video = document.createElement("source");
          video_slider.appendChild(source_video);
          let vid = e.target.childNodes[0].getAttribute("src");
          source_video.setAttribute("src", ".." + vid);
          slide.appendChild(video_slider);
          let titre_media = document.createElement("p");
          titre_media.className = "titre_media";
          titre_media.textContent =
            e.target.parentNode.childNodes[1].textContent;
          slide.appendChild(titre_media);
        }

        //  FIN PREMIER AFFICHAGE

        right_flech.addEventListener("click", next_image);
        left_flech.addEventListener("click", prev_image);

        //

        // SLIDER SELON KEY PRESS :
        document.addEventListener("keydown", function (k) {
          switch (k.keyCode) {
            case 37:
              prev_image();
              break;
            case 39:
              next_image();
              break;
            case 27:
              slide.style.display = "none";
              images = document.querySelectorAll(".image_slider");
              images.forEach((imgg) => {
                slide.removeChild(imgg);
              });

              titres = document.querySelectorAll(".titre_media");
              titres.forEach((titre) => {
                slide.removeChild(titre);
              });

              break;
          }
        });



        // FNCT BTN DE DROITE //
        function next_image() {
          // ::::::::::::::::::::::::::::::::::
          images = document.querySelectorAll(".image_slider");
          images.forEach((imgg) => {
            slide.removeChild(imgg);
          });

          titres = document.querySelectorAll(".titre_media");
          titres.forEach((titre) => {
            slide.removeChild(titre);
          });

          //    :::::::::::::::::::
          if (result < box.length - 1) {
            result++;

            if (box[result].nodeName == "IMG") {
              let image = document.createElement("img");
              image.className = "image_slider";
              let img_src = box[result].getAttribute("src");
              image.setAttribute("src", ".." + img_src);
              slide.appendChild(image);
              let titre_media = document.createElement("p");
              titre_media.className = "titre_media";
              titre_media.textContent =
                box[result].parentElement.childNodes[1].textContent;
              slide.appendChild(titre_media);
            }
            if (box[result].nodeName == "VIDEO") {
              let video_slider = document.createElement("video");
              video_slider.className = "image_slider";
              video_slider.controls = "autoplay";
              let source_video = document.createElement("source");
              video_slider.appendChild(source_video);
              let vid = box[result].childNodes[0].getAttribute("src");
              source_video.setAttribute("src", ".." + vid);
              slide.appendChild(video_slider);
              let titre_media = document.createElement("p");
              titre_media.className = "titre_media";
              titre_media.textContent =
                box[result].parentElement.childNodes[1].textContent;
              slide.appendChild(titre_media);
            }
          } else if (result == box.length - 1) {
            result = 0;
            if (box[result].nodeName == "IMG") {
              let image = document.createElement("img");
              image.className = "image_slider";
              let img_src = box[result].getAttribute("src");
              image.setAttribute("src", ".." + img_src);
              slide.appendChild(image);
              let titre_media = document.createElement("p");
              titre_media.className = "titre_media";
              titre_media.textContent =
                box[result].parentElement.childNodes[1].textContent;
              slide.appendChild(titre_media);
            }

            if (box[result].nodeName == "VIDEO") {
              let video_slider = document.createElement("video");
              video_slider.className = "image_slider";
              video_slider.controls = "autoplay";
              let source_video = document.createElement("source");
              video_slider.appendChild(source_video);
              let vid = box[result].childNodes[0].getAttribute("src");
              source_video.setAttribute("src", ".." + vid);
              slide.appendChild(video_slider);
              let titre_media = document.createElement("p");
              titre_media.className = "titre_media";
              titre_media.textContent =
                box[result].parentElement.childNodes[1].textContent;
              slide.appendChild(titre_media);
            }
          } else if (result == box.length) {
            result = 1;
            if (box[result].nodeName == "IMG") {
              let image = document.createElement("img");
              image.className = "image_slider";
              let img_src = box[result].getAttribute("src");
              image.setAttribute("src", ".." + img_src);
              slide.appendChild(image);
              let titre_media = document.createElement("p");
              titre_media.className = "titre_media";
              titre_media.textContent =
                box[result].parentElement.childNodes[1].textContent;
              slide.appendChild(titre_media);
            }

            if (box[result].nodeName == "VIDEO") {
              let video_slider = document.createElement("video");
              video_slider.className = "image_slider";
              video_slider.controls = "autoplay";
              let source_video = document.createElement("source");
              video_slider.appendChild(source_video);
              let vid = box[result].childNodes[0].getAttribute("src");
              source_video.setAttribute("src", ".." + vid);
              slide.appendChild(video_slider);
              let titre_media = document.createElement("p");
              titre_media.className = "titre_media";
              titre_media.textContent =
                box[result].parentElement.childNodes[1].textContent;
              slide.appendChild(titre_media);
            }
          }
        }
        // fin btn droite

        //  btn de gauche

        function prev_image() {
          images = document.querySelectorAll(".image_slider");
          images.forEach((imgg) => {
            slide.removeChild(imgg);
          });

          titres = document.querySelectorAll(".titre_media");
          titres.forEach((titre) => {
            slide.removeChild(titre);
          });

          result--;
          if (result > 0) {
            if (box[result].nodeName == "IMG") {
              let image = document.createElement("img");
              image.className = "image_slider";
              let img_src = box[result].getAttribute("src");
              image.setAttribute("src", ".." + img_src);
              slide.appendChild(image);
              let titre_media = document.createElement("p");
              titre_media.className = "titre_media";
              titre_media.textContent =
                box[result].parentElement.childNodes[1].textContent;
              slide.appendChild(titre_media);
            }
            if (box[result].nodeName == "VIDEO") {
              let video_slider = document.createElement("video");
              video_slider.className = "image_slider";
              video_slider.controls = "autoplay";
              let source_video = document.createElement("source");
              video_slider.appendChild(source_video);
              let vid = box[result].childNodes[0].getAttribute("src");
              source_video.setAttribute("src", ".." + vid);
              slide.appendChild(video_slider);
              let titre_media = document.createElement("p");
              titre_media.className = "titre_media";
              titre_media.textContent =
                box[result].parentElement.childNodes[1].textContent;
              slide.appendChild(titre_media);
            }
          }

          if (result == 0) {
            if (box[result].nodeName == "IMG") {
              let image = document.createElement("img");
              image.className = "image_slider";
              let img_src = box[result].getAttribute("src");
              image.setAttribute("src", ".." + img_src);
              slide.appendChild(image);
              let titre_media = document.createElement("p");
              titre_media.className = "titre_media";
              titre_media.textContent =
                box[result].parentElement.childNodes[1].textContent;
              slide.appendChild(titre_media);

              result = nombre_totale_media;
            } else if (box[result].nodeName == "VIDEO") {
              let video_slider = document.createElement("video");
              video_slider.className = "image_slider";
              video_slider.controls = "autoplay";
              let source_video = document.createElement("source");
              video_slider.appendChild(source_video);
              let vid = box[result].childNodes[0].getAttribute("src");
              source_video.setAttribute("src", ".." + vid);
              slide.appendChild(video_slider);
              let titre_media = document.createElement("p");
              titre_media.className = "titre_media";
              titre_media.textContent =
                box[result].parentElement.childNodes[1].textContent;
              slide.appendChild(titre_media);

              result = nombre_totale_media;
            }
          }

          if (result == -1) {
            result = nombre_totale_media - 1;
            if (box[result].nodeName == "IMG") {
              let image = document.createElement("img");
              image.className = "image_slider";
              let img_src = box[result].getAttribute("src");
              image.setAttribute("src", ".." + img_src);
              slide.appendChild(image);
              let titre_media = document.createElement("p");
              titre_media.className = "titre_media";
              titre_media.textContent =
                box[result].parentElement.childNodes[1].textContent;
              slide.appendChild(titre_media);
            } else if (box[result].nodeName == "VIDEO") {
              let video_slider = document.createElement("video");
              video_slider.className = "image_slider";
              video_slider.controls = "autoplay";
              let source_video = document.createElement("source");
              video_slider.appendChild(source_video);
              let vid = box[result].childNodes[0].getAttribute("src");
              source_video.setAttribute("src", ".." + vid);
              slide.appendChild(video_slider);

              let titre_media = document.createElement("p");
              titre_media.className = "titre_media";
              titre_media.textContent =
                box[result].parentElement.childNodes[1].textContent;
              slide.appendChild(titre_media);
            }
          }
        }
      });

//  testeingg : 
  
   element.addEventListener("keypress", (v) => {
    switch(v.keyCode) {

case 13 :  console.log("yeess");
slide.style.display = "block";
document.body.appendChild(slide);
document.addEventListener("keypress",(cb) =>{

  switch (cb.keyCode) {
    case 37:
      prev_image();
      break;
    case 39:
      next_image();
      break;
    case 27:
      slide.style.display = "none";
      images = document.querySelectorAll(".image_slider");
      images.forEach((imgg) => {
        slide.removeChild(imgg);
      });

      titres = document.querySelectorAll(".titre_media");
      titres.forEach((titre) => {
        slide.removeChild(titre);
      });
     
    
  }
  








})
 



    }
   });
 




      
    });

    //  Fin btn de gauche
  }
  // compteur des likes
  function compteur_de_like() {
    let hearts = document.querySelectorAll(".heart_galerie");
    let nombre_de_like_gallerie = document.querySelectorAll(".likes");
    let nombre_de_like_en_bas = document.querySelector(".compteur_likes");

    hearts.forEach((heart) => {
      heart.addEventListener("click", (h) => {
        if (h.target.getAttribute("etat") == 1) {
          h.target.classList = "fa-regular fa-heart heart_galerie";
          h.target.setAttribute("etat", 0);
          let nbr_like_a_jour =
            parseInt(h.target.parentNode.childNodes[2].textContent) - 1;
          console.log(nbr_like_a_jour);
          h.target.parentNode.childNodes[2].textContent = nbr_like_a_jour;
          nombre_de_like_en_bas.textContent =
            parseInt(nombre_de_like_en_bas.textContent) - 1;
        } else {
          let icon_etat = h.target.setAttribute("etat", 1);
          let nbr_like_a_jour =
            parseInt(h.target.parentNode.childNodes[2].textContent) + 1;
          console.log(nbr_like_a_jour);
          h.target.parentNode.childNodes[2].textContent = nbr_like_a_jour;
          nombre_de_like_en_bas.textContent =
            parseInt(nombre_de_like_en_bas.textContent) + 1;
          h.target.classList = "fa-solid fa-heart heart_galerie";
        }
      });
      
    });




  }

  //
  ajouter_info_photographer();
  ajouter_hashtag_photographer();
  add_trier();
  afficher_selon_tri();
  compteur_like_prix();
  afficher_gallerie();
  slider_show();
  compteur_de_like();
}

getPhotographerInformation();


