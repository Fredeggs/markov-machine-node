const { MarkovMachine } = require('./markov')

describe("makeChains function", () => {

    test("should return the correct MarkovMachine chain object", ()=>{
        const mm = new MarkovMachine("I eat eggs because eggs taste good")
        result = mm.makeChains()
        expect(result).toEqual(
            {
                "I": ["eat"],
                "eat": ["eggs"],
                "eggs": ["because", "taste"],
                "because": ["eggs"],
                "taste": ["good"],
                "good": [null]
            }
        )
    })

    test("should return the empty MarkovMachine chain object", ()=>{
        const mm = new MarkovMachine("")
        result = mm.makeChains()
        expect(result).toEqual({})
    })
})

describe("makeText function", () => {

    test("should output a string that *at least* contains the word Fred", ()=>{
        const mm = new MarkovMachine("hello the name is Fred and Fred likes eggs made by Fred")
        text = mm.makeText()
        expect(text).toContain(" Fred")
    })

    test("should output a string that is no longer than 10 words", ()=>{
        const mm = new MarkovMachine("hello my name is Fred and Fred likes eggs")
        text = mm.makeText()
        let words = text.split(/[ \r\n]+/);
        filteredWords = words.filter(c => c !== "");
        expect(filteredWords.length).toBeLessThanOrEqual(10);
    })
})

