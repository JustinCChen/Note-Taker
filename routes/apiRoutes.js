const router = require('express').Router();
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//API route
router.get("/notes",(req,res)=>{
    readFileAsync("./db/db.json","utf8")
        .then((data)=>{
            notes = JSON.parse(data)
            console.log(data);
            res.json(notes)
        })
});



router.post("/notes",(req,res)=>{
    const note = req.body
    console.log(note);
    readFileAsync("./db/db.json","utf8")
        .then((data)=>{
          const notes = [].concat(JSON.parse(data));
          note.id = notes.length + 1 
          //console.log(notes);
          notes.push(note);
          return notes
        }).then((notes)=>{
            writeFileAsync("./db/db.json",JSON.stringify(notes))
            res.json(notes)
        })
})

router.delete("/notes/:id", (req,res)=>{
    const idDelete = parseInt(req.params.id);
    readFileAsync("./db/db.json","utf8")
        .then((data)=>{
           const notes = [].concat(JSON.parse(data));
           const newNotes =[]
           for (let i = 0 ; i < notes.length ; i++){
            if (idDelete !== notes[i].id ){
                newNotes.push(notes[i]);
            }
           } 
           return newNotes
        }).then((notes) => {
            writeFileAsync("./db/db.json",JSON.stringify(notes))
            res.send('saved success!')
        })
})

module.exports = router