// ===========
// RECUP DATA
// ===========
export let evenements = []

export const dataAsync = async (urlApi) => {
    try {
        const resultFetch = await fetch(urlApi)
        if (!resultFetch.ok) {
            throw new Error("Erreur HTTP " + resultFetch.status)
        }
        const data = await resultFetch.json()
        evenements = data.results

        afficherPage(1)
    } catch (error) {
        console.error('ERROR :', error)
    } finally {
        console.log('Fin de la lecture de data')
    }
}
