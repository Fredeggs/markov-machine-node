const { MarkovMachine } = require('./markov')
const fs = require('fs');
const axios = require('axios');
const args = process.argv

function markovCat(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          // handle possible error
          console.error(err);
          // kill the process and tell the shell it errored
          process.exit(1);
        }
        const mm = new MarkovMachine(data);
        mm.makeText()
    })
}

async function markovWebCat(url){
    try {
        let res = await axios.get(url);
        const mm = new MarkovMachine(res.data);
        mm.makeText()
    }
    catch {
        console.error('ERROR: Please enter a valid url')
    }
}



if (args[2] === 'file'){
    markovCat(args[3])
} 
else if(args[2] === 'url'){
    markovWebCat(args[3])
} 
else{
    console.error("ERROR: please enter valid arguments ('file/url', name_of_filepath_or_url)")
}