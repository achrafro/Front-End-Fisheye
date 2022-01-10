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

        //  testing



        const taggers_ul = document.createElement("ul");
      
// TEST 

async function gethashragers(id) {
    const responsex = await fetch('..//data/photographers.json');

    const datax = await responsex.json();

    let media_de_premier_photohrapher = [];


    for (let x in datax.media) {

if (datax.media[x].photographerId == id) {
    media_de_premier_photohrapher.push(datax.media[x].image);
    media_de_premier_photohrapher.push(datax.media[x].video);

}
    }
    
    media_de_premier_photohrapher =  media_de_premier_photohrapher.filter( y => y !== undefined)
    media_de_premier_photohrapher =  media_de_premier_photohrapher.map( t => t.split('_'))
    for (let m in media_de_premier_photohrapher) {
        media_de_premier_photohrapher[m] =  media_de_premier_photohrapher[m][0];
}
media_de_premier_photohrapher = _.uniq(media_de_premier_photohrapher)

 
for (let taggg of media_de_premier_photohrapher) {
    const taggers_li = document.createElement("li");
taggers_li.textContent =  "#"+ taggg;
taggers_ul.appendChild(taggers_li)
taggers_ul.className="hashtags_ul ";
taggers_li.className ="hashtags_li "+ taggg;


}


}
// 



gethashragers(id);

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

 




   

 