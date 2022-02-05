function photographerFactory(data) {
    const { name, portrait,city,country,price,id,tagline,taggers,media } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {
         const article = document.createElement( 'article' );
        article.className  ="showen "+name;
        article.setAttribute("selected",0)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.className ="photo_de_profil";
        img.setAttribute("alt",name +" adresse : "+city+" "+country+" Prix : "+price+" euro par jour")
         const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.className ="nom_photographer";
         const ville = document.createElement('h3');
         ville.textContent = city +", "+ country;
         ville.className = "ville";
         const tag = document.createElement('h5');
         tag.textContent = tagline;
         tag.className = "tagline";
         const pagephotographers = document.createElement('a');
         pagephotographers.setAttribute("href","photographer.html?id="+id)
         prix = document.createElement("h3");
         prix.textContent= price+"€/jour";
         prix.className="prix";
        const taggers_ul = document.createElement("ul");       
        article.appendChild(pagephotographers)
        pagephotographers.appendChild(img);
        article.appendChild(h2);
        article.appendChild(ville);
        article.appendChild(tag);
        article.appendChild(prix);
        article.appendChild(taggers_ul);
        return (article);
    }
    return { name, picture,city,country,price,id, getUserCardDOM }
}

 




   

 