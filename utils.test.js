import { dataAsync, evenements } from "./utils.js"


describe("dataAsync", () => {

    it("Lien URL valide", () => {
        expect(dataAsync([""])).toBe("")
    })

    it("resultFetch.status ok", () => {
        expect(dataAsync([""])).toBe("")
    })        
    
})