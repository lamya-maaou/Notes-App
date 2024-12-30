//variables
const notesContainer = document.querySelector(".notes-container");
const createbtn = document.querySelector(".btn");
//selctionne toutes les notes
let notes = document.querySelectorAll(".inputBox");

// affiche les notes sauvegardées dans le stockage local (localStorage)
function showNotes(){
    //récupère les donnees associée à la clé "notes" dans le localStorage
   notesContainer.innerHTML = localStorage.getItem("notes");
}
 
showNotes();


createbtn.addEventListener("click", ()=>{
   let inputbox = document.createElement("p");
   let img = document.createElement("img");
   inputbox.className = "inputBox";
   inputbox.setAttribute("contenteditable", "true");
   img.src = "images/delete.png";
   notesContainer.appendChild(inputbox).appendChild(img);
})

 //pour sauvegarder les notes
 function updateStorage(){
    //Transforme le contenu HTML de notesContainer en une chaîne de texte et le stocke sous la clé "notes".
    localStorage.setItem("notes", notesContainer.innerHTML);
 }

notesContainer.addEventListener("click", function(e){
    //Gestion supression de note
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    //Gestion des clics sur les notes (balise <p>
    else if (e.target.tagName === "P"){
        notes = document.querySelectorAll(".inputBox");
        notes.forEach(nt => {
            //onkeyup:permet de détecter les modifications dans la note pendant que l'utilisateur tape.
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    } 
       
 })

 document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        //Insère un saut de ligne dans la note à la place d'un nouveau paragraphe.
       document.execCommand("insertLineBreak");
       //Empêche le comportement par défaut de la touche "Entrée" (ajouter un <p>).
       event.preventDefault(); 
    }
})


