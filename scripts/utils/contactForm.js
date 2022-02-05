

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    let form = document.getElementById("form_contact");
    nom_input=document.getElementById("nom");
    prenom_input= document.getElementById("prenom")
    email_input= document.getElementById("email");
    msg_input = document.getElementById("message");
//  ajouter nom photographer en formulaire : 

 
function affichage_sur_console(){
nom_input.addEventListener("focusout", k => {
  console.log("NOM : "+nom_input.value);
    })

prenom_input.addEventListener("focusout", k => {
 console.log("prenom : "+prenom_input.value);
})
email_input.addEventListener("focusout", k => {
    console.log("Email : "+email_input.value);
   })        
   msg_input.addEventListener("focusout", k => {
    console.log("Message : "+msg_input.value);
})  

}

affichage_sur_console();

}

function Habib2004Modal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}



//   fonction tester les inputs :
function tester_inputs() {
    let testing= false ;
    let form_contact = document.getElementById("form_contact");
    contact_button = document.getElementsByClassName("contact_button");
    contact_button = contact_button[1];
    let Contactez_moi = document.getElementsByClassName("contact_moi");
     contact_button.addEventListener("click", m => {

m.preventDefault();
const modal = document.getElementById("contact_modal");

//  message d'erreur :
 


// tester prenom :

if (prenom_input.value == "" || prenom_input.value.length <=1) {

console.log("erreur");
prenom_input.style.border ="2px solid black";
 testing= false
 
}
else {
    testing = true ;
    prenom_input.style.border ="none";

}
// teste sur nom : 
if (nom_input.value == "" || nom_input.value.length <=1) {

    console.log("erreur");
    nom_input.style.border ="2px solid black";
    testing= false
    }
    else {
        testing = true ;
        nom_input.style.border ="none";
    
    }
// tester l'eamil : 
if  (email_input.value == "" || email_input.value.length <= 2 || email_input.value.indexOf(".",0) < 0  || email_input.value.indexOf("@",0) < 0) {

    email_input.style.border ="2px solid black";
    console.log("erreur");
    testing= false

}
else {
    testing = true ;
    email_input.style.border ="none";
}

// testing message : 
if (msg_input.value == "" || msg_input.value.length <=5) {

    console.log("erreur");
    msg_input.style.border ="2px solid black";
    testing= false
    
    }
    else {
        testing = true ;
        msg_input.style.border ="none";
    
    }

    

console.log(testing);
if (testing == true ) {
    form_contact.style.display ="none";
console.log(Contactez_moi);
Contactez_moi[0].innerText= "Merci de nous avoir contacté"


setTimeout(function(){ modal.style.display= "none" }, 2000);


}

    })


}
tester_inputs();
      


function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
