// import { * } from "./utils.js" import utils from "./utils.js" 
// Test d'importation
// console.log(utils.addition(1, 4))
//====================

// ======================
// Constantes / Variables
// ======================

const urlApi = 'https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_agenda-evenements-nantes-metropole_v2/records?select=nom%2C%20description_evt%2C%20lieu%2C%20ville%2C%20date%2C%20gratuit%2C%20media_url&limit=4'


// ===========
// RECUP' DATA
// ===========

// console.log(promiseData)

// .then
// promiseData
//     .then((value) => {
//         // console.log(value)
//         value.json()
//             .then((data) => {
//                 console.log(data)
//                 afficherCartes(data.results) 
//             })
//     })
//     .catch((error) => {
//         console.log("ERROR :", error)     
//     })
//     .finally(() => {
//         console.log("Fin")
//     })

// async/await
const dataAsync = async() => {
    try {
        const promiseData = await fetch(urlApi)
        const data = await promiseData.json()
        console.log(data)
        afficherCartes(data.results)

    } catch(error) {
        console.log("ERROR :", error)
    } finally {
        console.log("Fin")
    }
}

dataAsync()

// Afficher Cartes
const afficherCartes = (elements) => {
    const parentCartes = document.getElementById("parentCartes")

    elements.forEach((evt) => {
    const carteHTML = `
        <article class="carte">
            <h2>${evt.nom}</h2>
            <div id="imgCadre">
                <img src="${evt.media_url}" alt="Photo de ${evt.nom}">
            </div>
            <p id="lieu">${evt.lieu} - ${evt.ville}</p>
            <p id="date">Rdv le ${evt.date}</p>
        </article>
    `
    parentCartes.innerHTML += carteHTML
    })
}
