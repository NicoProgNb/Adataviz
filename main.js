// import { * } from "./utils.js" import utils from "./utils.js" 
// Test d'importation
// console.log(utils.addition(1, 4))

//====================

// Lien vers data.nantes
const promiseData = fetch('https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_agenda-evenements-nantes-metropole_v2/records?select=nom%2C%20description_evt%2C%20lieu%2C%20ville%2C%20date%2C%20gratuit%2C%20media_url&limit=5')

// console.log(promiseData)

promiseData
    .then((value) => {
        // console.log(value)
        value.json()
            .then((data) => {
                console.log(data)
            })
    })
    .catch((error) => {
        console.log("ERROR :", error)     
    })
    .finally(() => {
        console.log("Fin")
    })
