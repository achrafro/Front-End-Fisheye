    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json

          
        const response = await fetch('https://achrafro.github.io/Front-End-Fisheye/data/photographers.json');

        const data = await response.json();

        const photographers = [
        {
                "name": data.photographers[0].name,
                "id": data.photographers[0].id,
                "city":data.photographers[0].city ,
                "country": data.photographers[0].country,
                "tagline": data.photographers[0].tagline,
                "price": data.photographers[0].price,
                "portrait": data.photographers[0].portrait
            }
            
        ]
        for (let i=0 ;i<= data.photographers.length -1 ;i++) { 
             
            photographers[i] = data.photographers[i];

 
       }






       
        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: [...photographers]})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
