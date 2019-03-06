const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let {PythonShell } = require('python-shell');

let options = {
    mode: 'text',
    args: ['val1', 'val1', 'val3']
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){ 
    res.sendFile(path.join(__dirname, 'views', '/index.html'));
})

app.get('/launch', launchButton);
app.get('/evaluate', evaluateButton);

function cleanOutput ()
    { 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        clean = PythonShell.run('scripts/cleantxt.py', options, function (err, results) {
        if(err) throw err;
        console.log('results: %j', results);
        console.log(results);
        resolve(results);
        return results;
        
    }, 1500);
    });
    });
}

  function splitOutput () 
 {
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
          let results = "";
          PythonShell.run('scripts/splittxt.py', options, function (err, results){
          if(err) throw err;
          console.log('results: %j', results);
         
          console.log(results);
          resolve(results);
          return results;
        }, 1500);
    });
    }); 
 } 
 
 function trainOutput ()
 {
    let output = " ";
            pyshell = new PythonShell('scripts/tntm.py');
            pyshell.on('message', function (message) {
                console.log(message);
                return message;
    });
}

function evaluateOutput ()
{
return new Promise((resolve, reject) => {
setTimeout(() => {
    let results = "";
   PythonShell.run('scripts/entm.py', options, function (err, results){
       if(err) throw err;
       console.log('results: %j', results);
       
       console.log(results);
       resolve(results)
       return results;
    }, 1500);
    clearTimeout()
   });
});
}


async function launchButton(req, res){
    let rec = "";
    let clean = await cleanOutput();
    let split = splitOutput();
    let train = trainOutput();
    res.write(clean.toString() + split.toString() + train.toSpring());
}


async function evaluateButton(req, res){

    const evaluate = await evaluateOutput();
    res.write(evaluate.toString())

}

app.listen(3000);
