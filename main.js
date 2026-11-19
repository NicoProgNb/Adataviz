// import { * } from "./utils.js" import utils from "./utils.js" 
// Test d'importation
// console.log(utils.addition(1, 4))
//====================

// ======================
// Constantes / Variables
// ======================

// Lien url
const urlApi = "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_agenda-evenements-nantes-metropole_v2/records?select=nom%2C%20description_evt%2C%20lieu%2C%20ville%2C%20gratuit%2C%20media_url%2C%20date&where=date%20%3E%3D%20now()&limit=20"

// Pages
const parentCartes = document.getElementById('parentCartes')
const elementsParPage = 4
let pageActuelle = 1
let totalPages = 0
let evenements = []

// Boutons
const precedent = document.getElementById('precedent')
const suivant = document.getElementById('suivant')

// ===========
// RECUP DATA
// ===========
const dataAsync = async () => {
    try {
        const promiseData = await fetch(urlApi)
        const data = await promiseData.json()

        evenements = data.results || []
        totalPages = Math.ceil(evenements.length / elementsParPage)

        console.log(data)
        afficherPage(pageActuelle)
    } catch (error) {
        console.error('ERROR :', error)
    } finally {
        console.log('Fin de la lecture de data')
    }
}

// ===============
// Afficher Cartes
// ===============
const afficherCartes = (elements) => {
    parentCartes.innerHTML = ""

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

// ==========
// Pagination
// ==========
const afficherPage = (page) => {
    const debut = (page - 1) * elementsParPage
    const fin = debut + elementsParPage
    const dataParPage = evenements.slice(debut, fin)

    afficherCartes(dataParPage)

    // Masquer le bouton Précédent sur la 1ère page
    if (pageActuelle <= 1) {
        precedent.style.visibility = 'hidden'

        // Désactiver le bouton Précédent sur la 1ère page
        precedent.disabled = true
    } else {
        precedent.style.visibility = 'visible'
        precedent.disabled = false
    }

    // Masquer le bouton Suivant sur la dernière page (ou s'il n'y a aucun résultat)
    if (pageActuelle >= totalPages) {
        suivant.style.visibility = 'hidden'

        // Désactiver le bouton Suivant sur la dernière page (ou s'il n'y a aucun résultat)
        suivant.disabled = true
    } else {
        suivant.style.visibility = 'visible'
        precedent.disabled = false    
    }
}

dataAsync()

// ======================
// Écouteurs d'évènements
// ======================
precedent.addEventListener('click', () => {
    if (pageActuelle > 1) {
        pageActuelle--
        afficherPage(pageActuelle)
    }
})

suivant.addEventListener('click', () => {
    if (pageActuelle < totalPages) {
        pageActuelle++
        afficherPage(pageActuelle)
    }
})
