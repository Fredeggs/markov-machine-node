/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
    makeChains() {
        let chain = {}
        for (let i = 0; i < this.words.length; i++) {
            if(!chain[this.words[i]]){
                if(i === (this.words.length - 1)){
                    chain[this.words[i]] = [null];
                }
                else{
                    chain[this.words[i]] = [this.words[i+1]];
                }

            }
            else{
                if(i === (this.words.length - 1)){
                    chain[this.words[i]].push(null);
                }
                else{
                    chain[this.words[i]].push(this.words[i+1]);
                }
            }
        }
        return chain
    }
  
  
    /** return random text from chains */
  
    makeText(numWords = 10) {
        const chain = this.makeChains()
        const words = Object.keys(chain);
        let nextWord = words[Math.floor(Math.random() * words.length)]
        let text = nextWord + " "

        for (let i = 0; i <= numWords; i++) {
            let randWord = chain[nextWord][Math.floor(Math.random() * chain[nextWord].length)]
            if (randWord === null){
                break
            }
            text += (randWord + " ") 
            nextWord = randWord
        }
        console.log(text)
    }
}

module.exports = {
    MarkovMachine: MarkovMachine
}